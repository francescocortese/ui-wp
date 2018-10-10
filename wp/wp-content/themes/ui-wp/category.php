<?php get_header(); ?>
<main>
  <section class="archive">
    <div class="wrapper">
      <h2 class="title_line archive_title"><?php single_cat_title(); ?></h2>
      <div class="wrapper_posts">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
              <article class="post">
                <a href="<?php the_permalink(); ?>">
                  <header class="post_hover">
                    <h2 class="post_hover__title"><?php the_title(); ?></h2>
                    <h3 class="post_hover__cat"><?php
                      $categories = get_the_category();
                      foreach($categories as $category) {
                      if ($category->category_parent == 0) continue;
                      echo str_replace('-', '', $category->name).' ';
                    }?></h3>
                    <p class="hidden">
                      <?php echo get_the_excerpt(); ?>
                    </p>
                </header><!-- / .post_hover -->
              </a>
              <?php the_post_thumbnail('loop-work-thumb'); ?>
              </article><!-- / .post -->
            <?php endwhile;  endif;?>
      </div><!-- / .wrapper_posts -->
    </div><!-- / .wrapper -->
  </section><!-- / .archive -->
</main><!-- / main -->
<?php get_footer(); ?>
