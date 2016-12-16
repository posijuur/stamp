$(document).ready(function(){
	$('.st3 a').on('click', function(event) {
		event.preventDefault();
		alert('Выберите штамп');
		event.stopImmediatePropagation();
	});
	$('.selected_link').on('click', function(event) {
		$('.item__mod').hide();
		var data = $(this).data('action');
		console.log(data);
		if (data == '.none') {
			$(data).show();
			$(data).trigger('click');
			$('.st3').trigger('click');
		} else {
			$(data).show();
		}
	});
});