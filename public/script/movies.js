// var getClickHour = document.querySelector('.movie-hour')
// var getHour = document.querySelectorAll('.movie-hour-table')
const button_checkout = document.querySelector('.buyticket')
var getRowHour = document.querySelectorAll('.row-hour ul li')
var getRowDate = document.querySelectorAll('.row-date')
var getRow = document.querySelectorAll('.cinema-item')
var tenphim = document.getElementById('tenphim').innerText
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
button_checkout.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // 
var getLocal = new Date()
var getCurDay = getLocal.getDate()
var getCurMonth = getLocal.getMonth() + 1
var getCurHour = getLocal.getHours()
var getCurMin = getLocal.getMinutes()

for (var i = 0; i < 4; i++) {
    var temp_h_m = getRowHour[i].innerText

    var getIndexofColons = temp_h_m.indexOf(":")
    var getHour = temp_h_m.slice(0, getIndexofColons)
    var getMin = temp_h_m.slice(getIndexofColons + 1, -1)

    //

    //
    if (parseInt(getHour) < getCurHour) {
        getRowHour[i].classList.toggle('disable-time')
    } else if (parseInt(getHour) === getCurHour) {
        if (getMin < getCurMin) {
            getRowHour[i].classList.toggle('disable-time')
        }

    }

}
tenphim = tenphim.toLowerCase()
for (var i = 0; i < getRowHour.length; i++) {
    getRowHour[i].addEventListener('click', e => {
        var getSeatHour = e.target.innerText
        var getDate = e.target.value
        var getCurURL = window.location.href
            // trên host slice sẽ khác 
        if (getCurURL.slice(38, 40) === 'vi') { window.location.href = '/vi/movies/booking-form/' + tenphim + '?xc=' + getSeatHour + '&nc=' + getDate } else {
            window.location.href = '/en/movies/booking-form/' + tenphim + '?xc=' + getSeatHour + '&nc=' + getDate
        }
    })
}