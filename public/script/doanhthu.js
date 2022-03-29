const URL = "http://localhost:8080/admin/doanhthu"
var getdoanhthu = document.getElementById('doanhthu')
var sove = document.getElementById('sove')
var nguoimua = document.getElementById('nguoimua')

function onResponse(response) {
    return response.text();

}

function onJsonReady(data) {


    var temp
    temp = JSON.parse(data)
    console.log(temp)

    // temp = JSON.stringify(temp);
    var guest_email = []
    var ten_phim = []
    var tong_so_luong = []
    var so_luong_don = []
    var so_luong_doi = []
    var tong_so_tien = []
    for (var i = 0; i < temp.length; i++) {
        guest_email[i] = temp[i].guest_email
        ten_phim[i] = temp[i].ten_phim
        so_luong_don[i] = temp[i].so_luong_don
        so_luong_doi[i] = temp[i].so_luong_doi
        tong_so_luong[i] = temp[i].tong_so_luong
        tong_so_tien[i] = temp[i].tong_so_tien
    }

    console.log(temp.lenght)
    console.log(temp[0]['guest_email'])
    console.log(typeof(guest_email))
    console.log(typeof(temp[0]['guest_email']))
    console.log(guest_email)
    console.log(tong_so_luong)
    console.log(tong_so_tien)
    var result_so_luong = 0
    var result_so_tien = 0
    for (var j = 0; j < temp.length; j++) {
        result_so_luong += tong_so_luong[j]
        result_so_tien += tong_so_tien[j]
    }
    // console.log(result_so_luong)
    // console.log(result_so_tien)
    for (var j = 0; j < temp.length; j++) {
        var para = document.createElement("P");

        // para.style.display = "inline"
        para.innerHTML = guest_email[j]
        nguoimua.appendChild(para)



    }

    var para1 = document.createElement("P");
    var para2 = document.createElement("P");
    para1.innerHTML = result_so_tien + " VNĐ"
    para2.innerHTML = result_so_luong + " vé"
    getdoanhthu.appendChild(para1)
    sove.appendChild(para2)
}


fetch(URL, { method: 'POST' })
    .then(onResponse)
    .then(onJsonReady);