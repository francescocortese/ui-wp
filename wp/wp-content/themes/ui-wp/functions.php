<?php

add_theme_support( 'post-thumbnails' );
add_image_size('thumb', 570, 370, false);

function remove_admin_login_header() {
    remove_action('wp_head', '_admin_bar_bump_cb');
}
add_action('get_header', 'remove_admin_login_header');

// jpeg quality 100%
function jpeg_quality_callback($arg) {
	return (int)100;
}
add_filter('jpeg_quality', 'jpeg_quality_callback');

//Remove Width and Height Attributes from images
add_filter( 'post_thumbnail_html', 'remove_thumbnail_dimensions', 10 ); add_filter( 'image_send_to_editor', 'remove_thumbnail_dimensions', 10 ); function remove_thumbnail_dimensions( $html ) { $html = preg_replace( '/(width|height)=\"\d*\"\s/', "", $html ); return $html; }


// Remove gallery style
add_filter( 'use_default_gallery_style', '__return_false' );

// Contact form 7 email address different from site domain
add_filter( 'wpcf7_validate_configuration', '__return_false' );



function my_acf_init() {

	acf_update_setting('google_api_key', 'AIzaSyBv3ejUto5AqcPiAvmxrBZGJpwR4HDypbo');
}

add_action('acf/init', 'my_acf_init');


?>
