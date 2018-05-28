$(document).ready(function() {
//La gestion d'évenement sur le DOM

	//Creation du href pour chaque nav
	$('#navtest > a').each(function() {
		$(this).addClass('scrollto');
		$(this).attr('href', '#' + $(this).data('link'));
	});

		//Gestion SmoothScroll
	$('.scrollto').on('click', function() {
		var page = $(this).attr('href');
		var speed = 900;
		$('html, body').animate( {

			scrollTop: $(page).offset().top }, speed);
		return false;

	});

	var modal = $('.hiddenInfo');
	var button = $('.close');




	$('#corps > #Films > article > figure').on('click', function () {

			modal.animate({
				height: 'toggle'
			});
			var id = $(this).data('modal');

			requeteFilm(id);

	});

		$('#corps > #Series > article > figure').on('click', function () {

			modal.animate({
				height: 'toggle'
			});
			var id = $(this).data('modal');

			requeteSerie(id);

	});

	$('.hiddenInfo > div > a').on('click', function () {

			modal.animate({
				height: 'toggle'
			});

	});


	function requeteFilm(cle) {

		$.ajax({url: 'https://api.themoviedb.org/3/movie/'+ cle +'?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
		success: function(data) {

			$('#movie-title').text(data.title);
			$('#movie-year').text(data.release_date);
			$('#movie-plot').text(data.overview);
			$('#movie-director').text(data.production_companies[0].name);

		}});

};

	function requeteSerie(cle) {

		$.ajax({url: 'https://api.themoviedb.org/3/tv/' + cle +'?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
		success: function(data) {

			$('#movie-title').text(data.name);
			$('#movie-year').text(data.first_air_date);
			$('#movie-plot').text(data.overview);
			$('#movie-director').text(data.created_by[0].name);

		}});

};


});
