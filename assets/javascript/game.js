
$(document).ready(function () {
    // ===================CHARACTER CONSTRUCTOR================== //
    function Character(id, Name, Health, Strength, Counter, Defeated, image) {
        this.id = id
        this.Name = Name,
            this.Health = Health,
            this.Strength = Strength,
            this.Counter = Counter,
            this.Defeated = Defeated
        this.image = image
    }

    const squall = new Character("squall", "Squall Leonhart", 350, 20, 15, false, "/assets/images/squall.jpg")
    const tidus = new Character("tidus", "Tidus Jechtson", 200, 12, 18, false, "/assets/images/Tidus.jpg.png")
    const cloud = new Character("cloud", "Cloud Strife", 300, 24, 13, false, "/assets/images/Cloud.jpg.jpg")
    const lightning = new Character("lightning", "Lightning Farron", 250, 18, 16, false, "/assets/images/lightning.jpg")
    const noctis = new Character("noctis", "Noctis Lucis Caelum", 450, 13, 15, false, "/assets/images/Noctis.jpg.jpg")
    const terra = new Character("terra", "Terra Branford", 150, 30, 18, false, "/assets/images/terra.jpg")

    // =======================GAME VARIABLES=================== //


    const characters = [squall, tidus, cloud, lightning, noctis, terra]



    // =======================FUNCTIONS========================= //

    // PAGE FUNCTIONS //

    // $("#preludetheme")[0].play()

    $("#movessection").hide();

    $("#restart").on("click", function () {
        window.location.reload();
    });

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


    // GAME FUNCTION //

    $(".card button").on('click', function () {

        $("#preludetheme")[0].pause()
        $("#preludetheme")[0].currentTime = 0
        // $("#battletheme")[0].play()

        const player = $(this).attr("data-value")

          console.log(player);

        $("#movessection").fadeIn('slow');

        switch (player) {
            case "squall":
                startFight(squall, characters)
                break;
            case "cloud":
                startFight(cloud, characters)
                break;
            case "tidus":
                startFight(tidus, characters)
                break;
            case "lightning":
                startFight(lightning, characters)
                break;
            case "noctis":
                startFight(noctis, characters)
                break;
            case "terra":
                startFight(terra, characters)
                break;
        }


    });

});

const startFight = (hero, array) => {

    const heroIndex = array.indexOf(hero)

    if (heroIndex > -1) {
        array.splice(heroIndex, 1)
    }

    console.log(array)

    $("#" + hero.id).fadeOut('slow');

    const heroDiv = $("#playersection").html("<img class='selected' src=." + hero.image + ">")

    const heroStats = $.each(hero, (key, value) => {
        $("#hero" + key).html(key + ":  " + value)
    })

    const enemy = array[Math.floor(Math.random() * array.length)];
    console.log(enemy)
    enemyIndex = array.indexOf(enemy)
    console.log(enemyIndex)
    if (enemyIndex > -1) {
        array.splice(enemyIndex, 1)
    }
    console.log(array)

    $("#" + enemy.id).fadeOut('slow');
    const enemyDiv = $("#enemysection").html("<img class='selected' src=." + enemy.image + ">")

    const enemyStats = $.each(enemy, (key, value) => {
        $("#enemy" + key).html(key + ":  " + value)
    })

    $("#attack").on("click", () => {

        hero.Health = hero.Health - enemy.Counter
        enemy.Health = enemy.Health - hero.Strength

        hero.Strength += 20

        $.each(hero, (key, value) => {
            $("#hero" + key).html(key + ":  " + value)
        })

        $.each(enemy, (key, value) => {
            $("#enemy" + key).html(key + ":  " + value)
        })

        $("#attackmsg").html("<h4>" + hero.Name + " strikes " + enemy.Name + " For " + hero.Strength + " damage!</h4>")
        $("#countermsg").html("<h4>" + enemy.Name + " counters " + hero.Name + " For " + enemy.Counter + " damage!</h4>")


        if (hero.Health <= 0) {
            hero.Defeated = true;
            heroDiv.fadeOut();
            $("#attackmsg").empty()
            $("#state").html("<h4>" + hero.Name + " Wins!")
            $("#countermsg").html("<h4>Play Again?</h4>")
            $("#restart").show()
        }

        else if (enemy.Health <= 0) {
            enemy.Defeated = true;
            // $("#battletheme")[0].pause()
            // $("#battletheme")[0].currentTime = 0
            // $("#victorytheme")[0].play()
            $("#message ").empty()
            $("#state").html("<h4>" + hero.Name + " Wins!")
            startFight(hero, array);
        }
    })
}