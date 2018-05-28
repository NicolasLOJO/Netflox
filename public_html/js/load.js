$(document).ready( function () {

    //Debut liste de film
    $('#corps > section').append('<span class=myLeft><img class=mybutton src=../Pictures/arrow.svg></span>');
	$('#corps > section').append('<span class=myRight><img class=mybutton src=../Pictures/arrow.svg></span>');

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
        	if (liste.results[i].poster_path !== null) {
            	$('#Films > article').append('<figure data-modal=' + liste.results[i].id + ' class="items movie film' + i + '"><image class=open src="https://image.tmdb.org/t/p/w342/' + liste.results[i].poster_path +'" alt="' + liste.results[i].title +'"><figcaption>' + liste.results[i].title + '</figcaption></figure>');
        	}   
        }
    }
    takeListFilm();
    //fin liste de film

    //popup movie
    var modal = $('.hiddenInfo');
    var button = $('.close');
    $('article').on('click', 'figure.movie', function () {
    	$('body').css({'overflow': 'hidden'});
        modal.fadeToggle('slow');
        var id = $(this).data('modal');
        requeteFilm(id);
    });

    $('div').on('click', 'div.searchmovienow', function () {
    	$('body').css({'overflow': 'hidden'});
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
            if (data.backdrop_path === null) {
            	$('.hiddenInfo').css({'background-image': 'url("../Pictures/back.jpg")', 'background-size': '1920px', 'background-position': 'center'});
            } else {
            	$('.hiddenInfo').css({'background-image': 'url("http://image.tmdb.org/t/p/original' + data.backdrop_path +'")', 'background-size': '1920px', 'background-position': 'center'});
        	}
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
			if (list.results[i].poster_path !== null) {
				$('#Series > article').append('<figure data-modal=' + list.results[i].id + ' class="items series"><image class=open src="https://image.tmdb.org/t/p/w342/' + list.results[i].poster_path +'" alt="' + list.results[i].name +'"><figcaption>' + list.results[i].name + '</figcaption></figure>');
			}	
		}
	}
	takeListSerie();
	//fin liste serie


	//popup les series
	var modal = $('.hiddenInfo');
	var button = $('.close');
	$('article').on('click', 'figure.series', function () {
		$('body').css({'overflow': 'hidden'});
		modal.fadeToggle('slow');
		var id = $(this).data('modal');
		requeteSeries(id);
	});

	$('div').on('click', 'div.searchseriesnow', function () {
		$('body').css({'overflow': 'hidden'});
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
			if (data.backdrop_path !== null) {
            	$('.hiddenInfo').css({'background-image': 'url("http://image.tmdb.org/t/p/original' + data.backdrop_path +'")', 'background-size': '1920px', 'background-position': 'center'});
            }
       	}});
	};
		//fin de series


		//debut liste documentaire
	function takeListDocumentaires() {
		$.ajax({
			url:'https://api.themoviedb.org/3/genre/99/movies?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&include_adult=false&sort_by=created_at.desc',
			success: function(liste) {
				createListDocumentaires(liste);
			}
		});
	}

	function createListDocumentaires(list) {
		let longueur = Object.keys(list.results).length;
		for(var i = 0; i < longueur; i++) {
			$('#Documentaires > article').append('<figure data-modal=' + list.results[i].id + ' class="items"><image class=open src="https://image.tmdb.org/t/p/w342/' + list.results[i].poster_path +'" alt="' + list.results[i].title +'"><figcaption>' + list.results[i].title + '</figcaption></figure>');
		}
	}

	    function requeteDocumentaires(id) {
        $.ajax({url:
        'https://api.themoviedb.org/3/movie/'+ id +'?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
        success: function(data) {
            $('#movie-title').text(data.title);
            $('#movie-year').text(data.release_date);
            $('#movie-plot').text(data.overview);
            $('#movie-director').text('Inconnu');
            $('.hiddenInfo').css({'background-image': 'url("http://image.tmdb.org/t/p/original' + data.backdrop_path +'")', 'background-size': '1920px', 'background-position': 'center'});
        }});
};
	takeListDocumentaires();
	//fin liste serie

	//debut submenu
	$('#subFilm').on('click', '.subcat',  function() {
		var id = $(this).data('modal');
		var titreId = $(this).attr('id');
		$('#Films h2').replaceWith('<h2>Films : ' + titreId + '</h2>');
		console.log(titreId);
		$('#Series').remove();
		$('#Documentaires').remove();
		$('#Manga').remove();
		$('.myLeft').remove();
		$('.myRight').remove();
		$('.slideshow0').css({'height': '100%'});
		$('#Films').addClass('container-fluid');
		$('#Films > article').addClass('justify-content-center');
		$('#Films > article').addClass('row');
		$('.slideshow0 article').css({'width': '100%', 'height': '100%', 'left': '0'});
		//createNewMovie(id);
		$.ajax({url:
			'https://api.themoviedb.org/3/genre/' + id + '/movies?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&include_adult=false&sort_by=created_at.desc',
		success: function(data) {

			for (var i = 0; i < Object.keys(data.results).length; i++) {
				console.log(data.results[i].title);
				if (data.results[i].poster_path !== null) {
					$('#Films figure.film'+i).replaceWith('<figure data-modal=' + data.results[i].id + ' class="items movie col-2 film'+i+'"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].title +'"><figcaption>' + data.results[i].title + '</figcaption></figure>');
				}
			}
		}})
	})

	function submenu() {

		$.ajax({url:
        'https://api.themoviedb.org/3/genre/movie/list?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
        success: function(data) {
        	for(var i = 0; i < Object.keys(data.genres).length; i++) {
        		$('.subfilm').append('<a class="dropdown-item subcat" data-modal=' + data.genres[i].id + ' id=' + data.genres[i].name +'>' + data.genres[i].name +'</a>')
        	}
        }});
	}

	submenu();


	//popup les documentaires
	var modal = $('.hiddenInfo');
	var button = $('.close');
	$('#corps > #Documentaires > article').on('click', 'figure.items', function () {
		$('body').css({'overflow': 'hidden'});
		modal.fadeToggle('slow');
		var id = $(this).data('modal');
		requeteDocumentaires(id);
	});
		//fin de documentaire

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

   //bouton film********************
	$('#corps > #Films').on('click', 'span.myLeft',  function() {
		$(".slideshow0 article").animate({marginLeft:-200},800,function(){
            $(this).css({marginLeft:0}).find("figure:last").after($(this).find("figure:first"));
		});
	});
	$('#corps > #Films').on('click', 'span.myRight',  function() {
		$(".slideshow0 article").animate({marginLeft:+200},800,function(){
            $(this).css({marginLeft:0}).find("figure:first").before($(this).find("figure:last"));
		});
	});
	//***********************

	//bouton serie***********************
	$('#corps > #Series').on('click', 'span.myLeft',  function() {
		$(".slideshow1 article").animate({marginLeft:-200},800,function(){
            $(this).css({marginLeft:0}).find("figure:last").after($(this).find("figure:first"));
		});
	});
	$('#corps > #Series').on('click', 'span.myRight',  function() {
		$(".slideshow1 article").animate({marginLeft:+200},800,function(){
            $(this).css({marginLeft:0}).find("figure:first").before($(this).find("figure:last"));
		});
	});

	//***********************************

	//bouton documentaires ******************
	$('#corps > #Documentaires').on('click', 'span.myLeft',  function() {
		$(".slideshow2 article").animate({marginLeft:-200},800,function(){
            $(this).css({marginLeft:0}).find("figure:last").after($(this).find("figure:first"));
		});
	});
	$('#corps > #Documentaires').on('click', 'span.myRight',  function() {
		$(".slideshow2 article").animate({marginLeft:+200},800,function(){
            $(this).css({marginLeft:0}).find("figure:first").before($(this).find("figure:last"));
		});
	});
	//***************************************
	//fin carousel


		//close popup

	$('.hiddenInfo > div > a').on('click', function () {

			$('body').css({'overflow': ''});
			modal.fadeToggle('slow');

	});

		//fin close popup

	//Fin de la partie popup

	//Search bar
	$('#launchsearch').on('click', function () {

		var id = $('#moviesearch').val();
		console.log(id);
		$.ajax({
			url:'https://api.themoviedb.org/3/search/multi?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&query=' + id + '&page=1&include_adult=false',
			success: function(data) {

				for(var i = 0; i < Object.keys(data.results).length; i++) {

					if(data.results[i].poster_path !== null) {
						if (data.results[i].title === undefined) {
							$('#Films figure.film'+i).replaceWith('<figure data-modal=' + data.results[i].id + ' class="items series col-2 film'+i+'"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].name +'"><figcaption>' + data.results[i].name + '</figcaption></figure>');
							$('#Series').remove();
							$('#Documentaires').remove();
							$('#Manga').remove();
							$('.myLeft').remove();
							$('.myRight').remove();
							$('.slideshow0').css({'height': '100%'});
							$('#Films').addClass('container-fluid');
							$('#Films > article').addClass('justify-content-center');
							$('#Films > article').addClass('row');
							$('.slideshow0 article').css({'width': '100%', 'height': '100%', 'left': '0'});
						} else {
							$('#Films figure.film'+i).replaceWith('<figure data-modal=' + data.results[i].id + ' class="items films col-2 film'+i+'"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].title +'"><figcaption>' + data.results[i].title + '</figcaption></figure>');
							$('#Series').remove();
							$('#Documentaires').remove();
							$('#Manga').remove();
							$('.myLeft').remove();
							$('.myRight').remove();
							$('.slideshow0').css({'height': '100%'});
							$('#Films').addClass('container-fluid');
							$('#Films > article').addClass('justify-content-center');
							$('#Films > article').addClass('row');
							$('.slideshow0 article').css({'width': '100%', 'height': '100%', 'left': '0'});
						}
					}
				}
			}	
		});	
	});

	$('#moviesearch').on('input', function() {
		var search = $('#moviesearch').val();
		$('.searchseriesnow').remove();
		$('.searchmovienow').remove();
		if (search.length !== 0) {
			$('#searchid').show('fast');
		} else {
			$('#searchid').css('display', 'none');
		}
		$.ajax({
			url:'https://api.themoviedb.org/3/search/multi?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&query=' + search + '&page=1&include_adult=false',
			success: function(data) {

				for(var i = 0; i < Object.keys(data.results).length; i++) {

					if(data.results[i].poster_path !== null) {
						if (data.results[i].title === undefined) {
							$('#searchid').append('<div data-modal='+ data.results[i].id +' class="row searchseriesnow"><img src="https://image.tmdb.org/t/p/w92/'+ data.results[i].poster_path +'" alt="' + data.results[i].name +'"><p>' + data.results[i].name +'</p></div>');
						} else {
							$('#searchid').append('<div data-modal='+ data.results[i].id +' class="row searchmovienow"><img src="https://image.tmdb.org/t/p/w92/'+ data.results[i].poster_path +'" alt="' + data.results[i].title +'"><p>' + data.results[i].title +'</p></div>');	
						}
					}				
				}

			}
		});
	});
	//Fin barre de recherche
});
