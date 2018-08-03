

// ===================CHARACTER CONSTRUCTOR================== //
function Character(id, Name, Health, Strength, Counter, Defeated, image) {
    this.id = id,
        this.Name = Name,
        this.Health = Health,
        this.Strength = Strength,
        this.Counter = Counter,
        this.Defeated = Defeated
    this.image = image
};

const squall = new Character("squall", "Squall Leonhart", 350, 20, 15, false, "./assets/images/squall.jpg");
const tidus = new Character("tidus", "Tidus Jechtson", 200, 12, 18, false, "./assets/images/Tidus.jpg.png");
const cloud = new Character("cloud", "Cloud Strife", 300, 24, 13, false, "./assets/images/Cloud.jpg.jpg");
const lightning = new Character("lightning", "Lightning Farron", 250, 18, 16, false, "./assets/images/lightning.jpg");
const noctis = new Character("noctis", "Noctis Lucis Caelum", 450, 13, 15, false, "./assets/images/Noctis.jpg.jpg");
const terra = new Character("terra", "Terra Branford", 150, 30, 18, false, "./assets/images/terra.jpg");

// =======================GAME VARIABLES=================== //


const characters = [squall, tidus, cloud, lightning, noctis, terra];
let heroPick = false;
let hero;
let enemyPick = false;
let enemy;
let beginFight = false;
let defeated = 0;



// =======================FUNCTIONS========================= //

$(document).ready(function () {

    // =============================PAGE FUNCTIONS=============================== //

    // $("#preludetheme")[0].play()

    $("#battlesection").hide();

    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });


    // ===============================GAME FUNCTIONS======================================= //

    // click listener to grab the player hero and the enemy
    $(".card button").on('click', function () {

        $("#attackmsg").empty();
        $("#countermsg").empty();
        $("#state").empty();
        // ==============GRAB THE HERO================ //

        if (heroPick == false) {
            // clear battle message div

            // grab the name of the selected hero
            let selected = $(this).attr("data-value")
            console.log(selected)
            // loop through the characters array
            for (let i = 0; i < characters.length; i++) {
                // check if the data value matches an object
                if (selected == characters[i].id) {
                    hero = characters[i]
                }
            }

            console.log(hero)
            console.log(enemy)

            const heroIndex = characters.indexOf(hero)

            if (heroIndex > -1) {
                characters.splice(heroIndex, 1)
            }

            // fade out the hero picked card
            $("#" + hero.id).fadeOut('slow');
            $("#playercard").fadeIn('slow')

            console.log(characters)
            selected = "";
            heroPick = true;
            return;
        }

        // ============GRAB THE ENEMY=========== //

        else if (heroPick !== false && enemyPick == false) {

            let selected = $(this).attr("data-value")
            console.log(selected)
            // loop through the characters array
            for (let i = 0; i < characters.length; i++) {
                // check if the data value matches an object
                if (selected == characters[i].id) {
                    enemy = characters[i]
                }
            }

            console.log(enemy);
            console.log(hero)

            const enemyIndex = characters.indexOf(enemy)

            if (enemyIndex > -1) {
                characters.splice(enemyIndex, 1)
            }

            $("#" + enemy.id).fadeOut('slow');
            $("#enemycard").fadeIn('slow')

            console.log(characters)
            selected = "";
            enemyPick = true;
            // ===============BEGIN THE FIGHT============ //
            startFight(hero, enemy);
            return;
        }
    });

});

// FIGHT FUNCTIONS

function startFight(hero, enemy) {

    $("#battlesection").fadeIn();
    $("#restart").hide();
    $("#attackmsg").empty();
    $("#countermsg").empty();


    // add the hero image to the player card
    $("#heroimg").attr("src", hero.image);
    // update hero stats
    $.each(hero, (key, value) => {
        $("#hero" + key).html(key + ":  " + value)
    });

    $("#enemyimg").attr("src", enemy.image)

    const enemyStats = $.each(enemy, (key, value) => {
        $("#enemy" + key).html(key + ":  " + value)
    })

    $("#attack").on("click", () => {

        if (beginFight == false) {
        
            if (hero.Health > 0 && enemy.Health > 0) {

                hero.Strength += 100;

                hero.Health = hero.Health - enemy.Counter
                enemy.Health = enemy.Health - hero.Strength

                $.each(hero, (key, value) => {
                    $("#hero" + key).html(key + ":  " + value)
                });

                $.each(enemy, (key, value) => {
                    $("#enemy" + key).html(key + ":  " + value)
                });

                $("#attackmsg").html(hero.Name + " strikes " + enemy.Name + " For " + hero.Strength + " damage!")
                $("#countermsg").html(enemy.Name + " counters " + hero.Name + " For " + enemy.Counter + " damage!")

                if (hero.Health <= 0) {
                    hero.Defeated = true;
                    heroDiv.fadeOut();
                    $("#attackmsg").empty()
                    $("#state").html("<h4>" + enemy.Name + " Wins!")
                    $("#countermsg").empty();
                    $("#restart").on("click", function(){
                        location.reload();
                    });
                    
                    $("#restart").show();
                    beginFight = false;
                    return;
                }

                if (enemy.Health <= 0) {
                    defeated += 1
                    enemy.Defeated = true;
                    $("#enemycard").fadeOut('slow');
                    // $("#battletheme")[0].pause()
                    // $("#battletheme")[0].currentTime = 0
                    // $("#victorytheme")[0].play()
                    $("#attackmsg").empty()
                    $("#countermsg").empty();
                    $("#state").html(hero.Name + " Wins!")

                    if (defeated < 5) {
                        $("#attackmsg").html("You defeated " + enemy.Name)
                        $("#countermsg").html("Pick another opponent below!")

                        beginFight = false;
                        enemyPick = false;
                        return
                    }
                    else {
                        $("#attackmsg").empty();
                        $("#countermsg").empty();

                        $("#restart").on("click", function(){
							location.reload();
                        });
                        
                        $("#restart").show();
                        beginFight = false;
                        return
                    }
                }
            }
        }
    })

}

