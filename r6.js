var levels = [];
var xp = [];
var totalLevel = 0;

var $ = function (id) {
	return document.getElementById(id);
};

var addLevels = function () {
	var level = $("level").value;
	var errorMessage = "";
	var accountNumber = 0;

	if (level == "") {
		errorMessage = "You must enter a valid level 1 to 999";
	} else if (level < 1 || level > 1000 || isNaN(level)) {
		errorMessage = "You must enter a valid level 1 to 999";
	}
	if (errorMessage == "") {
		$("display_results").disabled = false;
		levels.push(level);

		/*
		console.log("Level entered: " + level);
		console.log(levels);
		*/

		$("accounts").innerHTML = "";
		$("accounts").innerHTML += "<tr><th>Account</th><th>Level</th></tr>";
		for (var i = 0; i < levels.length; i++) {
			accountNumber = accountNumber + 1;
			$("accounts").innerHTML += "<tr><td>#" + accountNumber + "</td><td>" + levels[i] + "</td></tr>";
		}
		$("level").value = "";
		$("level").focus();
		getLevelXp(level);
		$("results").innerHTML = "";
		
	} else {
		alert(errorMessage);
		$("level").focus();
	}
};

var getLevelXp = function (level) {
	var xpNeeded;
	var accountXp = 0;
	for (var i = 0; i < level; i++) {
		xpNeeded = 5000 + (i * 500);
		accountXp += xpNeeded;
	}
	xp.push(accountXp);

	/*
	console.log(xp);
	console.log(xpNeeded);
	console.log("Account Total XP: " + accountXp);
	*/
}

var calculateResults = function () {
	$("display_results").disabled = true;
	var totalXp = 0;
	for (var i = 0; i < levels.length; i++) {
		totalXp += xp[i];
	}

	//console.log("Total XP: " + totalXp);

	var initialXp = 0;
	var levelXp = 0;
	var levelXpArray = [];
	for (var i = 0; i < 999; i++) {
		initialXp = 5000 + (i * 500);
		levelXp += initialXp;
		levelXpArray.push(levelXp);
	}

	/*
	console.log(levelXpArray);
	console.log("Length " + levelXpArray.length);
	*/

	var closest = levelXpArray.reduce(function (prev, curr) {
		return (Math.abs(curr - totalXp) < Math.abs(prev - totalXp) ? curr : prev);
	});

	/*
	console.log("Closest " + closest);
	console.log(totalXp);
	console.log(levelXpArray.indexOf(closest) + 1);
	*/

	$("results").innerHTML += "<br><div id='total_level'>Total Level: " + (levelXpArray.indexOf(closest) + 1) + "</div>";
	totalXp = (totalXp + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	$("results").innerHTML += "<div id='cumulative_xp'>Cumulative XP: " + totalXp + "</div>";
};

var reset = function () {
	location.reload();
};

window.onload = function () {
	$("level").focus();
	$("add").onclick = addLevels;
	$("display_results").onclick = calculateResults;
	$("reset").onclick = reset;
	console.log("Hello from SnD ACiD RAiN");
};
