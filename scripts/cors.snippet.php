// ─────────────────────────────────────────────────────────────────────────────
// Buenos Humos — open the WP REST API to the headless React origin(s).
// Paste as a new Code Snippet → PHP → Ejecutar en todas partes → Activar.
// Edit $allowed_origins to match wherever the React site is deployed.
// ─────────────────────────────────────────────────────────────────────────────

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $allowed_origins = [
            'https://buenoshumos.com.co',
            'https://www.buenoshumos.com.co',
            'https://buen-humo-koav.vercel.app',
            'http://localhost:5173',
            'http://localhost:4173',
            'http://127.0.0.1:5173',
        ];

        $allowed_origin_patterns = [
            '#^https://buen-humo-[a-z0-9-]+\.vercel\.app$#i',
            '#^https://buen-humo-koav(?:-[a-z0-9-]+)?\.vercel\.app$#i',
        ];

        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        $is_allowed = in_array($origin, $allowed_origins, true);
        if (!$is_allowed && $origin !== '') {
            foreach ($allowed_origin_patterns as $pattern) {
                if (preg_match($pattern, $origin)) {
                    $is_allowed = true;
                    break;
                }
            }
        }

        if ($is_allowed) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        }

        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit;
        }

        return $value;
    });
}, 15);
