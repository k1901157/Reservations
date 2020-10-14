const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer_name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    customer_phone: {
        type: String,
        required: true,
    },
    customer_email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("customer", schema);