const reservation_model = require('../models/reservation_model');

//all data that we need to post the reservations details.
const reservation_data = (req) => {
    let data = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        service_details: req.body.service_details,
        customer_details: req.body.customer_details,

    };
    return data;
};

//Create
//adding the reservations to Database.
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
        console.log('Please check your entries and try again!');
    }); 
};

//Read
//get all reservations from Database.
const get_reservations = (req, res, next) => {
    console.log('get_reservations');

    reservation_model.find({})
        .lean()
        .populate('service_details')
        .populate('customer_details')
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
        .populate('service_details')
        .populate('customer_details')
        .then(reservation  => {
        res.send(JSON.stringify(reservation));
        res.send();
        
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check the reservation id!');
    });
};

//Update
//to edit the reservations details then post them again to Database using the reservation id.
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
        console.log('Please check your entries and try again!');
    });

};


//Delete
//to delete the reservation by using the id.
const delete_reservation = (req, res, next) => {
    let id = req.params.id;

    reservation_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check the reservation id!');
    });
};

//patch
//trying to solve the problem with path, but still not working as expected.
const patch_reservation = (req,res,next) => {
    let id = req.params.id;
    let data = reservation_data(req);

    reservation_model.findByIdAndUpdate({_id: id, data}, {data}, {
        // new: true
    })
    .exec()
    .then((reservation) => {
        res.send(reservation);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check your entries and try again!');
    });
}

module.exports.post_reservation = post_reservation;
module.exports.get_reservations = get_reservations;
module.exports.get_reservation = get_reservation;
module.exports.put_reservation = put_reservation;
module.exports.delete_reservation = delete_reservation;
module.exports.patch_reservation = patch_reservation;