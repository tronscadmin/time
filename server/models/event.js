const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    block_number: Number,
    block_timestamp: Number,
    caller_contract_address: String,
    contract_address: String,
    event_index: Number,
    event_name: String,
    result: mongoose.Schema.Types.Mixed,
    result_type: mongoose.Schema.Types.Mixed,
    transaction_id: {type: String, unique: true}
}, {timestamps: true});

module.exports = mongoose.model('Event', EventSchema);