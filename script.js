$(document).ready(function() {
    var t;

    let session = {
        balance: parseFloat($("#balance").val()),
        
        total: 0,
        wins: 0,
        losses: 0,

        totalBets: 0,

        history: [],
    };

    let settings = {
        winChance: parseFloat($("#chance").val()),
        speed: parseFloat($("#speed").val()),
        maxBet: parseFloat($("#maxBet").val()),

        winBase: false,
        loseBase: false,

        winMultiplier: 1,
        loseMultiplier: 1,
    };

    let round = {
        roll: -1,
        initial: 1,
        bet: 1
    };

    $("#start").click(function() {
        $(this).prop( "disabled", true );

        session.balance = parseFloat($("#balance").val());

        settings.speed = parseFloat($("#speed").val());
        settings.winChance = parseFloat($("#chance").val());
        settings.maxBet = parseFloat($("#maxBet").val());

        settings.winBase = $("#winReturnToBase").prop("checked");
        settings.loseBase = $("#loseReturnToBase").prop("checked");
        settings.winMultiplier = parseFloat($("#winMultiplierVal").val());
        settings.loseMultiplier = parseFloat($("#loseMultiplierVal").val());

        console.log(settings);

        round.initial = parseFloat($("#bet").val());
        round.bet = round.initial;

        t = setInterval(function() { 
            roll();
        }, settings.speed);

        $(".setting").each((i, e) => {
            $(e).prop("disabled", true);
        });
        $("#start").addClass("disabled");
    });

    $("#stop").click(function() {
        clearInterval(t);
        $("#start").prop( "disabled", false );
        $("#start").removeClass("disabled");

        $(".setting").each((i, e) => {
            $(e).prop("disabled", false);
        });
    });

    function roll() {
        if (round.bet > session.balance) {
            clearInterval(t);
            alert("Insufficient Funds");

            $("#stop").click();
            return;
        }

        if (round.bet > settings.maxBet) {
            clearInterval(t);
            alert("Max bet is reached");

            $("#stop").click();
            return;
        }

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
        //TODO
        let payout = 1;

        let winnings = round.bet * payout;
        
        session.balance+=winnings;
        session.wins+=winnings;

        let views = [];
        views.push(round.roll);
        views.push("<strong style='color:green;'>" + winnings + "</strong>");

        updateView(views);

        if (settings.winBase) {
            round.bet = round.initial;
        } else {
            round.bet *= settings.winMultiplier;
        }
    }

    function onLose() {
        session.balance-=round.bet;
        session.losses+=round.bet;

        let views = [];
        views.push(round.roll);
        views.push("<strong style='color:red;'>" + round.bet + "</strong>");

        updateView(views);

        if (settings.loseBase) {
            round.bet = round.initial;
        } else {
            round.bet *= settings.loseMultiplier;
        }
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

function sliderChange(val) {
    $("#chance").val(val);
}

function chanceChange(val) {
    $("#slider").val(val);
}
