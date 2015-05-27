$('.menu-item > a').bind('click', function(event) {
	event.stopPropagation();
	hideAllMenus();
	var $ul = $(this).next('ul');
	if ($ul.not(':visible')) {
		$(document).bind('click', hideAllMenus);
		$(this).addClass('menu-item-active');
		$ul.toggle();
	}
});

$('.menu-item > ul').bind('click', function(event) {
	event.stopPropagation();
});

$('#hamburger').bind('click', function(event) {
	event.stopPropagation();
	$(".menu-item ul").hide();
	$(".menu-list").slideToggle(400);
});

function hideAllMenus() {
	$(document).unbind('click', hideAllMenus);
	$(".menu-item ul").hide();
	$(".menu-item-active").removeClass('menu-item-active');
}