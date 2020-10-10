const mongoose = require('mongoose');
const service_model = require('./service_model')
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
    service_name: {
       // type: mongoose.Schema.Types.ObjectId,
       // ref: "service_model",
       // req: true
        type: Number,
        references: {
            model: service_model,
            key: 'id',
        },
    }
    
});

module.exports = mongoose.model("reservation", schema);