const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
    day: Number,
    payoutTotal: Number,
    stakeSharesTotal: Number,
    totalDividends: Number,
}, {timestamps: true});

module.exports = mongoose.model('Day', DaySchema);