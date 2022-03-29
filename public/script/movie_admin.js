const URL = "http://localhost:8080/admin/movies"
var getCurrent = document.getElementById('currentmovie')
var getUpcoming = document.getElementById('upcoming')

function onResponse(response) {
    return response.text();

}

function onJsonReady(data) {


    var temp
    temp = JSON.parse(data)
    console.log(temp)

    var ten_phim = []
    var the_loai = []
    var status = []
    var mieu_ta = []
    var poster = []
    var trailer = []
    var thoiluong = []
    var film_item = []

    for (var i = 0; i < temp.length; i++) {
        the_loai[i] = temp[i]['the_loai']
        ten_phim[i] = temp[i]['ten_phim']
        status[i] = temp[i]['status']
        mieu_ta = ['mieu_ta']
        poster = ['poster']
        trailer = ['trailer']
        thoiluong = ['thoiluong']
        film_item = ['film_item']

    }
    // console.log(temp[8]['status'])

    for (var j = 0; j < ten_phim.length; j++) {

        var para = document.createElement("P");
        // para.style.display = "inline"
        para.classList.add('trigger_popup_fricc')
        para.innerHTML = ten_phim[j].toUpperCase() + "<input class='inputphim' value='" + ten_phim[j].toUpperCase() + "' type='checkbox'>"

        if (temp[j]['status'] === 'ongoing') {
            getCurrent.appendChild(para)
        } else if (temp[j]['status'] === 'upcoming') {
            getUpcoming.appendChild(para)
        }
    }

    ///xóa phim
    var getinputphim = document.querySelectorAll('.inputphim')
    var getbttxoa = document.getElementById('xoaphim')

    getbttxoa.onclick = () => {
        var result = []
        for (var i = 0; i < getinputphim.length; i++) {
            if (getinputphim[i].checked === true) {
                result[i] = getinputphim[i].value
            }
        }
        console.log(result)
        fetch(location.origin + '/admin/movies/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tenphim: result })
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                console.log(data);
                window.location.href = '/admin/movies/delete'
            });

    }




    // var getMovies = document.querySelectorAll('#currentmovie .cur-item')
    // for (var i = 0; i < getMovies.length; i++) {
    //     getMovies[i].onclick = (e) => {



    //     }
    // }




}


fetch(URL, { method: 'POST' })
    .then(onResponse)
    .then(onJsonReady);