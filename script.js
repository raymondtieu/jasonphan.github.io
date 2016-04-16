$(document).ready(function() {
	var history = [];
	var a = [];
	var t;
	var initial;
	var tt;
	var num = 0;
	var total = 0;
	var winS = 0;
	var loseS = 0;

	$("#start").click(function() {
		$(this).prop( "disabled", true );

		var speed = parseInt($("#speed").val());
		initial = parseInt($("#bet").val());

		var tt = setInterval(function() {
			if (parseInt($("#bet").val()) > parseInt($("#balance").val())) {
				clearInterval(tt);
				clearInterval(t);
				alert("Insufficient Funds");
				$("#start").prop( "disabled", false );
			}
		}, 1);

		t = setInterval(function() { 
			var bal = parseInt($("#balance").val());
			var bet = parseInt($("#bet").val());
			var profit = parseInt($("#profit").val());

			num++;
			total += bet;

			var r = Math.random();
			if (r*100 <= 47.5) {
				$("#balance").val(parseInt(bal + bet));

				if (history.length > 15) {
					history.shift();
				}

				a.push(r*100);
				a.push("<strong style='color:green;'>" + bet + "</strong>");
				$("#profit").val(parseInt(profit + bet));

				history.push(a);

				$("#bet").val(parseInt(initial));

				winS += bet;

			} else {
				$("#balance").val(parseInt(bal - bet));
				if (history.length > 15) {
					history.shift();
				}

				a.push(r*100);
				a.push("<strong style='color:red;'>" + bet + "</strong>");
				$("#profit").val(parseInt(profit - bet));

				history.push(a);
				$("#bet").val(parseInt(bet*2));

				loseS += bet;
			}

			a = [];
			refresh();
			$("#num").val(num);
			$("#total").val(total);
			$("#win").val(winS);
			$("#lose").val(loseS);

		}, speed);
	});

	$("#stop").click(function() {
		clearInterval(t);
		$("#start").prop( "disabled", false );
	});

	function refresh() {
		$("#t").html("");
		for (var i = 0; i < history.length; i++) {
			$("#t").append("<tr><td>" + history[i][0] + "</td><td>" + history[i][1] + "</tr>");
		}

	}
});