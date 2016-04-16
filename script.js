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

		var speed = parseFloat($("#speed").val());
		var mult = parseFloat($("#mult").val());
		initial = parseFloat($("#bet").val());

		var tt = setInterval(function() {
			if (parseFloat($("#bet").val()) > parseFloat($("#balance").val())) {
				clearInterval(tt);
				clearInterval(t);
				alert("Insufficient Funds");
				$("#start").prop( "disabled", false );
			}
		}, 1);

		t = setInterval(function() { 
			var bal = parseFloat($("#balance").val());
			var bet = parseFloat($("#bet").val());
			var profit = parseFloat($("#profit").val());

			num++;
			total += bet;

			var r = Math.random();
			if (r*100 <= 47.5) {
				$("#balance").val(parseFloat(bal + bet*mult));

				if (history.length > 15) {
					history.shift();
				}

				a.push(r*100);
				a.push("<strong style='color:green;'>" + bet*mult + "</strong>");
				$("#profit").val(parseFloat(profit + bet*mult));

				history.push(a);

				$("#bet").val(parseFloat(initial));

				winS += bet*mult;

			} else {
				$("#balance").val(parseFloat(bal - bet));
				if (history.length > 15) {
					history.shift();
				}

				a.push(r*100);
				a.push("<strong style='color:red;'>" + bet + "</strong>");
				$("#profit").val(parseFloat(profit - bet));

				history.push(a);
				$("#bet").val(parseFloat(bet*2));

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