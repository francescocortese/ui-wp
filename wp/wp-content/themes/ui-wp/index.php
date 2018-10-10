<?php
/* Template Name: Home */
get_header(); ?>
<section class="intro">
	<div class="header">
	<?php include "inc/navigation.php"; ?>
</div><!-- / .header -->
	<div class="intro_wrapper">
		<h2 class="intro_title">1970 Rooms</h2>
		<h3 class="intro_subtitle"><?php echo __('[:it]Il mito degli anni ’70 torna alla realtà![:en]The myth of the ‘70s back to the reality!'); ?></h3>
	</div><!-- / .intro_wrapper -->
	<a href="#" class="button"><?php echo __('[:it]Scopri[:en]Discover'); ?></a>
	<div class="intro_bg"></div>
	<video class="intro_video" autoplay muted loop>
		<source src="<?php bloginfo('stylesheet_directory') ?>/video/video.mp4" type="video/mp4">
		<source src="<?php bloginfo('stylesheet_directory') ?>/video/video.webm" type="video/webm">
		<source src="<?php bloginfo('stylesheet_directory') ?>/video/video.ogv" type="video/ogg">
	</video>
	<img class="intro_img" src="<?php bloginfo('stylesheet_directory') ?>/img/intro.jpg" alt="" />

</section><!-- / .intro -->

<div class="main_content">
<div class="header main">
<?php include "inc/navigation.php"; ?>
</div><!-- / .header -->
<main role="main">
<section id="about" class="section">
<?php include "inc/about.php"; ?>
</section><!-- / .wrapper -->

<div id="rooms_wrapper" class="section">
<?php include "inc/rooms.php"; ?>
</div><!-- / #rooms_wrapper -->
<div id="where_wrapper" class="clearfix section">
<?php include "inc/where.php"; ?>
</div><!-- / #where -->
<section id="reviews" class="section">
<?php include "inc/reviews.php"; ?>
</section><!-- / #reviews -->

</main><!-- / main -->
<?php get_footer(); ?>
