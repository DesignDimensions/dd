<?php
/**
 * Content storage: plain JSON files, no database.
 *
 *   draft.json       what the studio is editing   { version, savedAt, doc }
 *   published.json   what the website shows       { version, publishedAt, note, doc }
 *   revisions/       every published version, newest kept
 *
 * Every write goes to a temporary file first and is then renamed into
 * place, so a half-written file is never read. Saves take an exclusive
 * lock and check the version the editor started from, so two open tabs
 * can't silently overwrite each other.
 */
final class Store
{
    public function __construct(private string $dir, private int $keepRevisions)
    {
        foreach ([$dir, "$dir/revisions"] as $path) {
            if (!is_dir($path) && !mkdir($path, 0750, true)) {
                fail(500, "Can’t create the storage folder ($path). Check its permissions.");
            }
        }
    }

    public function read(string $name): ?array
    {
        $file = "$this->dir/$name.json";
        if (!is_file($file)) {
            return null;
        }
        $data = json_decode((string) file_get_contents($file), true);
        return is_array($data) ? $data : null;
    }

    public function write(string $name, array $data): void
    {
        $file = "$this->dir/$name.json";
        $tmp = "$file." . bin2hex(random_bytes(4)) . '.tmp';
        $json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($json === false || file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $file)) {
            @unlink($tmp);
            fail(500, 'Couldn’t save. Check the storage folder’s permissions.');
        }
    }

    /** Runs $fn while holding the store's lock. */
    public function locked(callable $fn): mixed
    {
        $lock = fopen("$this->dir/.lock", 'c');
        flock($lock, LOCK_EX);
        try {
            return $fn();
        } finally {
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }

    public function draft(): ?array
    {
        return $this->read('draft');
    }

    public function published(): ?array
    {
        return $this->read('published');
    }

    /** Saves the draft if nobody saved over the version it was based on. */
    public function saveDraft(array $doc, int $baseVersion): array
    {
        return $this->locked(function () use ($doc, $baseVersion) {
            $current = $this->draft();
            $version = $current['version'] ?? 0;
            if ($current && $baseVersion !== $version) {
                respond(['error' => 'conflict', 'draft' => $current], 409);
            }
            $draft = ['version' => $version + 1, 'savedAt' => gmdate('c'), 'doc' => $doc];
            $this->write('draft', $draft);
            return $draft;
        });
    }

    /** Makes the draft live and files it in History. */
    public function publish(string $note): array
    {
        return $this->locked(function () use ($note) {
            $draft = $this->draft();
            if (!$draft) {
                fail(400, 'There’s no draft to publish yet.');
            }
            $version = ($this->published()['version'] ?? 0) + 1;
            $published = [
                'version' => $version,
                'publishedAt' => gmdate('c'),
                'note' => $note,
                'doc' => $draft['doc'],
            ];
            $this->write('published', $published);
            $this->write(sprintf('revisions/%s-v%d', gmdate('Ymd-His'), $version), $published);
            $this->pruneRevisions();
            return $published;
        });
    }

    /** History, newest first, without the documents themselves. */
    public function revisions(): array
    {
        $list = [];
        foreach ($this->revisionFiles() as $file) {
            $data = json_decode((string) file_get_contents($file), true);
            $list[] = [
                'id' => basename($file, '.json'),
                'version' => $data['version'] ?? null,
                'publishedAt' => $data['publishedAt'] ?? null,
                'note' => $data['note'] ?? '',
            ];
        }
        return $list;
    }

    public function revision(string $id): array
    {
        if (!preg_match('/^\d{8}-\d{6}-v\d+$/', $id)) {
            fail(400, 'That isn’t a version from History.');
        }
        $data = $this->read("revisions/$id");
        if (!$data) {
            fail(404, 'That version is no longer in History.');
        }
        return $data;
    }

    private function revisionFiles(): array
    {
        $files = glob("$this->dir/revisions/*.json") ?: [];
        rsort($files);
        return $files;
    }

    private function pruneRevisions(): void
    {
        foreach (array_slice($this->revisionFiles(), $this->keepRevisions) as $old) {
            @unlink($old);
        }
    }
}
