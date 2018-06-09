
    $(document).ready(function() {
        // variables
        var enemy;
        var hero;
        var enemyCount;
        var heroHp;
        var enemyHp;
        var heroAtk;
        var enemyAtk;
        var heroCounter;
        var enemyCounter;
        var pickedHero;
        var enemyPicked;
        var enemiesRemaining;
        var allHeroes;
        var enemiesLeft;
        var heroeselector;
        var enemies;
        var squall = {
            health: 140,
            attack: 10,
            counter: 8,
            defeated: false
        };
        var cloud = {
            health: 180,
            attack: 8,
            counter: 10,
            defeated: false
        };
        var tidus = {
            health: 130,
            attack: 6,
            counter: 15,
            defeated: false
        };
        var noctis = {
            health: 200,
            attack: 5,
            counter: 13,
            defeated: false
        };
    
        
        // Hides all images in each section until selected
        heroeselector = $("#herosection").find("button");
        heroeselector.each(function (index){
            $(this).hide();
        });

        enemies = $("#enemyselector").find("button");
        enemies.each(function(index) {
            $(this).hide();
        });

        enemyCount = $("#enemysection").find("button");
        enemyCount.each(function (index){
            $(this).hide();
        });

        $("#movessection").hide();

    

// select the character from #heroselector, hides other images, reveals selected char in #herosection
    $("#heroselector button").on("click", function(){


        pickedHero = $(this).attr("id");
        $("#hero-" + pickedHero).show();
        console.log(pickedHero);

        allHeroes = $("#heroselector").find("button");
        allHeroes.each(function (){
            $(this).hide();
        });

        enemiesLeft = $("#enemyselector").find("button");
        enemiesLeft.each(function (){
            $(this).show();
            });

        hero = charConstructor(pickedHero);
		heroHp = hero.health;
		heroAtk = hero.attack;
        heroCounter = hero.counter;

        $("#herosection").find("#herostats").append("<li>" + "Hero Health: " + "<span id = 'heroHealthStat'>" + heroHp + "</span>" + "</li>");
        $("#herosection").find("#herostats").append("<li >" + "Hero Attack: " + "<span id = 'heroAttackStat'>" + heroAtk + "</span>" + "</li>");
        $("#herosection").find("#herostats").append("<li>" + "Hero Counter Attack: " + "<span id = 'heroCounterStat'>" + heroCounter + "</span>" + "</li>");
        
        
    });

    // select enemy from #enemyselector, hides other images and reveals selected char in the #enemy section 

    $("#enemyselector button").on("click", function(){
       
        enemyPicked = $(this).attr("id");
        $("#enemy-" + enemyPicked).show();
        console.log("enemy picked", enemyPicked)
    
        enemiesRemaining = $("#enemyselector").find(enemyPicked)
        $(this).hide();

        enemy = charConstructor(enemyPicked);
        console.log("second enemy picked", enemy);
		enemyHp = enemy.health;
		enemyAtk = enemy.attack;
        enemyCounter = enemy.counter;

        $("#enemysection").find("#enemystats").append("<li>" + "Enemy Health: " + "<span id = 'enemyHealthStat'>" + enemyHp + "</span>" + "</li>");
        $("#enemysection").find("#enemystats").append("<li >" + "Enemy Attack: " + "<span id = 'enemyAttackStat'>" + enemyAtk + "</span>" + "</li>");
        $("#enemysection").find("#enemystats").append("<li>" + "Enemy Counter Attack: " + "<span id = 'enemyCounterStat'>" + enemyCounter + "</span>" + "</li>");
    });

    var charConstructor = function(character){

        if(character === "cloud"){
            return cloud;
        }
        else if(character === "squall"){
            return squall;
        }
        else if(character === "tidus"){
            return tidus;
        }
        else if(character === "noctis"){
            return noctis; 
        }   
    }

    $("#attack").on("click", function(){

        heroHp = heroHp - enemyCounter;
        console.log(enemyCounter)
        console.log(heroHp)
        enemyHp = enemyHp - heroAtk;
    
        heroAtk = heroAtk+6;
    
        $("#herosection").find("#herostats").html(`<ul><li> Hero Health: ${heroHp}</li> <li> Hero Attack: ${heroAtk}</li> <li> Hero Counter: ${heroCounter}</li></ul>`);
        $("#enemysection").find("#enemystats").html(`<ul><li> Enemy Health: ${enemyHp}</li> <li> Enemy Attack: ${enemyAtk}</li> <li> Enemy Counter: ${enemyCounter}</li></ul>`);
        
        if(enemyHp <= 0){
            enemy.defeated = true;
            $("#enemysection").find(".character").hide();
            alert("You Won!")
        }
    
        else if(heroHp <= 0){
            hero.defeated = true;
            $("#herosection").find(".character").hide();
            alert("You Lose")
        }
    });

    $("#restart").on("click", function(){
        location.reload()
    })
});
