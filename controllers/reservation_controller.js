const reservation_model = require('../models/reservation_model');
const service_model = require('../models/service_model');

const reservation_data = (req) => {
    let data = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        service_name: req.body.service_name.findByIdAndUpdate

    };
    return data;
};

// Create
const post_reservation = (req, res, next) => {
    console.log('post_reservation');
    let data = reservation_data(req);

    let new_reservation = reservation_model(data);

    new_reservation.save().then(() => {
        console.log(new_reservation);
        res.send(JSON.stringify(new_reservation));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    }); 
};

//Read
const get_reservations = (req, res, next) => {
    console.log('get_reservations');

    reservation_model.find({})
        .lean()
        .then(reservation  => {
            res.send(JSON.stringify(reservation));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};
//Read by id 
const get_reservation = (req, res, next) => {
    let id = req.params.id;

    reservation_model.findById(id)
    
        .lean()
        .then(reservation  => {
        res.send(JSON.stringify(reservation));
        res.send();
        
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// Update
const put_reservation = (req, res, next) => {
    console.log('put_reservation');
    let id = req.params.id;
    let data = reservation_data(req);

    reservation_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((reservation) => {
        res.send(reservation);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


//Delete

const delete_reservation = (req, res, next) => {
    let id = req.params.id;

    reservation_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

module.exports.post_reservation = post_reservation;
module.exports.get_reservations = get_reservations;
module.exports.get_reservation = get_reservation;
//modul.exports.put_reservation = put_reservation;
//module.exports.delete_reservation = delete_reservation;