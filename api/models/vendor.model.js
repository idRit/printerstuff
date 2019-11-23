const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    vendorName: String,
    ratePerPageLow: Number,
    ratePerPageHigh: Number
}, {
    timestamps: true    
});

module.exports = mongoose.model('vendor', schema);