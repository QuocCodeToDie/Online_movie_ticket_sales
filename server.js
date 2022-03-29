if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const url = require('url');
var fs = require('fs')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
let jsonFile = require('jsonfile');
//////// Test DB
const connectionString = 'mongodb+srv://admin:35062496@cluster0.ltkbp.mongodb.net/rap_phim_db_test_4?retryWrites=true&w=majority'
var mongoose = require("mongoose")
    //const uri_mongodb = "mongodb+srv://admin:35062496@cluster0.ltkbp.mongodb.net/rap_phim_db_test_4?retryWrites=true&w=majority"
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    // mongoose.connect("mongodb+srv://admin:35062496@cluster0.ltkbp.mongodb.net/rap_phim_db_test_4?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
var Rap = require('./models/rap_model');
var Ticket = require('./models/ticket_model')
var Movie = require('./models/movie_model')
initializePassport(passport,
    email => users.find(user => user.email === email),
    _id => users.find(user => user._id === _id)



)



///

const users = []
const ticket_info = []
var seat_info = []
    ///********************Users Routers***************************************** */
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(express.json({ limit: '1mb' }))

app.get('/', (req, res) => {

    var flag

    var temp
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    today = dd + '/' + mm
    var tmr = parseInt(dd) + 1 + '/' + mm

    if (req.isAuthenticated() === true) {


        res.render('vi/index.ejs', { flag: 'display: none; ', flag2: 'display: block', today: today, mai: tmr })


    } else {
        res.render('vi/index.ejs', { flag: 'display: block; ', flag2: 'display: none', today: today, mai: tmr })

    }




})
app.get('/en', (req, res) => {

    var flag

    var temp
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    today = dd + '/' + mm
    var tmr = parseInt(dd) + 1 + '/' + mm

    if (req.isAuthenticated() === true) {


        res.render('en/index.ejs', { flag: 'display: none; ', flag2: 'display: block', today: today, mai: tmr })


    } else {
        res.render('en/index.ejs', { flag: 'display: block; ', flag2: 'display: none', today: today, mai: tmr })

    }




})
app.post('/', (req, res) => {
    if (req.isAuthenticated() === true) {

        var tenphim = req.body.phim
        var showtime = req.body.screenings
        var getDate = req.body.date
        var indexofSlash = getDate.indexOf('/')
        var getDay = getDate.slice(0, indexofSlash)
        res.redirect('/vi/movies/booking-form/' + tenphim + "?xc=" + showtime + "&nc=" + getDay)


    } else {
        res.redirect('/login')

    }

})
app.post('/en', (req, res) => {
    if (req.isAuthenticated() === true) {

        var tenphim = req.body.phim
        var showtime = req.body.screenings
        var getDate = req.body.date
        var indexofSlash = getDate.indexOf('/')
        var getDay = getDate.slice(0, indexofSlash)
        res.redirect('/en/movies/booking-form/' + tenphim + "?xc=" + showtime + "&nc=" + getDay)


    } else {
        res.redirect('/en/login')

    }

})

// app.get('/admin', checkAdminAuthenticated, (req, res) => {
//     res.render('admin/admin.ejs')
// })

// 
var temp_URL
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('vi/login.ejs')
    temp_URL = req.headers.referer


})

app.post('/login', checkNotAuthenticated, (req, res, next) => {

    if (temp_URL !== undefined) {
        var link = temp_URL.slice(21, temp_URL.lenght)
    } else {
        var link = '/'
    }


    passport.authenticate('local', {

        successRedirect: link,
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})
var temp_URL_EN
app.get('/en/login', checkNotAuthenticated, (req, res) => {
    res.render('en/login.ejs')
    temp_URL_EN = req.headers.referer


})

app.post('/en/login', checkNotAuthenticated, (req, res, next) => {

    if (temp_URL_EN !== undefined) {
        var link = temp_URL_EN.slice(37, temp_URL_EN.lenght)
    } else {
        var link = '/en'
    }


    passport.authenticate('local', {

        successRedirect: link,
        failureRedirect: '/en/login',
        failureFlash: true
    })(req, res, next)
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('vi/register.ejs')
})
app.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)


        Rap.create({
            id: Date.now().toString(),
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            is_Admin: false
        }, function(err, rap) {
            if (err) { console.log(err) } else {
                console.log(rap)
            }
        })


        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }


})
app.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.get('/en/register', checkNotAuthenticated, (req, res) => {
    res.render('en/register.ejs')
})
app.post('/en/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)


        Rap.create({
            id: Date.now().toString(),
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            is_Admin: false
        }, function(err, rap) {
            if (err) { console.log(err) } else {
                console.log(rap)
            }
        })


        res.redirect('/en/login')
    } catch {
        res.redirect('/en/register')
    }


})
app.post('/en/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/en/login')
    } catch {
        res.redirect('/en/register')
    }
})

app.get('/en/chatbot', (req, res) => {
    res.render('en/chatbot.ejs')
})
app.get('/vi/chatbot', (req, res) => {
    res.render('vi/chatbot.ejs')
})
app.get('/en/page', (req, res) => {
    res.render('en/page.ejs')
})
app.get('/vi/page', (req, res) => {
    res.render('vi/page.ejs')
})
app.get('/en/movies', (req, res) => {
    res.render('en/movies.ejs')
})

// app.post('/en/movies', checkAuthenticated, async(req, res) => {
//     movies_info.push[{
//         movie_name: req.body.ten_phim
//     }]
// })
app.get('/vi/movies', (req, res) => {


        res.render('vi/movies.ejs')
    })
    //
    //single movies:
    //#1

app.get('/en/movies/:ten_phim', (req, res) => {

    var tenphim = req.params.ten_phim
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    today = dd + '/' + mm
    var tmr = parseInt(dd) + 1 + '/' + mm
    Movie.findOne({ ten_phim: tenphim }, function(err, tick) {
        if (err) { console.log("Loi " + err) }
        if (tick['status'] === 'ongoing') {
            res.render('en/' + tenphim + '.ejs', { date: today, mai: tmr, flag: 'display: inline; ' })
        } else {
            res.render('en/' + tenphim + '.ejs', { date: today, mai: tmr, flag: 'display: none; ' })
        }

    })





})

app.get('/vi/movies/:ten_phim', (req, res) => {
    var tenphim = req.params.ten_phim
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    today = dd + '/' + mm
    var tmr = parseInt(dd) + 1 + '/' + mm
    Movie.findOne({ ten_phim: tenphim }, function(err, tick) {
        if (err) { console.log("Loi " + err) }
        if (tick['status'] === 'ongoing') {
            res.render('vi/' + tenphim + '.ejs', { date: today, mai: tmr, flag: 'display: inline; ' })
        } else {
            res.render('vi/' + tenphim + '.ejs', { date: today, mai: tmr, flag: 'display: none; ' })
        }

    })

})







////////
var getTempQuery
app.get('/vi/movies/booking-form/:ten_phim', checkAuthenticated, (req, res) => {
    var tenphim = req.params.ten_phim
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    getTempQuery = req.query
    today = dd + '/' + mm + '/' + yyyy;
    res.render('vi/booking-form.ejs', { temp: tenphim })

})
app.post('/vi/movies/booking-form/:ten_phim', checkAuthenticated, async(req, res) => {
    var tenphim = req.params.ten_phim






    var count_temp
    await Ticket.countDocuments({ _id: req.user._id }, function(err, c) {
        count_temp = c

    })

    if (count_temp === 0) {
        Ticket.create({
            _id: req.user._id,
            guest_email: req.user.email,
            ten_phim: tenphim,
            so_luong_don: req.body.slgheDon,
            so_luong_doi: req.body.slgheDoi,
            tong_so_luong: req.body.soLuong,
            tong_so_tien: req.body.tongTien
        }, function(err, ticket) {
            if (err) { console.log(err) } else {
                console.log(ticket)
            }
        })
    } else {

        Ticket.update({ _id: req.user._id }, {
                $set: {
                    ten_phim: tenphim,

                    so_luong_don: req.body.slgheDon,
                    so_luong_doi: req.body.slgheDoi,
                    tong_so_luong: req.body.soLuong,
                    tong_so_tien: req.body.tongTien
                }
            },
            function(err, update) {
                if (err) { console.log(err) } else {
                    console.log(update)
                }
            })

    }
    res.redirect('/vi/movies/booking-seat/' + tenphim + "?xc=" + getTempQuery.xc + "&nc=" + getTempQuery.nc)


})
var getTempQuery_EN

app.get('/en/movies/booking-form/:ten_phim', checkAuthenticated, (req, res) => {
    var tenphim = req.params.ten_phim
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    getTempQuery_EN = req.query
    console.log(req.query)
    today = dd + '/' + mm + '/' + yyyy;

    res.render('en/booking-form.ejs', { temp: tenphim })


})
app.post('/en/movies/booking-form/:ten_phim', checkAuthenticated, async(req, res) => {
    var tenphim = req.params.ten_phim
        // URL
        // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    // var fullUrl = location.href
    // console.log(fullUrl)
    // var url = new URL(fullUrl)
    // var search_params = url.searchParams
    // var xc = search_params.get('xc')
    var count_temp

    await Ticket.countDocuments({ _id: req.user._id }, function(err, c) {
        count_temp = c

    })

    if (count_temp === 0) {
        Ticket.create({
            _id: req.user._id,
            guest_email: req.user.email,
            ten_phim: tenphim,
            so_luong_don: req.body.slgheDon,
            so_luong_doi: req.body.slgheDoi,
            tong_so_luong: req.body.soLuong,
            tong_so_tien: req.body.tongTien

        }, function(err, ticket) {
            if (err) { console.log(err) } else {
                console.log(ticket)
            }
        })
    } else {

        Ticket.update({ _id: req.user._id }, {
                $set: {
                    ten_phim: tenphim,

                    so_luong_don: req.body.slgheDon,
                    so_luong_doi: req.body.slgheDoi,
                    tong_so_luong: req.body.soLuong,
                    tong_so_tien: req.body.tongTien
                }
            },
            function(err, update) {
                if (err) { console.log(err) } else {
                    console.log(update)
                }
            })

    }
    res.redirect('/en/movies/booking-seat/' + tenphim + "?xc=" + getTempQuery_EN.xc + "&nc=" + getTempQuery_EN.nc)


})



app.get('/vi/movies/booking-seat/:ten_phim', checkAuthenticated, (req, res) => {
    var tenphim = req.params.ten_phim
    var today = new Date();
    var name = req.user.name
    var last_name = req.user.lastname
    var email = req.user.email
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var getID = req.user._id
    var sl
    var getQuery = req.query.xc
    today = dd + '/' + mm + '/' + yyyy;

    Ticket.findOne({ _id: getID }, function(err, tick) {
        if (err) { console.log("Loi " + err) }
        console.log(tick)
        sl = tick['tong_so_luong']
        var veDon = tick['so_luong_don']
        var veDoi = tick['so_luong_doi']
        var tongSoTien = tick['tong_so_tien'].toLocaleString()
        var getlang = 'vi'
        res.render('vi/booking-seat.ejs', { temp: tenphim, amount: sl, single: veDon, double: veDoi, lang: getlang, name: name, lastname: last_name, email: email, xuat_chieu: getQuery, tongtien: tongSoTien })
    });




})
app.post('/vi/movies/booking-seat/:ten_phim', checkAuthenticated, (req, res) => {
    //var tenphim = req.params.ten_phim

    const fs = require('fs');
    var file_content = fs.readFileSync('temp_seats.json');
    var content = JSON.parse(file_content);

    res.send(content)
        // console.log(content)


})
app.get('/en/movies/booking-seat/:ten_phim', checkAuthenticated, (req, res) => {
        var tenphim = req.params.ten_phim
        var today = new Date();
        var name = req.user.name
        var last_name = req.user.lastname
        var email = req.user.email
        var getQuery = req.query.xc
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var getID = req.user._id
        var sl

        today = dd + '/' + mm + '/' + yyyy;

        Ticket.findOne({ _id: getID }, function(err, tick) {
            if (err) { console.log("Loi " + err) }

            sl = tick['tong_so_luong']
            var veDon = tick['so_luong_don']
            var veDoi = tick['so_luong_doi']
            var tongSoTien = tick['tong_so_tien'].toLocaleString()
            var getlang = 'en'
            res.render('en/booking-seat.ejs', { temp: tenphim, amount: sl, single: veDon, double: veDoi, lang: getlang, name: name, lastname: last_name, email: email, xuat_chieu: getQuery, tongtien: tongSoTien })
        });




    })
    // app.post('/vi/movies/booking-seat/:ten_phim', checkAuthenticated, (req, res) => {
    //     var tenphim = req.params.ten_phim
    //     res.send('abc')
    // })
app.post('/en/movies/booking-seat/:ten_phim', checkAuthenticated, (req, res) => {

    const fs = require('fs');
    var file_content = fs.readFileSync('temp_seats.json');
    var content = JSON.parse(file_content);

    res.send(content)
    console.log(content)
        // })

})
app.post('/post', (req, res) => {
    console.log('Success: ')
    console.log(req.body)
    var getTenPhim = req.body["tenphim"]
    var getSoGheDon = req.body["soghedon"]
    var getSoGheDoi = req.body["soghedoi"]
    var xuatChieu = req.body["xuatchieu"]
    const fs = require('fs');
    var file_content = fs.readFileSync('temp_seats.json');
    var content = JSON.parse(file_content);
    for (var i = 0; i < getSoGheDon.length; i++) {
        if (getSoGheDon[i] !== null) {
            content[getTenPhim][xuatChieu]["single"][getSoGheDon[i]] = 1;
            fs.writeFileSync('temp_seats.json', JSON.stringify(content));
        }
    }
    for (var i = 0; i < getSoGheDoi.length; i++) {
        if (getSoGheDoi[i] !== null) {
            content[getTenPhim][xuatChieu]["double"][getSoGheDoi[i]] = 1;
            fs.writeFileSync('temp_seats.json', JSON.stringify(content));
        }
    }

    // //Serialize as JSON and Write it to a file

    // Movie.update({ movie_name: getTenPhim }, {
    //             $set: {

    //             }
    //         },
    //         function(err, update) {
    //             if (err) { console.log(err) } else {
    //                 console.log(update)
    //             }
    //         })
    // res.json({
    //     status:'success',
    //     data
    // })
})
app.get('/en/up-coming', (req, res) => {
    res.render('en/up-coming.ejs')
})
app.get('/vi/up-coming', (req, res) => {
    res.render('vi/up-coming.ejs')
})

app.delete('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

///******************** Admin Routers***************************************** */
const adminRouter_DB = require('./routers/admin_router')
app.use('/admin/DB', checkAdminAuthenticated, adminRouter_DB)
app.get('/admin', checkAdminAuthenticated, (req, res) => {
    res.render('admin/admin.ejs')
})
app.get('/admin/movies', checkAdminAuthenticated, (req, res) => {
    res.render('admin/addMovies.ejs')
})
app.post('/admin/movies', (req, res) => {
    Movie.find({}, function(err, tick) {
        if (err) { console.log("Loi " + err) }


        res.send(tick)
    });


})

// app.get('/:tenphim', (req, res) => {
//     var tenphim = req.params.tenphim
//     res.render('template.ejs', {})
// })
// app.post('/:tenphim', (req, res) => {
//     Movie.find({}, function(err, tick) {
//         if (err) { console.log("Loi " + err) }


//         res.send(tick)
//     });
// })
app.get('/admin/movies/new', checkAdminAuthenticated, (req, res) => {
    res.render('admin/new.ejs')
})
app.get('/admin/movies/delete', checkAdminAuthenticated, (req, res) => {
    res.render('admin/new.ejs')
})
app.post('/admin/movies/new', (req, res) => {
    if (req.body !== null) {
        var title = req.body.title
        var tenphim = req.body.moviename
        var dodaiphim = req.body.movielenght
        var theloai = []
        theloai = req.body.movietype
        var mieuta = req.body.moviedesc
        var trailer = req.body.movietrailer
        console.log(req.body)
        Movie.create({
            ten_phim: tenphim,
            the_loai: theloai,
            status: 'ongoing'
        }, function(err, rap) {
            if (err) { console.log(err) } else {
                console.log(rap)
            }
        })
        res.redirect('/admin/movies/new')

    } else {

    }

    // console.log(req)
})

app.post('/admin/movies/delete', (req, res) => {
    console.log('Success')
    console.log(req.body.tenphim)
    console.log(req.body.tenphim[0].toLowerCase())
    console.log(typeof(req.body.tenphim[0].toLowerCase()))
        // var tenphim = req.body.tenphim
        // console.log(tenphim[0].toLowerCase())


    Movie.update({ ten_phim: req.body.tenphim[0].toLowerCase() }, {
            $set: {
                status: 'upcoming'
            }
        },
        function(err, update) {
            if (err) { console.log(err) } else {
                console.log(update)
            }
        })



})

app.get('/admin/doanhthu/', checkAdminAuthenticated, (req, res) => {
    res.render('admin/doanhthu.ejs')
})
app.post('/admin/doanhthu', (req, res) => {
    Ticket.find({}, function(err, tick) {
        if (err) { console.log("Loi " + err) }
        console.log(tick)
        res.send(tick)
    });
})










//////
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')

}

function checkAdminAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.is_Admin === true) {
        return next()
    }
    console.log('Bạn không được cấp quyền để vào trang này!!!')
    setTimeout(function() {
        res.redirect('/')
    }, 3000);


}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
app.listen(8080)