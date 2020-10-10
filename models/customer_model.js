const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer_name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
});

module.exports = mongoose.model("customer", schema);