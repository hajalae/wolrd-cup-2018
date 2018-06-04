
function compte_a_rebours()
{
	var date_actuelle = new Date();
	var date_evenement = new Date("Jun 14 17:00:00 2018");

	var total_secondes = (date_evenement - date_actuelle) / 1000;

	 if (total_secondes > 0)
	 {
	    var jours = Math.floor(total_secondes / (60 * 60 * 24));
	    var heures = Math.floor((total_secondes - (jours * 60 * 60 * 24)) / (60 * 60));
	    var minutes = Math.floor((total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
		var secondes = Math.floor(total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

		document.getElementById("jours").innerHTML = jours<10 ? "0" + jours : jours;
		document.getElementById("heures").innerHTML = heures<10 ? "0" + heures : heures;
		document.getElementById("minutes").innerHTML = minutes<10 ? "0" + minutes : minutes;
		document.getElementById("secondes").innerHTML = secondes<10 ? "0" + secondes : secondes;
 	}
}

setInterval("compte_a_rebours()", 1000);