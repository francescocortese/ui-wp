<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?> class="no-js"> <!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged, $custom_title;

	if($custom_title){
		echo $custom_title . ' | ';
		bloginfo( 'name' );
	}else{

		wp_title( '|', true, 'right' );

		// Add the blog name.
		bloginfo( 'name' );

		// Add the blog description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) )
			echo " | $site_description";

		// Add a page number if necessary:
		if ( $paged >= 2 || $page >= 2 )
			echo ' | ' . sprintf( __( 'Page %s', 'ui-wp' ), max( $paged, $page ) );

	}

	?></title>
	<meta name="keywords" content="<?php
	//lettura dei tags
	$posttags = get_the_tags();
	if ($posttags) {
		foreach($posttags as $tag) {
			echo $tag->name . ', ';
		}
	}
	?>" />
	<meta name="description" content="<?php
	//description standard del blog
	if (  (is_home()) || (is_front_page())  ) {//in homepage
		bloginfo('description');//scrive la descrizione standard
	} elseif (is_single() || is_page()) {//nelle altre pagine
		if (have_posts()) {//se c'è un post
			while (have_posts()) {
				the_post();
				$post_desc = get_the_excerpt();//ricava le prime 55 parole del post
				echo strip_tags( $post_desc );//scrive il riassunto senza i tag HTML
			}
		}
	} else {//se nessuna delle condizioni è vera
		echo $standard_desc;//scrive la descrizione standard
	}
    ?>" />
	<!-- if page is content page -->
	<?php if (is_single()) { ?>
	<meta property="og:url" content="<?php the_permalink() ?>"/>
	<meta property="og:title" content="UI-WP - <?php single_post_title(''); ?>" />
	<meta property="og:description" content="<?php echo strip_tags(get_the_excerpt($post->ID)); ?>" />
	<meta property="og:type" content="article" />
	<meta property="og:image" content="<?php if (function_exists('wp_get_attachment_thumb_url')) {echo wp_get_attachment_thumb_url(get_post_thumbnail_id($post->ID)); }?>" />

	<!-- if page is others -->
	<?php } else { ?>
	<meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
	<meta property="og:description" content="<?php bloginfo('description'); ?>" />
	<meta property="og:type" content="website" />
	<?php } ?>

	<meta name="viewport" content="width=device-width, initali-scale=1.0" />
	<meta name="HandheldFriendly" content="true" />
	<link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_directory_uri() ) ?>/css/main.css">
	<link rel="shortcut icon" href="<?php echo esc_url( get_stylesheet_directory_uri() ) ?>/img/favicon.ico" type="image/x-icon" />
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<?php wp_head(); ?>
</head>

<body>
		<!--[if lt IE 8]>
				<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->
	<header>
		<h2>UI-WP</h2>
	</header>
