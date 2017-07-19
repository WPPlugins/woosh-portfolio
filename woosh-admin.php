<?php
function wooshAdmin() {
	require_once('woosh-admin-page.php');
}
function wooshAdminPage() {
	add_menu_page("Woosh Portfolio", "Woosh Portfolio", 'read', "woosh.php", "wooshAdmin");
}
function wooshFiles($hook) {
	if ($hook != 'toplevel_page_woosh') {
		return;
	}
	wp_enqueue_style('woosh-admin.css', plugins_url('/woosh-portfolio/woosh-admin.css'));
	wp_enqueue_script('woosh-admin.js', plugins_url('/woosh-portfolio/woosh-admin.js'));
	wp_enqueue_media();
	wp_localize_script( 'woosh-admin.js', 'ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'image_url' => plugins_url('/woosh-portfolio/add.gif') ));

}
add_action('admin_enqueue_scripts', 'wooshFiles');
add_action('admin_menu', 'wooshAdminPage');
add_action( 'wp_ajax_woosh_newitem', 'woosh_new_item' );

function woosh_new_item() {
	global $wpdb;
	$table_name = $wpdb->prefix.'woosh';
	$data = array (
		'tab' => $_POST['tab'],
		'header' => 'Header',
		'image1' => plugins_url('/woosh-portfolio/add.gif'),
		'image2' => plugins_url('/woosh-portfolio/add.gif'),
		'image3' => plugins_url('/woosh-portfolio/add.gif'),
		'image4' => plugins_url('/woosh-portfolio/add.gif'),
		'text1' => 'Top Text Section',
		'text2' => 'Bottom Text Section',
		'url' => 'View Content URL',
		'media' => $_POST['media']
	);
	$results = $wpdb->insert($table_name, $data);
	echo $wpdb->insert_id;

	die(); // this is required to return a proper result
}
add_action('wp_ajax_woosh_remove', 'woosh_remove'); 
function woosh_remove() {
	global $wpdb;
	$table_name = $wpdb->prefix.'woosh';
	$where = array (
		'id' => $_POST['id']
	);
	$wpdb->delete($table_name, $where);
	die();
}
add_action('wp_ajax_woosh_update', 'woosh_update');
function woosh_update() {
	global $wpdb;
	$table_name = $wpdb->prefix.'woosh';
	$data = array (
		'header' => $_POST['header'],
		'url' => $_POST['url'],
		'text1' => $_POST['text1'],
		'text2' => $_POST['text2'],
		'image1' => $_POST['image1'],
		'image2' => $_POST['image2'],
		'image3' => $_POST['image3'],
		'image4' =>$_POST['image4']
	);
	$where = array (
		'id' => $_POST['id']
	);
	$wpdb->update($table_name, $data, $where);
	die();
}
add_action('wp_ajax_woosh_delete', 'woosh_delete');
function woosh_delete() {
	global $wpdb;
	$table_name = $wpdb->prefix.'woosh';
	$where = array (
		'tab' => $_POST['tab']
		);
		$wpdb->delete($table_name, $where);
		die();
}
	