<?php
/**
 * The media library: images (and narration audio) uploaded from the
 * studio, kept under uploads/YYYY/MM/ with a readable, collision-proof
 * name. Content refers to them by path ("uploads/2026/09/papad-3f9a1c.jpg"),
 * which the website turns into a full address.
 */
final class Media
{
    private const TYPES = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
        'image/svg+xml' => 'svg',
        'audio/mpeg' => 'mp3',
    ];

    public function __construct(private array $config, private Store $store)
    {
        if (!is_dir($config['uploads_dir']) && !mkdir($config['uploads_dir'], 0755, true)) {
            fail(500, 'Can’t create the uploads folder. Check its permissions.');
        }
    }

    public function upload(array $file): array
    {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            fail(400, match ($file['error'] ?? null) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'That file is bigger than the server accepts.',
                UPLOAD_ERR_NO_FILE => 'No file arrived.',
                default => 'The upload didn’t finish. Try again.',
            });
        }
        if ($file['size'] > $this->config['max_upload_bytes']) {
            $mb = round($this->config['max_upload_bytes'] / 1048576);
            fail(413, "That file is over {$mb} MB.");
        }

        // Trust the file's contents, not its name.
        $type = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        $ext = self::TYPES[$type] ?? null;
        if (!$ext) {
            fail(415, 'Only JPG, PNG, WebP, GIF and SVG images, and MP3 audio.');
        }
        if ($type === 'image/svg+xml' && !$this->isSafeSvg($file['tmp_name'])) {
            fail(415, 'That SVG has scripts or links in it, so it can’t be used.');
        }

        $name = $this->slug(pathinfo($file['name'] ?? 'file', PATHINFO_FILENAME));
        $folder = gmdate('Y/m');
        $relative = sprintf('%s/%s-%s.%s', $folder, $name, bin2hex(random_bytes(3)), $ext);
        $target = "{$this->config['uploads_dir']}/$relative";
        if (!is_dir(dirname($target))) {
            mkdir(dirname($target), 0755, true);
        }
        if (!move_uploaded_file($file['tmp_name'], $target)) {
            fail(500, 'Couldn’t store the file. Check the uploads folder’s permissions.');
        }
        chmod($target, 0644);
        $this->shrink($target, $type);

        return $this->describe($relative);
    }

    /** Every file in the library, newest first, marked if content uses it. */
    public function all(): array
    {
        $root = $this->config['uploads_dir'];
        $used = $this->usedText();
        $items = [];
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));
        foreach ($files as $file) {
            if (!$file->isFile() || str_starts_with($file->getFilename(), '.')) {
                continue;
            }
            $relative = ltrim(str_replace('\\', '/', substr($file->getPathname(), strlen($root))), '/');
            $item = $this->describe($relative);
            $item['used'] = str_contains($used, $item['path']);
            $items[] = $item;
        }
        usort($items, fn ($a, $b) => $b['modified'] <=> $a['modified']);
        return $items;
    }

    public function delete(string $path): void
    {
        $prefix = rtrim($this->config['uploads_url'], '/') . '/';
        if (!str_starts_with($path, $prefix) || str_contains($path, '..')) {
            fail(400, 'That isn’t a file from the library.');
        }
        if (str_contains($this->usedText(), $path)) {
            fail(409, 'That file is still used on the site. Remove it from the content first.');
        }
        $file = $this->config['uploads_dir'] . '/' . substr($path, strlen($prefix));
        if (!is_file($file) || !unlink($file)) {
            fail(404, 'That file is already gone.');
        }
    }

    private function describe(string $relative): array
    {
        $file = "{$this->config['uploads_dir']}/$relative";
        $size = @getimagesize($file);
        return [
            'path' => rtrim($this->config['uploads_url'], '/') . '/' . $relative,
            'name' => basename($relative),
            'bytes' => filesize($file),
            'width' => $size[0] ?? null,
            'height' => $size[1] ?? null,
            'type' => $size['mime'] ?? mime_content_type($file),
            'modified' => filemtime($file),
        ];
    }

    /** Draft and published content as one string, to look paths up in. */
    private function usedText(): string
    {
        return json_encode([$this->store->draft()['doc'] ?? null, $this->store->published()['doc'] ?? null], JSON_UNESCAPED_SLASHES);
    }

    /** Scales wide photos down to max_image_width, keeping their format. */
    private function shrink(string $file, string $type): void
    {
        if (!function_exists('imagecreatetruecolor') || !in_array($type, ['image/jpeg', 'image/png', 'image/webp'], true)) {
            return;
        }
        [$width, $height] = getimagesize($file) ?: [0, 0];
        $max = $this->config['max_image_width'];
        if ($width <= $max) {
            return;
        }
        $source = match ($type) {
            'image/jpeg' => @imagecreatefromjpeg($file),
            'image/png' => @imagecreatefrompng($file),
            'image/webp' => @imagecreatefromwebp($file),
        };
        if (!$source) {
            return;
        }
        $newHeight = (int) round($height * $max / $width);
        $scaled = imagecreatetruecolor($max, $newHeight);
        imagealphablending($scaled, false);
        imagesavealpha($scaled, true);
        imagecopyresampled($scaled, $source, 0, 0, 0, 0, $max, $newHeight, $width, $height);
        match ($type) {
            'image/jpeg' => imagejpeg($scaled, $file, 86),
            'image/png' => imagepng($scaled, $file, 6),
            'image/webp' => imagewebp($scaled, $file, 86),
        };
        imagedestroy($source);
        imagedestroy($scaled);
    }

    private function isSafeSvg(string $file): bool
    {
        $svg = strtolower((string) file_get_contents($file));
        foreach (['<script', 'javascript:', 'onload=', 'onerror=', 'onclick=', '<foreignobject', 'xlink:href="http', 'href="http'] as $bad) {
            if (str_contains($svg, $bad)) {
                return false;
            }
        }
        return true;
    }

    private function slug(string $name): string
    {
        $name = strtolower(trim(preg_replace('/[^A-Za-z0-9]+/', '-', $name) ?? '', '-'));
        return substr($name !== '' ? $name : 'file', 0, 48);
    }
}
