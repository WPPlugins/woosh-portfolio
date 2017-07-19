jQuery("#woosh-overlay").ready(function(e) {
    jQuery("#woosh-overlay").hide()
});
jQuery(document).ready(function(e) {
    jQuery(".woosh-more").live('click', function(e) {
	  id = jQuery(this).attr('sectionid')
	  jQuery("#woosh-"+id).slideToggle(500)
	})
	if(parseFloat(jQuery(".woosh-body").css('width'))<730) {
		jQuery(".woosh-body").addClass('woosh-body-phase2')
		jQuery(".woosh-top, .woosh-bottom").addClass('woosh-sections-phase2')
		jQuery(".woosh-images").addClass("woosh-images-phase2")
		jQuery(".woosh-text").addClass("woosh-text-phase2")
		jQuery('img[alt="image1"], img[alt="image2"], img[alt="image3"], img[alt="image4"]').addClass('woosh-image-phase2')
		jQuery(".woosh-more, .woosh-view").addClass('woosh-more-phase2');
		jQuery(".woosh-body iframe").css({'margin-left':'0px'});
		var bodyWidth = parseFloat(jQuery(".woosh-body").css('width'));
		bodyWidth = bodyWidth - 10;
		jQuery(".woosh-body iframe").width(bodyWidth+'px');
	}
	jQuery(".woosh-images img").each(function(index, element) {
        jQuery(element).attr('src', jQuery(element).attr('woosh-source'))
    });
	jQuery(".woosh-images img").click(function() {
		jQuery("#woosh-overlay img").attr('src', jQuery(this).attr('src'))
		jQuery("#woosh-overlay").fadeIn(500)
	})
	jQuery("#woosh-overlay input").click(function() {
		jQuery("#woosh-overlay").fadeOut(500)
	})
	jQuery('div[media="1"]').each(function(index, element) {
        url = jQuery(this).attr('v')
		jQuery.getJSON('http://gdata.youtube.com/feeds/api/videos/'+url+'?v=2&alt=json', function(data) {
			jQuery(element).find(".woosh-text").html('<h1>'+ data.entry.title['$t'] + '</h1>'+data.entry.media$group.media$description['$t'])
		})
    });
	jQuery('div[media="2"]').each(function(index, element) {
        url = jQuery(this).attr('v')
		jQuery.getJSON('http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/'+url, function(data) {
			jQuery(element).find(".woosh-text").html('<h1>'+ data.title + '</h1>'+data.description);
		});
	});
});