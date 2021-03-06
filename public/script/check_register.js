function validateForm() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var x = document.forms["myForm"]['name'].value;
    var y = document.forms["myForm"]['lastname'].value;
    var email = document.forms["myForm"]['email'].value;
    var password = document.forms["myForm"]['password'].value;
    var getDay = document.forms["myForm"]['day'].value;
    var getMonth = document.forms["myForm"]['month'].value;
    var getYear = document.forms["myForm"]['year'].value;
    var getGioiTinh = document.forms["myForm"]['sex'].value;
    var getLang = document.documentElement.lang
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    if (getLang === "en") {
        if (x === '') {
            alert('First Name must be filled out')
            return false
        }

        if (y === '') {
            alert('Last Name must be filled out')
            return false
        }
        if (re.test(email) === false) {
            alert('Your email has invalid type, i.e abc@gmail.com is valid')
            return false
        }
        if (password.length < 9) {
            alert('Your password is too short. Password must be 10 or more characters')
            return false
        }
        if (getDay === 'Day') {
            alert('You have not filled Day')
            return false
        }
        if (getMonth === 'Month') {
            alert('You have not filled Month')
            return false
        }
        if (getYear === 'Year') {
            alert('You have not filled Year')
            return false
        }
        if (parseInt(getMonth) !== NaN && parseInt(getMonth) === mm) {
            if (parseInt(getDay) !== NaN && parseInt(getDay) >= dd) {
                alert('Births day cannot equal or lagger than current day')
                return false
            }
        } else if (parseInt(getMonth) !== NaN && parseInt(getMonth) > mm) {
            alert('Births month cannot  lagger than current day')
            return false
        }
        if (getGioiTinh === '') {
            alert('You have not choosen your gender')
            return false
        }
    } else {
        if (x === '') {
            alert('B???n ch??a ??i???n v??o t??n')
            return false
        }

        if (y === '') {
            alert('B???n ch??a ??i???n v??o h??? t??n')
            return false
        }
        if (re.test(email) === false) {
            alert('Email c???a b???n c?? ?????nh d???ng kh??ng ????ng  v?? d???: abc@gmail.com l?? h???p l???')
            return false
        }
        if (password.length < 9) {
            alert('M???t kh???u c???a b???n qu?? ng???n. M???t kh???u c?? ph???i c?? k?? t??? t??? 10 tr??? l??n')
            return false
        }
        if (getDay === 'Ng??y') {
            alert('B???n ch??a ??i???n v??o ng??y sinh')
            return false
        }


        if (getMonth === 'Th??ng') {
            alert('B???n ch??a ??i???n v??o th??ng sinh')
            return false
        }
        if (getYear === 'N??m') {
            alert('B???n ch??a ??i???n v??o n??m sinh')
            return false
        }
        if (parseInt(getMonth) !== NaN && parseInt(getMonth) === mm) {
            if (parseInt(getDay) !== NaN && parseInt(getDay) >= dd) {
                alert('Ng??y sinh kh??ng th??? l???n h??n ho???c b???ng ng??y hi???n t???i')
                return false
            }
        } else if (parseInt(getMonth) !== NaN && parseInt(getMonth) > mm) {
            alert('Th??ng sinh kh??ng th??? l???n h??n th??ng hi???n t???i')
            return false
        }
        if (getGioiTinh === '') {
            alert('B???n ch??a ??i???n v??o gi???i t??nh')
            return false
        }
    }

}