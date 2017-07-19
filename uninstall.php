<?php
global $wpdb;
$table_name = $wpdb->prefix.'woosh';
$wpdb->query("DROP TABLE IF EXISTS $table_name");
