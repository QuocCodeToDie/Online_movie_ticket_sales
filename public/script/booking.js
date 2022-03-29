var tenphim = document.getElementById('ticket-movie-name').innerText.toLowerCase()
var getXuatChieu = document.getElementById('xuatchieu').getAttribute('data')
var getlang = document.getElementById('get-lang').textContent.trim()
var getDate = document.getElementById('ticket-movie-date')
var getDate_1 = document.getElementById('getDate_1')

var getCurURL = window.location.href
var url = new URL(getCurURL)
var search_params = url.searchParams
var nc = search_params.get('nc')
var getcd = document.getElementById('countdown')
getDate.innerHTML = nc + '/09/2020'
getDate_1.innerHTML = 'Date: ' + nc + '/09/2020'



const getAllSeats_Single = document.querySelectorAll('.row .seat')
const getAllSeats_Double = document.querySelectorAll('.row .seat-double')

var URL = 'http://' + location.hostname + ':8080/' + getlang + '/movies/booking-seat/' + tenphim

function onResponse(response) {
    return response.text();

}

function onJsonReady(data) {


    var temp
    temp = JSON.parse(data)
    console.log(temp)

    var get_movie_seats_single = temp[tenphim][getXuatChieu]["single"]
    console.log(get_movie_seats_single)
    var get_movie_seats_double = temp[tenphim][getXuatChieu]["double"]
    for (var i = 0; i < getAllSeats_Single.length; i++) {
        if (get_movie_seats_single[i] === 1) {
            getAllSeats_Single[i].classList.toggle('occupied')
        }

    }
    for (var i = 0; i < getAllSeats_Double.length; i++) {
        if (get_movie_seats_double[i] === 1) {
            getAllSeats_Double[i].classList.toggle('occupied')
        }

    }





}
fetch(URL, { method: 'POST' })
    .then(onResponse)
    .then(onJsonReady);





const containerbooking = document.querySelector('.containerbooking');
const checkout = document.querySelector('.check-out-form');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const getdoubleseats = document.querySelectorAll('.row .seat-double:not(.occupied)');
const button_checkout = document.querySelector('.checkout')

const getNumberOfSingle = parseInt(document.getElementById('vedon').textContent)
const getNumberOfDouble = parseInt(document.getElementById('vedoi').textContent)
const getNumberOfTickets = parseInt(document.getElementById('ticket-movie-amount').textContent)
var count = 0
const updateSelectedSeatsCount = () => {
    const selectedSeats = document.querySelectorAll('.row .selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

};
const updateSelectedSeatsDoubleCount = () => {
    const selectedSeats = document.querySelectorAll('.row .selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

};




containerbooking.addEventListener('click', e => {

    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        if (document.querySelectorAll('.row .seat.selected').length < getNumberOfSingle) {

            e.target.classList.toggle('selected');

            updateSelectedSeatsCount();
        }
        if (document.querySelectorAll('.row .seat.selected').length === getNumberOfSingle) {

            const selectedSeats = document.querySelectorAll('.row .seat.selected');
            selectedSeats[getNumberOfSingle - 1].classList.remove('selected')
            e.target.classList.toggle('selected')
            updateSelectedSeatsCount();
        }
    }
    //DOUBLE SEATS:

    if (
        e.target.classList.contains('seat-double') &&
        !e.target.classList.contains('occupied')
    ) {
        if (document.querySelectorAll('.row .seat-double.selected').length < getNumberOfDouble) {

            e.target.classList.toggle('selected');

            updateSelectedSeatsDoubleCount();
        }
        if (document.querySelectorAll('.row .seat-double.selected').length === getNumberOfDouble) {

            const selectedSeatsDouble = document.querySelectorAll('.row .seat-double.selected');
            selectedSeatsDouble[getNumberOfDouble - 1].classList.remove('selected')
            e.target.classList.toggle('selected')
            updateSelectedSeatsDoubleCount();
        }
    }
    /////////////////





});

// ******************************Check Out section**********************************


var getSeat = document.querySelector('.getSeat')
var getDouble = document.querySelector('.getdoubleSeat')
var getfinalSubmit = document.getElementById('submit-final')
button_checkout.addEventListener('click', function() {

    const seat_number = document.querySelector('.seat-number')

    var getFinalSelectedSeat = document.querySelectorAll('.row .seat.selected')

    var getNumberofSeat = []
    if (getNumberOfSingle !== 0) {
        if (getFinalSelectedSeat.length === 0) {
            alert('You have not choosen any single seat.')
        } else if (getFinalSelectedSeat.length !== 0 && getFinalSelectedSeat.length < getNumberOfSingle) {
            var temp = getNumberOfSingle - getFinalSelectedSeat.length
            alert('You need to choose' + temp + " tickets remaining")
        } else {
            for (var i = 0; i < getFinalSelectedSeat.length; i++) {
                getNumberofSeat[i] = getFinalSelectedSeat[i].innerText

            }

            for (var i = 0; i < getNumberofSeat.length; i++) {
                var para = document.createElement("P");
                para.style.display = "inline"
                para.classList.add('seat-item')
                para.innerHTML = getNumberofSeat[i] + " "



                getSeat.appendChild(para)
            }
        }
    }
    var getFinalSelectedDoubleSeat = document.querySelectorAll('.row .seat-double.selected')
    var getNumberofDoubleSeat = []
    if (getNumberOfDouble !== 0) {
        if (getFinalSelectedDoubleSeat.length === 0) {
            alert('You have not choosen any double seat.')
        } else if (getFinalSelectedDoubleSeat.length !== 0 && getFinalSelectedDoubleSeat.length < getNumberOfDouble) {
            var temp = getNumberOfDouble - getFinalSelectedSeat.length
            alert('You need to choose' + temp + " tickets remaining")
        } else {
            for (var i = 0; i < getFinalSelectedDoubleSeat.length; i++) {
                getNumberofDoubleSeat[i] = getFinalSelectedDoubleSeat[i].innerText

            }

            for (var i = 0; i < getNumberofDoubleSeat.length; i++) {
                var para = document.createElement("P");
                para.style.display = "inline"
                para.classList.add('seat-item')
                para.innerHTML = getNumberofDoubleSeat[i] + " "



                getDouble.appendChild(para)
            }
        }
    }
    //20 9 2020


    /////////////////






    // 21 9 2020


    var getFinalSeat_Info = document.querySelectorAll('.getSeat .seat-item')
    var getFinalSeat_Info_2 = []
    for (var i = 0; i < getFinalSeat_Info.length; i++) {
        getFinalSeat_Info_2[i] = getFinalSeat_Info[i].innerText.trim()
    }
    var temp_index = []
    for (var i = 0; i < getFinalSeat_Info_2.length; i++) {
        for (var j = 0; j < seats.length; j++) {
            if (getFinalSeat_Info_2[i] === seats[j].innerText) {
                temp_index[i] = j
            }
        }
    }
    //Double

    var getFinalDoubleSeat_Info = document.querySelectorAll('.getdoubleSeat .seat-item')
    var getFinalDoubleSeat_Info_2 = []
    for (var i = 0; i < getFinalDoubleSeat_Info.length; i++) {
        getFinalDoubleSeat_Info_2[i] = getFinalDoubleSeat_Info[i].innerText.trim()
    }
    console.log(getFinalDoubleSeat_Info_2)
    var temp_index_2 = []
    for (var i = 0; i < getFinalDoubleSeat_Info_2.length; i++) {
        for (var j = 0; j < getdoubleseats.length; j++) {
            if (getFinalDoubleSeat_Info_2[i] === getdoubleseats[j].innerText) {
                temp_index_2[i] = j
            }
        }
    }
    console.log(temp_index)
    console.log(temp_index_2)

    //
    getfinalSubmit.addEventListener('click', () => {
        var temp_data = []
        var temp_data_2 = []
        for (var i = 0; i < temp_index.length; i++) {

            temp_data[i] = temp_index[i]
        }
        for (var j = 0; j < temp_index.length; j++) {

            temp_data_2[j] = temp_index_2[j]
        }

        fetch(location.origin + '/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tenphim: tenphim, soghedon: temp_data, soghedoi: temp_data_2, xuatchieu: getXuatChieu })
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                console.log(data);
            });


        var counter = 5;
        var interval = setInterval(function() {
            counter--;
            getcd.innerHTML = counter
                // Display 'counter' wherever you want to display it.
            if (counter == 0) {
                // Display a login box
                clearInterval(interval);
            }
        }, 1000);
        setTimeout(function() {
            if (getlang === "vi") { window.location.href = '/' } else {
                window.location.href = '/en'
            }
        }, 5000);


    })


})

var modal = document.getElementById("myModal1");

var span = document.getElementsByClassName("close")[0];
button_checkout.onclick = function() {
    var getFinalSelectedSeat = document.querySelectorAll('.row .selected')
    if (getFinalSelectedSeat.length === getNumberOfTickets) {
        modal.style.display = "block";
    }


}
span.onclick = function() {
    modal.style.display = "none";
    getSeat.innerHTML = ''
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        getSeat.innerHTML = ''
    }
}