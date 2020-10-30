const mongoose = require('mongoose');

const DataPointSchema = new mongoose.Schema({
    day: Number,
    datapoint: Number,
}, {timestamps: true});

module.exports = mongoose.model('datapoints', DataPointSchema);