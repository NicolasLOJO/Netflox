$(document).ready( function () {
	//Bouton nav gauche - droite
	$('#corps > section').append('<span class=myLeft><img class=mybutton src=../Pictures/arrow.svg></span>');
	$('#corps > section').append('<span class=myRight><img class=mybutton src=../Pictures/arrow.svg></span>');
	//fin bouton nav
	//Debut liste
    function takeList() {
    	var liste1, liste2, liste3;
        $.ajax({
            url:'https://api.themoviedb.org/3/movie/popular?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&page=1',
            success: function(liste1) {
            	$.ajax({
					url:'https://api.themoviedb.org/3/tv/popular?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&page=1',
					success: function(liste2) {
						$.ajax({
							url:'https://api.themoviedb.org/3/genre/99/movies?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&include_adult=false&sort_by=created_at.desc',
							success: function(liste3) {
								createList(liste1,liste2, liste3);
							}
						});
            		}
        		});
			}
		});	
    }
    function createList(liste1, liste2, liste3) {
        for(var i = 0; i < Object.keys(liste1.results).length; i++) {
        	if (liste1.results[i].poster_path !== null && liste1.results[i].backdrop_path !== null) {
            	$('#Films > article').append('<figure data-modal=' + liste1.results[i].id + ' name=film class="items movie"><image class=open src="https://image.tmdb.org/t/p/w342/' + liste1.results[i].poster_path +'" alt="' + liste1.results[i].title +'"><figcaption>' + liste1.results[i].title + '</figcaption></figure>');
        	}   
        }		
		for(var i = 0; i < Object.keys(liste2.results).length; i++) {
			if (liste2.results[i].poster_path !== null && liste2.results[i].backdrop_path !== null) {
				$('#Series > article').append('<figure data-modal=' + liste2.results[i].id + ' name=serie class="items series"><image class=open src="https://image.tmdb.org/t/p/w342/' + liste2.results[i].poster_path +'" alt="' + liste2.results[i].name +'"><figcaption>' + liste2.results[i].name + '</figcaption></figure>');
			}	
		}   
		for(var i = 0; i < Object.keys(liste3.results).length; i++) {
			if (liste3.results[i].poster_path !== null && liste3.results[i].backdrop_path !== null) {
				$('#Documentaires > article').append('<figure data-modal=' + liste3.results[i].id + ' name=film class="items movie"><image class=open src="https://image.tmdb.org/t/p/w342/' + liste3.results[i].poster_path +'" alt="' + liste3.results[i].title +'"><figcaption>' + liste3.results[i].title + '</figcaption></figure>');
			}
		}     
    }
    //fin liste
    //Requete info film-serie
    function requete(id, type) {
    	if(type === 'film') {
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
    	}
    	if(type === 'serie') {
	        $.ajax({
				url:'https://api.themoviedb.org/3/tv/' + id +'?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
			success: function(data) {
				$('#movie-title').text(data.name);
				$('#movie-year').text(data.first_air_date);
				$('#movie-plot').text(data.overview);
				$('#movie-director').text(data.created_by[0].name);
				if (data.backdrop_path !== null) {
	            	$('.hiddenInfo').css({'background-image': 'url("http://image.tmdb.org/t/p/original' + data.backdrop_path +'")', 'background-size': '1920px', 'background-position': 'center'});
	            } else {
	            	$('.hiddenInfo').css({'background-image': 'url("../Pictures/back.jpg")', 'background-size': 'auto', 'background-position': 'center'});
	            }
	       	}});
    	}
	}
	//Fin requete
	//Popup
	var modal = $('.hiddenInfo');
	var button = $('.close');
	$('article').on('click', 'figure', function () {
		$('.hiddenInfo').css({'background-image': ''});
		$('body').css({'overflow': 'hidden'});
		modal.fadeToggle('slow');
		var id = $(this).data('modal');
		var type = $(this).attr('name');
		requete(id, type);
	});
	$('.hiddenInfo > div > a').on('click', function () {
			$('body').css({'overflow': ''});
			modal.fadeToggle('slow');
	});
	$('div > ul > li > a').on('click', function () {
			$('body').css({'overflow': ''});
			modal.fadeOut('slow');
	});
	//fin popup
	takeList();
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
	//Search bar
	$('#launchsearch').on('click', function () {
		var id = $('#moviesearch').val();
		$('#moviesearch').val('');
		$('#searchid').fadeOut('fast');
		$.ajax({
			url:'https://api.themoviedb.org/3/search/multi?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&query=' + id + '&page=1&include_adult=false',
			success: function(data) {
				$('#Films figure').remove();
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
				for(var i = 0; i < Object.keys(data.results).length; i++) {
					if(data.results[i].poster_path !== null) {
						if (data.results[i].title === undefined) {
							$('#Films > article').append('<figure data-modal=' + data.results[i].id + ' name=serie class="items series col-2 film'+i+'"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].name +'"><figcaption>' + data.results[i].name + '</figcaption></figure>');
						} else {
							$('#Films > article').append('<figure data-modal=' + data.results[i].id + ' name=film class="items films col-2 film'+i+'"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].title +'"><figcaption>' + data.results[i].title + '</figcaption></figure>');
						}
					}
				}
			}	
		});	
	});
	$('#moviesearch').on('input', function() {
		var search = $('#moviesearch').val();
		modal.fadeOut('slow');
		$('.search').remove();
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
							$('#searchid').append('<div data-modal='+ data.results[i].id +' name=serie class="row search"><img src="https://image.tmdb.org/t/p/w92/'+ data.results[i].poster_path +'" alt="' + data.results[i].name +'"><p>' + data.results[i].name +'</p></div>');
						} else {
							$('#searchid').append('<div data-modal='+ data.results[i].id +' name=film class="row search"><img src="https://image.tmdb.org/t/p/w92/'+ data.results[i].poster_path +'" alt="' + data.results[i].title +'"><p>' + data.results[i].title +'</p></div>');	
						}
					}				
				}

			}
		});
	});
	$('div').on('click', 'div.search', function () {
		$('body').css({'overflow': 'hidden'});
		$('#searchid').fadeOut('fast');
		$('#moviesearch').val('');
		modal.fadeIn('slow');
		var id = $(this).data('modal');
		var type =$(this).attr('name');
		requete(id, type);
	});
	$('body').on('click', function() {
		$('#searchid').fadeOut('fast');
	});
	//Fin barre de recherche
	//debut submenu
	$('#mySubCat').on('click', '.subcat',  function() {
		var id = $(this).data('modal');
		var titreId = $(this).attr('id');
		var type = $(this).attr('name');
		$('#Films figure').remove();
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
		if (type === 'film') {
			$('#Films h2').replaceWith('<h2>Films : ' + titreId + '</h2>');
			$.ajax({url:
				'https://api.themoviedb.org/3/discover/movie?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='+id,
				success: function(data) {
					for (var i = 0; i < Object.keys(data.results).length; i++) {
						if (data.results[i].poster_path !== null) {
							$('#Films > article').append('<figure data-modal=' + data.results[i].id + ' name=film class="items movie col-auto col-xl-2"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].title +'"><figcaption>' + data.results[i].title + '</figcaption></figure>');
						}
					}
				}
			});
		}
		if (type === 'serie') {
			$('#Films h2').replaceWith('<h2>Series : ' + titreId + '</h2>');
			$.ajax({url:
				'https://api.themoviedb.org/3/discover/tv?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=' + id +'&include_null_first_air_dates=false',
				success: function(data) {
					for (var i = 0; i < Object.keys(data.results).length; i++) {
						if (data.results[i].poster_path !== null) {
							$('#Films > article').append('<figure data-modal=' + data.results[i].id + ' name=serie class="items movie col-auto col-xl-2"><image class=open src="https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path +'" alt="' + data.results[i].name +'"><figcaption>' + data.results[i].name + '</figcaption></figure>');
						}
					}
				}
			});
		}
	});
	function submenu() {
		$.ajax({url:
        	'https://api.themoviedb.org/3/genre/movie/list?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
        	success: function(data) {
        		$.ajax({url:
        			'https://api.themoviedb.org/3/genre/tv/list?api_key=44a293499bc60fded2357760668ac47c&language=fr-FR',
        			success: function(data2) {
        				for(var i = 0; i < Object.keys(data.genres).length; i++) {
        					$('.subfilm').append('<a class="dropdown-item subcat" name=film data-modal=' + data.genres[i].id + ' id=' + data.genres[i].name +'>' + data.genres[i].name +'</a>');
        				}
        				for(var i = 0; i < Object.keys(data2.genres).length; i++) {
        					$('.subseries').append('<a class="dropdown-item subcat" name=serie data-modal=' + data2.genres[i].id + ' id=' + data2.genres[i].name +'>' + data2.genres[i].name +'</a>');
        				}
        			}
        		})
        		
        	}
        });
	}
	submenu();
});