<h1>Woosh Portfolio</h1><a class="woosh-help" href="http://wordpress.org/plugins/woosh-portfolio/installation/" target="_blank">Installation</a> - <a href="http://wordpress.org/plugins/woosh-portfolio/faq/" target="_blank" class="woosh-help">FAQs</a>
<?php
global $wpdb;
$table_name = $wpdb->prefix.'woosh';
$results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY ID DESC");
echo '<div id="woosh-all"><label for="woosh-name">Name</label><input type="text" id="woosh-newname"><input type="button" value="New Portfolio"><table><tr><th>Name</th><th>Objects</th><th>Delete</th></tr>';
$sections = array();
foreach($results as $results) {
	if(!$section[$results->tab]) {
		$section[$results->tab] = 1;
		array_push($sections, $results->tab);
	} else {
		$section[$results->tab] = $section[$results->tab] + 1;
	}
}
foreach($sections as $name) {
	echo '<tr portfolio="'.$name.'"><td class="woosh-name">'.$name.'</td><td class="counter">'.$section[$name].'</td><td><input type="button" value="X" section="'.$name.'" class="delete"></td></tr>' ;
}
echo '</table></div>';
foreach($sections as $name) {
	loadPortfolios($name);
}
function loadPortfolios($name) {
	echo '<div id="woosh-'.$name.'" class="woosh-portfolio" style="display:none;">';
	echo '<div class="back" section="'.$name.'">Back to Portfolio List</div><select class="woosh-media"><option value="0">Media Library</option><option value="1">Youtube</option><option value="2">Vimeo</option></select><input type="button" value="Add New Section" section="'.$name.'"><div class="woosh-sections">';
	global $wpdb;
	$table_name = $wpdb->prefix.'woosh';
	$results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY ID DESC");
	foreach($results as $results) {
		if ($results->tab==$name) {
		if ($results->media=="0") {
		echo '<form class="section" id="woosh-'.$results->id.'"><div class="woosh-actions"><input type="text" name="header" sectionid="'.$results->id.'" object="header" value="';
		echo $results->header;
		echo '" default="Header"><input type="text" sectionid="'.$results->id.'" object="url" value="'.$results->url.'" default="View Content URL"><input type="button" value="Remove" sectionid="'.$results->id.'" tab="'.$results->tab.'"><input type="button" value="Save" sectionid="'.$results->id.'"><div class="confirm" sectionid="'.$resutls->id.'" style="display:none;">Section Saved</div></div><div class="woosh-top"><div class="woosh-text"><textarea sectionid="'.$results->id.'" object="text1" default="Top Text Section">';
		echo $results->text1;
		echo '</textarea><div class="woosh-more" sectionid="'.$results->id.'">More</div></div><div class="woosh-images"><img alt="image1" sectionid="'.$results->id.'" src="';
		echo $results->image1;
		echo '"><img alt="image2" sectionid="'.$results->id.'" src="';
		echo $results->image2;
		echo '"></div></div><div class="woosh-bottom" id="section-'.$results->id.'"><div class="woosh-text"><textarea sectionid="'.$results->id.'" object="text2" default="Bottom Text Section">';
		echo $results->text2;
		echo '</textarea></div><div class="woosh-images"><img alt="image3" sectionid="'.$results->id.'" src="';
		echo $results->image3;
		echo '"><img alt="image4" sectionid="'.$results->id.'" src="';
		echo $results->image4;
		echo '">';
		echo '</div></div></form>';
		}
		if($results->media=="1") {
			echo '<form id="woosh-'.$results->id.'" class="section"><div class="woosh-actions"><input type="text" name="header" value="Header" sectionid="'.$results->id.'" object="header" default="Header" readonly="readonly"><input type="text" sectionid="'.$results->id.'" value="'.$results->url.'" default="View Content URL" object="url" media="1"><input type="button" value="Remove" sectionid="'.$results->id.'" tab="'.$results->tab.'"><input type="button" value="Save" sectionid="'.$results->id.'"><div class="confirm" sectionid="'.$results->id.'" style="display:none;"></div></div><div class="woosh-top"><div class="woosh-text"><textarea sectionid="'.$results->id.'" object="text1" default="Top Text Section" readonly="readonly">Top Text Section</textarea></div><div class="woosh-images"><iframe width="560" height="300" src="//www.youtube.com/embed/'.$results->url.'?rel=0" frameborder="0" allowfullscreen></iframe></div></div></form>';
		}
		if($results->media=="2") {
			echo '<form id="woosh-'.$results->id.'" class="section"><div class="woosh-actions"><input type="text" name="header" value="Header" sectionid="'.$results->id.'" object="header" default="Header" readonly="readonly"><input type="text" sectionid="'.$results->id.'" value="'.$results->url.'" default="View Content URL" object="url" media="2"><input type="button" value="Remove" sectionid="'.$results->id.'" tab="'.$results->tab.'"><input type="button" value="Save" sectionid="'.$results->id.'"><div class="confirm" sectionid="'.$results->id.'" style="display:none;"></div></div><div class="woosh-top"><div class="woosh-text"><textarea sectionid="'.$results->id.'" object="text1" default="Top Text Section" readonly="readonly">Top Text Section</textarea></div><div class="woosh-images"><iframe src="//player.vimeo.com/video/'.$results->url.'" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></iframe></div></div></form>';
		}
	}
	}
	echo '</div></div>';
}