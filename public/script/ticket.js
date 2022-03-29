function plus1() {
    var ticket1 = parseInt(document.getElementById('form-1').value);
    document.getElementById('form-1').value = ticket1 + 1;
    ticket1 = ticket1 + 1;
    document.getElementById('form-result1').value = ticket1 * 49000;
    var temp = document.getElementById('result').value;
    document.getElementById('result').value = parseInt(temp) + 1;
    temp = document.getElementById('result2').value;
    document.getElementById('result2').value = parseInt(temp) + 49000;
}

function plus2() {
    var ticket2 = parseInt(document.getElementById('form-2').value);
    document.getElementById('form-2').value = ticket2 + 1;
    ticket2 = ticket2 + 1;
    document.getElementById('form-result2').value = ticket2 * 108000;
    var temp = document.getElementById('result').value;
    document.getElementById('result').value = parseInt(temp) + 1;
    temp = document.getElementById('result2').value;
    document.getElementById('result2').value = parseInt(temp) + 108000;
}

function minus1() {
    var ticket1 = parseInt(document.getElementById('form-1').value);
    if (ticket1 != 0) {
        document.getElementById('form-1').value = ticket1 - 1;
        ticket1 = ticket1 - 1;
        document.getElementById('form-result1').value = ticket1 * 49000;
        var temp = document.getElementById('result').value;
        document.getElementById('result').value = parseInt(temp) - 1;
        temp = document.getElementById('result2').value;
        document.getElementById('result2').value = parseInt(temp) - 49000;
    }
}

function minus2() {
    var ticket2 = parseInt(document.getElementById('form-2').value);
    if (ticket2 != 0) {
        document.getElementById('form-2').value = ticket2 - 1;
        ticket2 = ticket2 - 1;
        document.getElementById('form-result2').value = ticket2 * 49000;
        var temp = document.getElementById('result').value;
        document.getElementById('result').value = parseInt(temp) - 1;
        temp = document.getElementById('result2').value;
        document.getElementById('result2').value = parseInt(temp) - 108000;
    }
}

var getShowTime = document.getElementById('ticket-movie-showtime')
var getDate = document.getElementById('ticket-movie-date')
var getCurURL = window.location.href
var url = new URL(getCurURL)
var search_params = url.searchParams
var xc = search_params.get('xc')
var nc = search_params.get('nc')
getShowTime.innerHTML = xc
getDate.innerHTML = nc + '/09/2020'




//////////////////////// Book ticket /////////////////


// function abcde() {
//     const seats = document.querySelectorAll('.row  .single .double .single:not(.occupied)');
//     const populateUI = () => {
//         const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

//         if (selectedSeats !== null && selectedSeats.length > 0) {
//             seats.forEach((seat, index) => {
//                 if (selectedSeats.indexOf(index) > -1) {
//                     seat.classList.add('selected');
//                 }
//             });
//         }
//     }
//     populateUI();

//     const updateSelectedSeatsCount = () => {
//         const selectedSeats = document.querySelectorAll('.row .selected');

//         const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

//         localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

//         const selectedSeatsCount = selectedSeats.length;

//         // count.innerText = selectedSeatsCount;
//         // price.innerText = selectedSeatsCount * ticketPrice;
//     };
//     container.addEventListener('click', e => {
//         if (
//             e.target.classList.contains('seat') &&
//             !e.target.classList.contains('occupied')
//         ) {
//             e.target.classList.toggle('selected');

//             updateSelectedSeatsCount();
//         }
//     });
// }