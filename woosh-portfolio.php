<?php
/**
 * Plugin Name: Woosh Portfolio
 * Plugin URI: http://wordpress.org/plugins/woosh-portfolio
 * Description: Simply display your design projects and descriptive text.
 * Version: 1.3.1
 * Author: elrond1369
 * Author URI: http://profiles.wordpress.org/elrond1369/
 * License: GPL2
 */ 
 global $wpdb;
 register_uninstall_hook(admin_url('woosh-portfolio/uninstall.php'), 'hello');
 $table_name = $wpdb->prefix.'woosh';
 if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
	$sql = "CREATE TABLE $table_name (
		id int(55) NOT NULL AUTO_INCREMENT,
		tab varchar(55),
		image1 varchar(225),
		image2 varchar(225),
		image3 varchar(225),
		image4 varchar(225),
		header varchar(225),
		text1 varchar(225),
		text2 varchar(225),
		sections varchar(2),
		objects varchar(2),
		media varchar(2),
		url varchar(255),
		UNIQUE KEY id (id)
	);";
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	$sqlText = dbDelta( $sql );
}
require_once('woosh-admin.php');
add_action('wp_enqueue_scripts', 'woosh_style');
function woosh_style() {
	wp_enqueue_style('woosh-admin.css', plugins_url('/woosh-portfolio/woosh-admin.css'));
	wp_enqueue_script('jquery.js');
}
add_shortcode('woosh', 'woosh_shortcode');
function woosh_shortcode($attr) {
	if(!$attr['name']) {
		echo 'Set name';
		return;
	}
	wp_enqueue_script('woosh.js', plugins_url('/woosh-portfolio/woosh.js'));
	$output='<div id="woosh-overlay" style="display:none;"><input type="button" value="Close"><img alt="woosh-large"></div>';
	global $wpdb;
	$table_name = $wpdb->prefix.'woosh';
	$results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY ID DESC");
	foreach($results as $results) {
		if($results->tab == $attr['name']) {
			if($results->media=="0") {
			$output .= '<div class="woosh-body" media="0"><div class="woosh-top"><div class="woosh-text"><h1>'.$results->header.'</h1>';
			$output .= $results->text1.'</div><div class="woosh-images"><img alt="image1" woosh-source="'.$results->image1.'"><img alt="image2" woosh-source="'.$results->image2.'"></div><div class="woosh-more" sectionid="'.$results->id.'">More</div></div>';
			$output .= '<div class="woosh-bottom" id="woosh-'.$results->id.'"><div class="woosh-text">';
			$output .= $results->text2.'</div><div class="woosh-images"><img alt="image3" woosh-source="'.$results->image3.'"><img alt="image4" woosh-source="'.$results->image4.'"></div>';
			if ($results->url!='View Content URL') {
				$output .='<a class="woosh-view" href="'.$results->url.'" target="_blank">View Content</a>';
			}
			$output .='</div></div>';
		}
		echo $resutls->media;
		if($results->media=="1") {
			$output .= '<div class="woosh-body" media="1" v="'.$results->url.'"><div class="woosh-top"><div class="woosh-text"><h1></h1></div><div class="woosh-images"><iframe width="560" height="300" src="//www.youtube.com/embed/'.$results->url.'?rel=0" frameborder="0" allowfullscreen></iframe></div></div></div>';
		}
		if($results->media=="2") {
			$output .= '<div class="woosh-body" media="2" v="'.$results->url.'"><div class="woosh-top"><div class="woosh-text"><h1></h1></div><div class="woosh-images"><iframe src="//player.vimeo.com/video/'.$results->url.'" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></iframe></div></div></div>';
		}
	}
	}
	return $output;
}