// ─────────────────────────────────────────────────────────────────────────────
// Buenos Humos — restore Authorization header that LiteSpeed / FastCGI may drop.
// Paste as a new Code Snippet → PHP → Ejecutar en todas partes → Activar.
// Needed for REST API Basic Auth with Application Passwords on Hostinger.
// ─────────────────────────────────────────────────────────────────────────────

add_action('init', function () {
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) return;

    if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $_SERVER['HTTP_AUTHORIZATION'] = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        return;
    }

    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $_SERVER['HTTP_AUTHORIZATION'] = $headers['Authorization'];
        }
    }
}, 1);
