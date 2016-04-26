$(document).ready(function() {
	var t;
	var tt;

	let session = {
		balance: parseFloat($("#balance").val()),
		
		total: 0,
		wins: 0,
		losses: 0,

		totalBets: 0,

		history: [],
	};

	let settings = {
		multiplier: parseFloat($("#mult").val()),
		winChance: 47.5,// win chance
		speed: parseFloat($("#speed").val()),
	};

	let round = {
		roll: -1,
		initial: 1,
		bet: 1,
		profit: 0,
	};

	$("#start").click(function() {
		$(this).prop( "disabled", true );

		tt = setInterval(function() {
			if (round.bet > session.balance) {
				clearInterval(tt);
				clearInterval(t);
				alert("Insufficient Funds");
				$("#start").prop( "disabled", false );
			}
		}, 1);

		t = setInterval(function() { 
			roll();
		}, settings.speed);
	});

	$("#stop").click(function() {
		clearInterval(t);
		$("#start").prop( "disabled", false );
	});

	function roll() {
		session.totalBets++;
		session.total += round.bet;

		round.roll = Math.random() * 100;

		if (round.roll <= settings.winChance) {
			onWin();
		} else {
			onLose();
		}
	}

	function onWin() {
		let winnings = round.bet*settings.multiplier
		
		session.balance+=winnings;
		session.wins+=winnings;

		round.bet = round.initial;

		let views = [];
		views.push(round.roll);
		views.push("<strong style='color:green;'>" + winnings + "</strong>");

		updateView(views);

	}

	function onLose() {
		session.balance-=round.bet;
		session.losses+=round.bet;

		round.bet*=2;

		let views = [];
		views.push(round.roll);
		views.push("<strong style='color:red;'>" + round.bet + "</strong>");

		updateView(views);
	}

	function updateView(views) {
		// Update history of rolls
		session.history.push(views);

		$("#t").html("");
		session.history.forEach((row) => {
			$("#t").append("<tr><td>" + row[0] + "</td><td>" + row[1] + "</tr>");
		});

		if (session.history.length > 15) {
			session.history.shift();
		}

		// Update session
		$("#balance").val(session.balance);
		$("#profit").val(session.wins - session.losses);
		$("#num").val(session.totalBets);
		$("#total").val(session.total);
		$("#win").val(session.wins);
		$("#lose").val(session.losses);
		$("#bet").val(round.bet);
	}
});