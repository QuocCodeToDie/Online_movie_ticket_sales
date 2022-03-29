"use strict";

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

function outPut() {
  var soLuong = document.getElementById('result').value; // var soLuong_Don = document.getElementById('form-result1').value
  // var soLuong_Doi = document.getElementById('form-result2').value

  var tongTien = document.getElementById('result2').value;
  var temp_Object = {}; // temp_Object = { id: {}, slDon: soLuong_Don, slDoi: soLuong_Doi, tong: tongTien }

  var url = "booking-seat.html?sl=" + encodeURIComponent(soLuong) + "&tng=" + encodeURIComponent(tongTien);
  window.location.href = url;
} // function myFunction() {
//     var getSoLuong = document.getElementById('result').value
//     if (getSoLuong == 0) {
//         document.getElementById("theButton").disabled = true
//     }
// }
// myFunction()