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
            alert('Bạn chưa điền vào tên')
            return false
        }

        if (y === '') {
            alert('Bạn chưa điền vào họ tên')
            return false
        }
        if (re.test(email) === false) {
            alert('Email của bạn có định dạng không đúng  ví dụ: abc@gmail.com là hợp lệ')
            return false
        }
        if (password.length < 9) {
            alert('Mật khẩu của bạn quá ngắn. Mật khẩu có phải có ký tự từ 10 trở lên')
            return false
        }
        if (getDay === 'Ngày') {
            alert('Bạn chưa điền vào ngày sinh')
            return false
        }


        if (getMonth === 'Tháng') {
            alert('Bạn chưa điền vào tháng sinh')
            return false
        }
        if (getYear === 'Năm') {
            alert('Bạn chưa điền vào năm sinh')
            return false
        }
        if (parseInt(getMonth) !== NaN && parseInt(getMonth) === mm) {
            if (parseInt(getDay) !== NaN && parseInt(getDay) >= dd) {
                alert('Ngày sinh không thể lớn hơn hoặc bằng ngày hiện tại')
                return false
            }
        } else if (parseInt(getMonth) !== NaN && parseInt(getMonth) > mm) {
            alert('Tháng sinh không thể lớn hơn tháng hiện tại')
            return false
        }
        if (getGioiTinh === '') {
            alert('Bạn chưa điền vào giới tính')
            return false
        }
    }

}