var getcururl = window.location.href

var tenphim = getcururl.slice(22, getcururl.length)
var URL = 'http://' + location.hostname + ':8080/' + tenphim

function onResponse(response) {
    return response.text();

}

function onJsonReady(data) {


    console.log(data)





}
fetch('URL', { method: 'POST' })
    .then(onResponse)
    .then(onJsonReady);