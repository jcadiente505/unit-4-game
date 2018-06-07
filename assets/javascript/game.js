
// variables
var heroObj
var enemyObj
var heroChoice
var enemyChoice
var enemyCount
var heroHp
var enemyHp
var heroAtk
var enemyAtk
var characterPortrait = $("<img>");

    $(document).ready(function() {
        var heroes;
        var enemies;
        enemyCount;
        // Hides all images in each section until selected
        heroes = $("#herosection").find("button");
        heroes.each(function (index){
            $(this).hide();
        });

        enemies = $("#enemyselector").find("button");
        enemies.each(function(index) {
            $(this).hide();
        });

        enemyCount = $("#enemysection").find("button");
        enemyCount.each(function (index){
            $(this).hide();
        })

        $("#movessection").hide();

    });

    startgame();

// select the character from #heroselector, hides other images, reveals selected char in #herosection
    $("#heroselector button").on("click", function(){

        var pickedHero;
        var allHeroes;
        var attacker;
        var enemiesLeft;

        pickedHero = $(this).attr("class");
        $(this).addClass('hero');

        allHeroes = $("#heroselector").find("button");
        allHeroes.each(function (){
            $(this).hide();
        });

        attacker = ($("#herosection")).find("button");
        attacker.each(function(){
            if ($(this).hasClass('hero')){
                $(this).show();
            }
        });

        heroObj = herostats(pickedHero);
            heroHp = heroObj.health;
            heroAtk = heroObj.attacker;

        $("#herosection").find("herostats").append("<li>" + "Health:" + heroHp);
        $("#herosection").find("herostats").append("<li>" + "Attack:" + heroAtk);
        
        enemiesLeft = $("#enemyselector").find("button");

            enemiesleft.each(function (){
                if (!$(this).hasClass(pickedHero)){
                    $(this).show();
                };
            });
    });

    // select enemy from #enemyselector, hides other images and reveals selected char in the #enemy section 

    $("#enemyselector button").on("click", function(){
        var enemyPicked;
        var enemiesRemaining;

        enemyPicked = $(this).attr("class");
        $(this).addClass("enemy");

        enemiesRemaining = $("#enemyselector").find("button");
        enemiesRemaining.each(function (index){
            if ($(this).hasClass("enemy")){
                $(this).hide();
            };
        });

        enemyCount = $("#enemyselector").find("button");
        enemyCount.each(function (index){
            if ($(this).hasClass("enemy")){
                $(this).hide();
            }
        });

        enemyObj = 
    });