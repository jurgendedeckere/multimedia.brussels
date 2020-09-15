// function that calls to your personal video made by website "Lapentor" and place your name and city in it
function myFunction() {
    var naam = encodeURIComponent(document.getElementById("naam").value);
    var stad = encodeURIComponent(document.getElementById("stad").value);
    document.getElementById(
        "personalvideo").innerHTML = "<iframe class='hippo-embed-frame ' width='100%'  scrolling='no' frameborder=0 marginwidth=0 marginheight=0 src='https://erasmushogeschoolkyopo4.hippovideo.io/video/embed/j8_y_5RoWAdYTuW0hS_879oYHiio0WfYMbSSHMrE1bg?Email=outro%40erasmus.com&City=" + eStad + "&First%20Name=" + eName + "&utm_source=hv-campaigns&hreferer=private&_=1593122661057&%20Watch%20Video' allowfullscreen ></iframe>";
}

// this function copied the following link to your clipboard. credits goes to wienert gillijns
function copy() {
    var copyText = "https://erasmushogeschoolb0zz0v.hippovideo.io/video/embed/x9uNnABZNWoMho7_aGO-c1wn8jZJY7-zfRzKW55xzUQ?Email=test.test%40icloud.com&First%20Name=" + eName +"&City=" + eStad +"&utm_source=hv-campaigns&hreferer=private&_=1592511058592&;";
    var el = document.createElement('textarea');
    el.value = copyText;
    el.setAttribute('readonly', '');
    el.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}



// jquery
$(function () {

    // for knowing which slide is active. use for switch case later on
    var index = 1;

    // for knowing which tutorial popUp is active at the beginning.
    var index2 = 0;

    // used for function so it does not repeat itself. could haave been done otherwise aswell
    test = true;

    // general default items that cannot be displayed atthe beginning
    $(".overlay2,.tut1,.tut2,.tut4,.timeLine,#promt,#overgang,.optioneel,.stop,#terug,.horseAll div").hide();

    //removes video controls like pause, stop, fast forward,..
    $('video').prop("controls", false);

    //call switch case function and active class has to start at 0 (0 = 1 for in my case)
    tuto();
    $(".dots").children().eq(1).addClass("active");

    //hover effect on the chatbot
    $(".horseAll img").hover(function () {
        $(".horseAll div").fadeIn();
    }, function () {
        $(".horseAll div").fadeOut();
    })

    //for the tutorial at the the beginning, when on click either the go button or just the behind black overlay
    $(".overlay2,#go").click(function () {

        //get all form inputs
        var a = $(".a").val();
        var b = $(".b").val();
        var c = $(".c").val();

        //tutorial popUp fadeOut
        $(".overlay").children().eq(index2).fadeOut();
        //adds one so it knows that it has to go  to the next tutorial popUp
        index2++;

        //for it has to check if all input field have a value and for the email the @ sysmbol. else it goes back to the form popUp
        if (a !== "" && b !== "" && c !== "" && b.indexOf("@") >= 0) {

            //if succeeds.. next tutorial popUp appears
            $(".overlay").children().eq(index2).fadeIn();

            

            //at third tutorial popUp trigger the video
            if (index2 == 2) {
                $("video").trigger('play');
                $(".timeLine").css("z-index", "0");
                //at second tutorial popUp 
            } else if (index2 == 1) {
                //remove all spaces whitin the inputs
                //var naam = $("#naam").val().replace(/\s+/g, '');
                //var stad = $("#stad").val().replace(/\s+/g, '');

                var naam = $("#naam").val();
                var stad = $("#stad").val();
                var email = $("#email").val();

                var eName = encodeURIComponent($("#naam").val());
                var eStad = encodeURIComponent($("#stad").val());
                var eEmail = encodeURIComponent($("#email").val());
               

                $.get("save.php?name=" + eName + "&email="+eEmail+"&city="+eStad);

                //set the link for social media share ready for later on
                $(".facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=https%3A//erasmushogeschoolb0zz0v.hippovideo.io/video/embed/x9uNnABZNWoMho7_aGO-c1wn8jZJY7-zfRzKW55xzUQ?Email="+eEmail+"%26First%2520Name=" + eName + "%26City=" + eStad + "%26utm_source=hv-campaigns%26hreferer=private%26_=1592511058592%26")
                $(".twitter").attr("href", "https://twitter.com/intent/tweet?text=Net%20een%20unieke%20belevenis%20gehad,%20de%20virtuele%20tour%20van%20Erasmus%20Hogeschool%20Brussel.%20https%3A//erasmushogeschoolb0zz0v.hippovideo.io/video/embed/x9uNnABZNWoMho7_aGO-c1wn8jZJY7-zfRzKW55xzUQ?Email="+eEmail+"%26First%2520Name=" + eName + "%26City=" + eStad + "%26utm_source=hv-campaigns%26hreferer=private%26_=1592511058592%26;")

                //set occasional popUps throughout the tour text ready. general stuff could have been written elsewhere
                $("#catch2").text("Maak gebruik van de bolletjes om je te navigeren doorheen onze school, " + naam);
                $("#plaats2").text("Bekijk zeker ook onze introductievideo! Zo kan je vanuit " + stad + " alle troeven van campus Kaai ontdekken!");

                //disables click function on tour slide buttons
                $(".dots,.dot1,.dot2,.dot3,.dot4,.dot5").off('click');

                //highlights the tour slide buttons since this second popUp explains about what these buttons are
                $(".timeLine").css("z-index", "20");
            }
            //at fourth tutorial popUp which does not exist we"re going the remove every overlay and popUp. reEnables the slide buttons and chatbot appears
            if (index2 == 3) {
                $("video").get(0).pause();
                $(".overlay2").fadeOut();
                $(".horseAll div").delay(2000).fadeIn();
                $(".horseAll div").delay(8000).fadeOut();
                $(".dots").on("click", slides());
                $(".dot1,.dot2,.dot3,.dot4,.dot5").on("click", slides2())
            }
        } else {
            //already been explained
            index2 = 0;
            $(".overlay").children().eq(index2).fadeIn();
            $("#fout").text("Gelieve alle velden in te vullen en een geldig e-mailadres in te voeren")
        }
    })



    //waiting till iframe is loaded. only used at the start.. therefor the boolean
    $("iframe").on("load", function () {
        if (test == true) {
            $('.overlay2').delay(3000).fadeIn('slow', function () {
                $(".overlay").children().eq(index2).fadeIn();
                $(".timeLine").fadeIn();
            })
            test = false;
        }

    })

    // function switch case used to know at which slide of  the tour we are on
    function tuto() {
        switch (index) {

            //for each slide the iframe and transition video is be changed and will be replayed
            case 1:
                $("iframe").attr("src", "https://app.lapentor.com/sphere/start-1");

                break;

            case 2:
                $("#overgang").attr("src", "beelden/final_medialab.mp4");
                $("#overgang").fadeIn();
                $("#overgang").trigger('play');
                $("iframe").attr("src", "https://app.lapentor.com/sphere/medialab");

                $("#overgang").on("ended", function () {
                    $("#overgang").fadeOut();
                });


                break;

            case 3:
                $("iframe").attr("src", "https://app.lapentor.com/sphere/computerlokaal");
                $("#overgang").attr("src", "beelden/final_computerlokaal.mp4");
                $("#overgang").fadeIn();
                $("#overgang").trigger('play');
                $("#overgang").on("ended", function () {
                    $("#overgang").fadeOut();
                });



                break;


            case 4:
                $("#overgang").attr("src", "beelden/final_aula.mp4");
                $("#overgang").fadeIn();
                $("#overgang").trigger('play');
                $("iframe").attr("src", "https://app.lapentor.com/sphere/aula");
                $("#overgang").on("ended", function () {
                    $("#overgang").fadeOut();
                });
                break;

            case 5:
                $(".overlay").fadeOut();
                $("iframe").attr("src", "https://app.lapentor.com/sphere/design");
                $("#overgang").attr("src", "beelden/final_design.mp4");
                $("#overgang").fadeIn();
                $("#overgang").trigger('play');
                $("#overgang").on("ended", function () {
                    $("#overgang").fadeOut();

                });

                break;

            case 6:
                //end of the tour which opens the "wish to leave the tour popUp"
                $(".overlay2,#promt").fadeIn();

        }
    }
    // for the popUps which you have to choose if you want to go or stay. if u want to stay (nee). removes every overlay and popUp
    $("#Nee,.Nee2").click(function () {
        $(".overlay2,.optioneel,#promt").fadeOut();
    })

    // the occasional popUp appears every 3 and 5 times
    var counter1 = 0;

    function slides2() {
        $(".dot1,.dot2,.dot3,.dot4,.dot5").click(function () {
            counter1++;
            if (counter1 == 3 || counter1 == 7) {

                $("#image").css("background-image", "url('beelden/refter.jpg')");
                $("#catch").text("Zin een pauze?");
                $("#plaats").text("Bezoek dan ons studentenrestaurant.");

                //calls fuction optie
                optie();
            }

        })
    }

    function optie() {
        //occasional popp appears
        $(".overlay2").fadeIn();
        $(".optioneel").delay(1000).fadeIn();

        // If you accept the occaasional popUp. you go to different slide/scene
        $("#Ja").click(function () {
            //back to originnal tour button
            $("#terug").delay(2000).fadeIn();
            //everything else dissapears
            $(".optioneel,.dots,#next,.overlay2").fadeOut();

            $("iframe").attr("src", "https://app.lapentor.com/sphere/refter");
            $("#overgang").attr("src", "beelden/final_refter.mp4");

            //if its at its firth time then change the location
            if (counter1 % 5 == 0) {
                $("iframe").attr("src", "https://app.lapentor.com/sphere/secretariaat");
                $("#overgang").attr("src", "beelden/final_secretariaat.mp4");
            }

            //transsition
            $("#overgang").fadeIn();
            $("#overgang").trigger('play');

            $("#overgang").on("ended", function () {
                $("#overgang").fadeOut();
            });

        })

        //back to  original tour button click function
        $("#terug").click(function () {
            $("#terug").fadeOut();
            $(".overlay2").fadeOut();
            tuto();
            $(".dots,#next").delay(2000).fadeIn();
        })
    }


    //navigate between all tour slides
    function slides() {
        $(".dots .dot").click(function () {
            index = ($(this).index());
            if (index <= 5) {
                $(".dot").removeClass("active");
                $(".dots").children().eq(index).addClass("active");
            }

            tuto();
        });
    }


    //wish the leave popUp Yes answer
    $(".Ja2").click(function () {

        //creates video
        myFunction();
        $("#frame1,.timeLine,#promt").fadeOut();
        $(".stop").fadeIn();

    })

    //changes button to alert link is copied
    $(".kopieer").click(function(){
        $(this).text("GEKOPIEERD!");
        $(this).css("color","#e30713")
        $(this).css("border","2px solid #e30713")
    })

})