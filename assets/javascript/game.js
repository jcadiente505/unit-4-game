
// variables
var heroChoice
var enemyChoice
var heroObj
var enemyObj
var enemyCount
var heroHp
var enemyHp
var heroAtk
var enemyAtk
var characterPortrait = $("<img>");

    function startgame() {
        var heroes;
        var enemies;
        enemyCount;
        // Hides all images in each section until selected
        heroes = $("#herosection").find("button");
        heroes.each(function (index){
            $(this).hide();
        });

        enemies = $("#enemysection").find("button");
        enemies.each(function(index) {
            $(this).hide();
        });

        enemyCount = $("#enemyselector").find("button");
        enemyCount.each(function (index){
            $(this).hide();
        })

        $("#movessection").hide();

    }

    startgame();

// select the character from #heroselector, hides other images, reveals selected char in #herosection
    $("#heroselector button").on("click", function(){

        var pickedHero;
        var allHeroes;
        var attacker;
        var enemiesLeft;

        pickedHero = $(this).attr("class");
        $(this).addClass('selected');

        allHeroes = $("#heroselector").find("button");
        allHeroes.each(function (){
            $(this).hide();
        });

        attacker = $("#herosection").find("button");
        attacker.each(function(){
            if ($(this).hasClass(pickedHero)){
                $(this).show();
            }
        });

        enemiesLeft = $("#enemyselector").find("button");

            enemiesleft.each(function (){
                if ($(this).hasClass('selected')){
                    $(this).show();
                }
            })
    });

    // select enemy from #enemyselector, hides other images and reveals selected char in the #enemy section 