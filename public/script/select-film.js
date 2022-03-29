function checkSelect() {
    var display_theatres = document.getElementsByClassName("display-theatre");
    var display_notice = document.getElementsByClassName("display-notice");
    var display_date = document.getElementsByClassName("display-date");
    var display_screenings = document.getElementsByClassName("display-sceening");

    var movies = document.getElementById("movies");
    var theatres = document.getElementById("theatres");
    var date = document.getElementById("date");
    var screenings = document.getElementById("screenings");

    if (movies.value != "none") {
        for (var i = 0; i < display_theatres.length; i++) {
            display_theatres[i].style.display = "inline";
        }

        for (var i = 0; i < display_notice.length; i++) {
            display_notice[i].style.display = "none";
        }

        if (theatres.value != "none") {
            for (var i = 0; i < display_date.length; i++) {
                display_date[i].style.display = "inline";
            }

            if (date.value != "none") {
                for (var i = 0; i < display_screenings.length; i++) {
                    display_screenings[i].style.display = "inline";
                }
            }
        }

    }
}