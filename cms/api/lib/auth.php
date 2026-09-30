<?php
/**
 * One shared studio password, set on first visit and stored only as a
 * hash (auth.json). Signing in starts a session; every change the studio
 * makes also carries that session's token (X-Studio-Token), so another
 * site can't make changes through a signed-in browser. Repeated wrong
 * passwords from one address are slowed down.
 */
final class Auth
{
    private const MAX_ATTEMPTS = 6;
    private const WINDOW_SECONDS = 15 * 60;

    public function __construct(private Store $store)
    {
        session_name('dd_studio');
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => dirname($_SERVER['SCRIPT_NAME'] ?? '/'),
            'httponly' => true,
            'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
            'samesite' => 'Strict',
        ]);
        session_start();
    }

    public function isSetUp(): bool
    {
        return (bool) $this->store->read('auth');
    }

    public function status(): array
    {
        return [
            'setUp' => $this->isSetUp(),
            'signedIn' => !empty($_SESSION['signed_in']),
            'token' => !empty($_SESSION['signed_in']) ? $_SESSION['token'] : null,
        ];
    }

    public function setUp(string $password): array
    {
        if ($this->isSetUp()) {
            fail(403, 'The studio already has a password.');
        }
        $this->checkStrength($password);
        $this->store->write('auth', ['hash' => password_hash($password, PASSWORD_DEFAULT), 'setAt' => gmdate('c')]);
        return $this->signIn();
    }

    public function logIn(string $password): array
    {
        $this->throttle();
        $auth = $this->store->read('auth');
        if (!$auth || !password_verify($password, $auth['hash'])) {
            $this->recordFailure();
            usleep(400000);
            fail(401, 'That password isn’t right.');
        }
        if (password_needs_rehash($auth['hash'], PASSWORD_DEFAULT)) {
            $auth['hash'] = password_hash($password, PASSWORD_DEFAULT);
            $this->store->write('auth', $auth);
        }
        $this->clearFailures();
        return $this->signIn();
    }

    public function changePassword(string $current, string $next): void
    {
        $auth = $this->store->read('auth');
        if (!password_verify($current, $auth['hash'] ?? '')) {
            fail(401, 'Your current password isn’t right.');
        }
        $this->checkStrength($next);
        $this->store->write('auth', ['hash' => password_hash($next, PASSWORD_DEFAULT), 'setAt' => gmdate('c')]);
    }

    public function logOut(): void
    {
        $_SESSION = [];
        session_destroy();
    }

    /** For every request that changes something. */
    public function require(): void
    {
        if (empty($_SESSION['signed_in'])) {
            fail(401, 'Please sign in again.');
        }
        $token = $_SERVER['HTTP_X_STUDIO_TOKEN'] ?? '';
        if (!hash_equals($_SESSION['token'] ?? '', $token)) {
            fail(403, 'This page is out of date — reload the studio.');
        }
    }

    private function signIn(): array
    {
        session_regenerate_id(true);
        $_SESSION['signed_in'] = true;
        $_SESSION['token'] = bin2hex(random_bytes(24));
        return $this->status();
    }

    private function checkStrength(string $password): void
    {
        if (mb_strlen($password) < 10) {
            fail(422, 'Use at least 10 characters — a short sentence works well.');
        }
    }

    private function attemptsFile(): string
    {
        return 'attempts-' . substr(hash('sha256', client_ip()), 0, 16);
    }

    private function throttle(): void
    {
        $record = $this->store->read($this->attemptsFile()) ?? ['count' => 0, 'since' => time()];
        if (time() - $record['since'] > self::WINDOW_SECONDS) {
            return;
        }
        if ($record['count'] >= self::MAX_ATTEMPTS) {
            $wait = (int) ceil((self::WINDOW_SECONDS - (time() - $record['since'])) / 60);
            fail(429, "Too many tries. Take a breather and try again in $wait minutes.");
        }
    }

    private function recordFailure(): void
    {
        $record = $this->store->read($this->attemptsFile());
        if (!$record || time() - $record['since'] > self::WINDOW_SECONDS) {
            $record = ['count' => 0, 'since' => time()];
        }
        $record['count']++;
        $this->store->write($this->attemptsFile(), $record);
    }

    private function clearFailures(): void
    {
        $this->store->write($this->attemptsFile(), ['count' => 0, 'since' => time()]);
    }
}
