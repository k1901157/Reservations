const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    service_name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
});

module.exports = mongoose.model("service", schema);