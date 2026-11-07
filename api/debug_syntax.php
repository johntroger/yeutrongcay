<?php
defined('YTC_APP') or define('YTC_APP', true);
ini_set('display_errors', 1);
error_reporting(E_ALL);

$token = $_GET['token'] ?? '';
if ($token !== 'ytc_fb_cron_2026_secret_key') {
    http_response_code(403);
    die('Forbidden');
}

try {
    $configFile = __DIR__ . '/config.php';
    if (!file_exists($configFile)) {
        echo "config.php not found";
        exit;
    }
    $cfg = require $configFile;
    if (is_array($cfg)) {
        echo "SUCCESS: Config loaded properly! Keys: " . implode(', ', array_keys($cfg));
        if (isset($cfg['facebook'])) {
            echo "\nFacebook page_id: " . ($cfg['facebook']['page_id'] ?? 'EMPTY');
            echo "\nFacebook token length: " . strlen($cfg['facebook']['page_access_token'] ?? '');
        }
    } else {
        echo "Config did not return an array, returned: " . gettype($cfg);
    }
} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . " on line " . $e->getLine() . " in " . $e->getFile();
}
