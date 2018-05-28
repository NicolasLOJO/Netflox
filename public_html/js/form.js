$(document).ready( function () {

	$('#submit').on('click', function(event) {

		var valeur = $('#mon_form').serializeArray();
		var pass1 = findPass1(valeur);
		var pass2 = findPass2(valeur);
		$('.error').remove();
		$('.wrongpass').remove();
		console.log(valeur);

		$.each(valeur, function(i, champ) {
			if(verif(champ.value)) {
				$('#'+ champ.name).removeClass('warning');
			} else {
				$('#'+ champ.name).addClass('warning');
				$('#'+ champ.name).attr('placeholder', 'Champs requis');
				$('<p class=error>Champs Requis</p>').insertAfter('#'+champ.name);
			}
		});

		if (verifPass(pass1, pass2) === false) {

			$('#password').removeClass('.error');
			$('#password').addClass('warning');
			$('#verifpass').addClass('warning');
			$('<p class=wrongpass>Mot de passe non identique</p>').insertAfter('#password');
			$('#verifpass').removeClass('.error');
			$('<p class=wrongpass>Mot de passe non identique</p>').insertAfter('#verifpass');
		}
	});

	function verif(champ) {

		if(champ.length > 0) {

			return true;
		}
	}

	function verifPass(pass1, pass2) {

		if (pass1 !== pass2) {

			return false;
		}
	}

	function findPass1(champ) {
		var pass1;

		for (var i =0; i < Object.keys(champ).length ; i++) {

			if (champ[i].name === 'password') {

				return champ[i].value;
			}
		}
	}

	function findPass2(champ) {
		var pass2;

		for (var i = 0; i < Object.keys(champ).length; i++) {

			if (champ[i].name === 'verifpass') {

				return champ[i].value;
			}
		}
	}
});