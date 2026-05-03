// ─────────────────────────────────────────────────────────────────────────────
// Buenos Humos — ACF field group for the "producto" CPT.
// Paste this whole block (without <?php) as a new Code Snippet → PHP → Active.
// Fields are exposed in REST under acf:{...} on /wp-json/wp/v2/products
// ─────────────────────────────────────────────────────────────────────────────

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_bh_producto',
        'title' => 'Producto (Buenos Humos)',
        'show_in_rest' => 1,
        'location' => [[[
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'producto',
        ]]],
        'fields' => [
            ['key' => 'field_bh_name_es',        'label' => 'Nombre (ES)',       'name' => 'name_es',        'type' => 'text'],
            ['key' => 'field_bh_name_en',        'label' => 'Name (EN)',         'name' => 'name_en',        'type' => 'text'],
            ['key' => 'field_bh_subtitle_es',    'label' => 'Subtítulo (ES)',    'name' => 'subtitle_es',    'type' => 'text'],
            ['key' => 'field_bh_subtitle_en',    'label' => 'Subtitle (EN)',     'name' => 'subtitle_en',    'type' => 'text'],
            ['key' => 'field_bh_description_es', 'label' => 'Descripción (ES)',  'name' => 'description_es', 'type' => 'textarea'],
            ['key' => 'field_bh_description_en', 'label' => 'Description (EN)',  'name' => 'description_en', 'type' => 'textarea'],
            ['key' => 'field_bh_icon',           'label' => 'Icono (emoji)',     'name' => 'icon',           'type' => 'text'],
            ['key' => 'field_bh_color',          'label' => 'Color (Tailwind)',  'name' => 'color',          'type' => 'text', 'default_value' => 'bg-pink-400'],
            ['key' => 'field_bh_whatsapp',       'label' => 'WhatsApp prefilled','name' => 'whatsapp',       'type' => 'text'],
            [
                'key' => 'field_bh_gallery',
                'label' => 'Galería',
                'name' => 'gallery',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => 'Añadir imagen',
                'sub_fields' => [
                    ['key' => 'field_bh_gallery_url',       'label' => 'URL imagen',     'name' => 'url',       'type' => 'url'],
                    ['key' => 'field_bh_gallery_name_es',   'label' => 'Nombre (ES)',    'name' => 'name_es',   'type' => 'text'],
                    ['key' => 'field_bh_gallery_name_en',   'label' => 'Name (EN)',      'name' => 'name_en',   'type' => 'text'],
                    ['key' => 'field_bh_gallery_detail_es', 'label' => 'Detalle (ES)',   'name' => 'detail_es', 'type' => 'textarea', 'rows' => 3],
                    ['key' => 'field_bh_gallery_detail_en', 'label' => 'Detail (EN)',    'name' => 'detail_en', 'type' => 'textarea', 'rows' => 3],
                ],
            ],
        ],
    ]);
});
