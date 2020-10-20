const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    service_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        req: true
    },
    customer_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        req: true
    },
    
});

module.exports = mongoose.model("reservation", schema);