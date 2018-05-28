    //Debut liste de film

    function takeListFilm() {
        $.ajax({
            url:'https://api.themoviedb.org/3/movie/popular?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&page=1',
            success: function(liste) {

                createListFilm(liste);
            }
        });
    }

    function createListFilm(liste) {

        let longueur = Object.keys(liste.results).length;

        for(var i = 0; i < longueur; i++) {
            $('#Films > article').append('<figure data-modal=' + liste.results[i].id + ' class="items"><image class=open src="https://image.tmdb.org/t/p/w342/' + liste.results[i].poster_path +'" alt="' + liste.results[i].title +'"><figcaption>' + liste.results[i].title + '</figcaption></figure>');
            //$('#Films > .index' + i + '').append('<figure data-modal=' + list.results[i].id + ' class="col-auto"><image src="https://image.tmdb.org/t/p/w342/' + list.results[i].poster_path +'" alt="' + list.results[i].title +'"><figcaption></figcaption></figure>');
        }
    }

    takeListFilm();

    //fin liste de film


    //popup films

    var modal = $('.hiddenInfo');
    var button = $('.close');
    $('#corps > #Films > article').on('click', 'figure.items', function () {
        modal.fadeToggle('slow');
        var id = $(this).data('modal');
        requeteFilm(id);

    });

    function requeteFilm(id) {

        $.ajax({url:
        'https://api.themoviedb.org/3/movie/'+ id +'?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
        success: function(data) {

            $('#movie-title').text(data.title);
            $('#movie-year').text(data.release_date);
            $('#movie-plot').text(data.overview);
            $('#movie-director').text(data.production_companies[0].name);
            $('.hiddenInfo').css({'background-image': 'url("http://image.tmdb.org/t/p/original' + data.backdrop_path +'")', 'background-size': '100%', 'background-position': 'center'});
            //console.log(data);

        }});
};
        //fin de film

	//debut liste serie

	function takeListSerie() {
		$.ajax({
			url:'https://api.themoviedb.org/3/tv/popular?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&page=1',
			success: function(liste) {

				createListSerie(liste);
			}
		});
	}

	function createListSerie(list) {

		let longueur = Object.keys(list.results).length;

		for(var i = 0; i < longueur; i++) {
			$('#Series > article').append('<figure data-modal=' + list.results[i].id + ' class="items"><image class=open src="https://image.tmdb.org/t/p/w342/' + list.results[i].poster_path +'" alt="' + list.results[i].name +'"><figcaption>' + list.results[i].name + '</figcaption></figure>');
			//$('#Films > .index' + i + '').append('<figure data-modal=' + list.results[i].id + ' class="col-auto"><image src="https://image.tmdb.org/t/p/w342/' + list.results[i].poster_path +'" alt="' + list.results[i].title +'"><figcaption></figcaption></figure>');
		}
	}

	takeListSerie();

	//fin liste serie


	//popup les series

	var modal = $('.hiddenInfo');
	var button = $('.close');
	$('#corps > #Series > article').on('click', 'figure.items', function () {
		modal.fadeToggle('slow');
		var id = $(this).data('modal');
		requeteSeries(id);

	});

	function requeteSeries(id) {

		$.ajax({
			url:'https://api.themoviedb.org/3/tv/' + id +'?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
		success: function(data) {

			$('#movie-title').text(data.name);
			$('#movie-year').text(data.first_air_date);
			$('#movie-plot').text(data.overview);
			$('#movie-director').text(data.created_by[0].name);
			$('.hiddenInfo').css({'background-image': 'url("http://image.tmdb.org/t/p/original' + data.backdrop_path +'")', 'background-size': '100%', 'background-position': 'center'});
			//console.log(data);

		}});
};

		//fin de series


	//Smooth scrol
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
	//Fin du smoothscrol

	
	//debut carousel

	$(function(){
      setInterval(function(){
         $(".slideshow article").animate({marginLeft:-200},800,function(){
            $(this).css({marginLeft:0}).find("figure:last").after($(this).find("figure:first"));
         });
      }, 3500);
   });

	//fin carousel


		//close popup

	$('.hiddenInfo > div > a').on('click', function () {

			modal.fadeToggle('slow');

	});

		//fin close popup

	//Fin de la partie popup