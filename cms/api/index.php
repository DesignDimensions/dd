<?php
/**
 * Design Dimensions Studio — the API.
 *
 * One file, one query parameter: api/?r=<route>. Works on any cPanel host
 * with PHP 8.1+, no database, no rewrites. Reads are GET; every change is
 * a POST (some shared hosts block PUT and DELETE).
 *
 *   Public      GET  content            the published site content
 *   Account     GET  status             POST setup · login · logout · password
 *   Editing     GET  draft · published  POST save · publish · import
 *   History     GET  revisions · revision&id=…     POST restore
 *   Media       GET  media              POST upload · delete-media
 */
declare(strict_types=1);

require __DIR__ . '/lib/http.php';
require __DIR__ . '/lib/store.php';
require __DIR__ . '/lib/auth.php';
require __DIR__ . '/lib/media.php';

$config = require __DIR__ . '/config.php';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$route = preg_replace('/[^a-z-]/', '', strtolower((string) ($_GET['r'] ?? '')));

try {
    $store = new Store($config['storage_dir'], $config['keep_revisions']);

    // Public: the website reads this, possibly from another domain.
    if ($route === 'content') {
        allow_cross_origin($config['allowed_origins']);
        if ($method === 'OPTIONS') {
            respond(null, 204);
        }
        $published = $store->published();
        if (!$published) {
            fail(404, 'Nothing is published yet.');
        }
        $etag = '"v' . $published['version'] . '"';
        header('Cache-Control: no-cache');
        header("ETag: $etag");
        if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) {
            http_response_code(304);
            exit;
        }
        respond($published['doc']);
    }

    header('Cache-Control: no-store');
    $auth = new Auth($store);

    if ($method === 'GET' && $route === 'status') {
        respond($auth->status());
    }
    if ($method === 'POST' && $route === 'setup') {
        respond($auth->setUp((string) (body()['password'] ?? '')));
    }
    if ($method === 'POST' && $route === 'login') {
        respond($auth->logIn((string) (body()['password'] ?? '')));
    }

    // Everything below needs a signed-in studio.
    $auth->require();
    $media = new Media($config, $store);

    switch ("$method $route") {
        case 'POST logout':
            $auth->logOut();
            respond(['ok' => true]);

        case 'POST password':
            $data = body();
            $auth->changePassword((string) ($data['current'] ?? ''), (string) ($data['next'] ?? ''));
            respond(['ok' => true]);

        case 'GET draft':
            respond($store->draft() ?? ['version' => 0, 'doc' => null]);

        case 'GET published':
            respond($store->published() ?? ['version' => 0, 'doc' => null]);

        case 'POST save':
            $data = body();
            if (!is_array($data['doc'] ?? null)) {
                fail(400, 'Nothing to save.');
            }
            respond($store->saveDraft($data['doc'], (int) ($data['baseVersion'] ?? 0)));

        case 'POST publish':
            $published = $store->publish(trim((string) (body()['note'] ?? '')));
            respond(['version' => $published['version'], 'publishedAt' => $published['publishedAt']]);

        case 'POST import':
            // First run: start from the website as it was built (seed.json).
            $seed = json_decode((string) @file_get_contents(__DIR__ . '/seed.json'), true);
            if (!is_array($seed)) {
                fail(404, 'The starting content (seed.json) is missing from the api folder.');
            }
            if ($store->draft() || $store->published()) {
                fail(409, 'The studio already has content.');
            }
            respond($store->saveDraft($seed, 0));

        case 'GET revisions':
            respond($store->revisions());

        case 'GET revision':
            respond($store->revision((string) ($_GET['id'] ?? '')));

        case 'POST restore':
            $revision = $store->revision((string) (body()['id'] ?? ''));
            $current = $store->draft();
            respond($store->saveDraft($revision['doc'], (int) ($current['version'] ?? 0)));

        case 'GET media':
            respond($media->all());

        case 'POST upload':
            respond($media->upload($_FILES['file'] ?? []));

        case 'POST delete-media':
            $media->delete((string) (body()['path'] ?? ''));
            respond(['ok' => true]);
    }

    fail(404, 'There’s nothing at that address.');
} catch (HttpError $error) {
    respond(['error' => $error->getMessage()], $error->status);
} catch (Throwable $error) {
    error_log('Studio: ' . $error);
    respond(['error' => 'Something went wrong on the server.'], 500);
}
