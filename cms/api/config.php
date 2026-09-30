<?php
/**
 * Studio settings. The defaults work when the whole `studio` folder is
 * uploaded as it is; change them only if you move things around.
 */
return [
    // Where drafts, published content, history and the login live. Keep
    // it private: the folder ships with an .htaccess that denies all web
    // access, but outside public_html is safer still, e.g.
    // dirname(__DIR__, 3) . '/dd-studio-storage'.
    'storage_dir' => dirname(__DIR__) . '/storage',

    // Where uploaded images go, and the path the website loads them from
    // (relative to the studio folder).
    'uploads_dir' => dirname(__DIR__) . '/uploads',
    'uploads_url' => 'uploads',

    // Websites allowed to read the published content from another
    // domain, e.g. 'https://designdimensions.github.io'. The studio's own
    // domain never needs listing.
    'allowed_origins' => [
        'https://designdimensions.github.io',
        // Local development and `vite preview`.
        'http://localhost:5173',
        'http://localhost:4173',
    ],

    // Uploads: largest file accepted, and the widest an image is kept at
    // (anything wider is scaled down on upload; GIFs are left alone so
    // they keep animating).
    'max_upload_bytes' => 20 * 1024 * 1024,
    'max_image_width' => 3200,

    // How many published versions to keep in History.
    'keep_revisions' => 60,
];
