var mongoose = require("mongoose")
var movieSchema = new mongoose.Schema({
    ten_phim: String,
    the_loai: String,
    status: String,
    mieu_ta: String,
    poster: String,
    trailer: String,
    thoiluong: String,
    film_item: String

})

module.exports = mongoose.model("movie", movieSchema)