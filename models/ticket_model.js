var mongoose = require("mongoose")
var ticketSchema = new mongoose.Schema({
    _id: String,
    guest_email: String,
    ten_phim: String,
    so_luong_don: Number,
    so_luong_doi: Number,
    tong_so_luong: Number,
    tong_so_tien: Number
})
module.exports = mongoose.model("ticket", ticketSchema)