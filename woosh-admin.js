jQuery(document).ready(function(e) {
	function newobject(tab) {
		media = jQuery('#woosh-'+tab+' .woosh-media').val()
		var data = {
		'action': 'woosh_newitem',
		'tab': tab,
		'media': media
		}
	jQuery.post(ajax_object.ajax_url, data, function(response) {
			if (media=="0") {
			output = '<form id="woosh-'+response+'" class="section"><div class="woosh-actions"><input type="text" name="header" value="Header" sectionid="'+response+'" object="header" default="Header"><input type="text" sectionid="'+response+'" value="View Content URL" default="View Content URL" object="url" media="0"><input type="button" value="Remove" sectionid="'+response+'" tab="'+tab+'"><input type="button" value="Save" sectionid="'+response+'" media="'+media+'"><div class="confirm" sectionid="'+response+'" style="display:none;"></div></div><div class="woosh-top"><div class="woosh-text"><textarea sectionid="'+response+'" object="text1" default="Top Text Section">Top Text Section</textarea><div class="woosh-more" sectionid="'+response+'">More</div></div><div class="woosh-images"><img alt="image1" sectionid="'+response+'" src="'+ajax_object.image_url+'"><img alt="image2" sectionid="'+response+'" src="'+ajax_object.image_url+'"></div></div><div class="woosh-bottom" id="section-'+response+'"><div class="woosh-text"><textarea sectionid="'+response+'" object="text2" default="Bottom Text Section">Bottom Text Section</textarea></div><div class="woosh-images"><img alt="image3" sectionid="'+response+'" src="'+ajax_object.image_url+'"><img alt="image4" sectionid="'+response+'" src="'+ajax_object.image_url+'"></div></div></form>'
			}
			if(media=="1") {
				output = '<form id="woosh-'+response+'" class="section"><div class="woosh-actions"><input type="text" name="header" value="Header" sectionid="'+response+'" object="header" readonly="readonly" default="Header"><input type="text" sectionid="'+response+'" value="View Content URL" default="View Content URL" object="url" media="1"><input type="button" value="Remove" sectionid="'+response+'" tab="'+tab+'"><input type="button" value="Save" sectionid="'+response+'"><div class="confirm" sectionid="'+response+'" style="display:none;"></div></div><div class="woosh-top"><div class="woosh-text"><textarea readonly="readonly" sectionid="'+response+'" object="text1" default="Top Text Section">Top Text Section</textarea></div><div class="woosh-images"><iframe width="560" height="300" src="//www.youtube.com/embed/?rel=0" frameborder="0" allowfullscreen></iframe></div></div></form>'
			}
			if(media=="2") {
				output = '<form id="woosh-'+response+'" class="section"><div class="woosh-actions"><input type="text" name="header" value="Header" sectionid="'+response+'" object="header" readonly="readonly" default="Header"><input type="text" sectionid="'+response+'" value="View Content URL" default="View Content URL" object="url" media="2"><input type="button" value="Remove" sectionid="'+response+'" tab="'+tab+'"><input type="button" value="Save" sectionid="'+response+'"><div class="confirm" sectionid="'+response+'" style="display:none;" media="2"></div></div><div class="woosh-top"><div class="woosh-text"><textarea readonly="readonly" sectionid="'+response+'" object="text1" default="Top Text Section">Top Text Section</textarea></div><div class="woosh-images"><iframe src="//player.vimeo.com/video/" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div></form>'
			}
		jQuery("#woosh-"+tab+" .woosh-sections").prepend(output)
		count = parseFloat(jQuery("tr[portfolio='"+tab+"'] .counter").text())
		count = count + 1
		jQuery("tr[portfolio='"+tab+"'] .counter").text(count)
		});
	}
    jQuery(".woosh-portfolio").hide()
	jQuery("input[value='Add New Section']").live('click', event, function() {
		tab = jQuery(this).attr('section')
		newobject(tab)
	})
	jQuery("input[value='New Portfolio']").click(function() {
		tab = jQuery("#woosh-newname").val()
		jQuery("#woosh-all table").append('<tr portfolio="'+tab+'"><td class="woosh-name">'+tab+'</td><td class="counter">0</td><td><input type="button" value="X" section="'+tab+'" class="delete"></td></tr>')
		jQuery("#wpbody-content").append('<div id="woosh-'+tab+'" class="woosh-portfolio"><div class="back" section="'+tab+'">Back to Portfolio List</div><select class="woosh-media"><option value="0">Media Library</option><option value="1">Youtube</option><option value="2">Vimeo</option></select><input type="button" value="Add New Section" section="'+tab+'"><div class="woosh-sections"></div>')
		jQuery("#woosh-all").hide()
	})
	jQuery("input[value='Remove']").live('click', function() {
	a = confirm("This can not be undone!")
	if (a==false) {
		return
	}
	id = jQuery(this).attr('sectionid')
	var data = {
		'action': 'woosh_remove',
		'id': id
	}
	tab = jQuery(this).attr('tab')
	jQuery.post(ajax_object.ajax_url, data, function() { 
	jQuery("#woosh-"+id).remove()
	count = parseFloat(jQuery("tr[portfolio='"+tab+"'] .counter").text())
		count = count - 1
		jQuery("tr[portfolio='"+tab+"'] .counter").text(count)
		if(count==0) {
			jQuery("tr[portfolio='"+tab+"']").remove()
			jQuery("#woosh-"+tab).remove()
			jQuery("#woosh-all").show()
			
		}
	})
	})
	jQuery("img[alt='image1'], img[alt='image2'], img[alt='image3'], img[alt='image4']").live('click', event, function() {
	id= jQuery(this).attr('sectionid')
	object = jQuery(this).attr('alt')
	 // Uploading files
var file_frame;


    event.preventDefault();

    // If the media frame already exists, reopen it.
    if ( file_frame ) {
      file_frame.open();
      return;
    }

    // Create the media frame.
    file_frame = wp.media.frames.file_frame = wp.media({
      title: jQuery( this ).data( 'uploader_title' ),
      button: {
        text: jQuery( this ).data( 'uploader_button_text' ),
      },
      multiple: false  // Set to true to allow multiple files to be selected
    });

    // When an image is selected, run a callback.
    file_frame.on( 'select', function() {
      // We set multiple to false so only get one image from the uploader
      attachment = file_frame.state().get('selection').first().toJSON();
	  	jQuery('#woosh-'+id+' img[alt="'+object+'"]').attr('src', attachment.url)
    });

    // Finally, open the modal
    file_frame.open();
  });
  jQuery('input[value="Save"]').live('click', function(e) {
	  text = jQuery(this).val()
	  id = jQuery(this).attr('sectionid')
	  header = jQuery('#woosh-'+id+' input[object="header"]').val()
	  url = jQuery('#woosh-'+id+' input[object="url"]').val()
	  text1 = jQuery('#woosh-'+id+' textarea[object="text1"]').val()
	  text2 = jQuery('#woosh-'+id+' textarea[object="text2"]').val()
	  image1 = jQuery('#woosh-'+id+' img[alt="image1"]').attr('src')
	  image2 = jQuery('#woosh-'+id+' img[alt="image2"]').attr('src')
	  image3 = jQuery('#woosh-'+id+' img[alt="image3"]').attr('src')
	  image4 = jQuery('#woosh-'+id+' img[alt="image4"]').attr('src')
	  data = {
		  'id': id,
		  'action': 'woosh_update',
		  'header': header,
		  'url': url,
		  'text1': text1,
		  'text2': text2,
		  'image1': image1,
		  'image2': image2,
		  'image3': image3,
		  'image4': image4
	  }
	  jQuery('#woosh-'+id+' .confirm').show().text("Saving...")
	  jQuery.post(ajax_object.ajax_url, data, function(response) {
		  jQuery('#woosh-'+id+' .confirm').text("Saved")
		  setTimeout(function() { jQuery('#woosh-'+id+' .confirm').fadeOut(500) }, 1500)
	  })
  })
  jQuery(".woosh-more").live('click', function(e) {
	  id = jQuery(this).attr('sectionid')
	  jQuery("#section-"+id).slideToggle(500)
  })
  jQuery(".woosh-name").live('click', function() {
	  jQuery("#woosh-all").hide()
	  jQuery("#woosh-"+jQuery(this).text()).show()
  })
  jQuery(".back").live('click', function() {
	  jQuery("#woosh-"+jQuery(this).attr('section')).hide()
	  jQuery("#woosh-all").show()
  })
  jQuery(".delete").live('click', function() {
  	a = confirm("This can not be undone!")
	if (a==false) {
		return
	}
	tab = jQuery(this).attr('section')
	data = {
		'action': 'woosh_delete',
		'tab': tab
	}
	 jQuery.post(ajax_object.ajax_url, data, function(response) {
		 jQuery('tr[portfolio="'+tab+'"]').remove()
	  })
  })
  jQuery('input, textarea').live('focus', function() {
	  if(jQuery(this).attr('readonly')) {
		  return
	  }
	  if(jQuery(this).val() == jQuery(this).attr('default')) {
		  jQuery(this).val('')
	  }
  })
  jQuery('input, textarea').live('blur', function() {
	  if(jQuery(this).attr('readonly')) {
		  return
	  }
	  if(jQuery(this).val()=='') {
		  jQuery(this).val(jQuery(this).attr('default'))
	  }
  })
  jQuery('input[media="1"]').live('blur', function() {
	  url = jQuery(this).val()
	  id = jQuery(this).attr('sectionid')
	  jQuery("#woosh-"+id+" iframe").attr('src', '//www.youtube.com/embed/'+url+'?rel=0')
	 var data =  jQuery.getJSON('http://gdata.youtube.com/feeds/api/videos/'+url+'?v=2&alt=json', function(data) {
		  jQuery('#woosh-'+id+' input[object="header"]').val(data.entry.title['$t'])
		  jQuery('#woosh-'+id+' textarea[object="text1"]').val(data.entry.media$group.media$description['$t'])
	  })
  })
   jQuery('input[media="2"]').live('blur', function() {
	  url = jQuery(this).val()
	  id = jQuery(this).attr('sectionid')
	  jQuery("#woosh-"+id+" iframe").attr('src', 'http://player.vimeo.com/video/'+url)
   })
})