const service_model = require('../models/service_model');

//All Data needed to add Services details to Database.
const service_data = (req) => {
    let data = {
        service_name: req.body.service_name,
        location: req.body.location,

    };
    return data;
};

// Create
//Add Services Details to Database.
const post_service = (req, res, next) => {
    console.log('post_service');
    let data = service_data(req);

    let new_service = service_model(data);

    new_service.save().then(() => {
        console.log(new_service);
        res.send(JSON.stringify(new_service));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check your entries and try again!');
    }); 
};

//Read
//Get all Services Details from Database.
const get_services = (req, res, next) => {
    console.log('get_services');

    service_model.find({})
        .lean()
        .then(service  => {
            res.send(JSON.stringify(service));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};
//Read by id 
const get_service = (req, res, next) => {
    let id = req.params.id;

    service_model.findById(id)
    
        .lean()
        .then(service  => {
        res.send(JSON.stringify(service));
        res.send();
        
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check the id!');
    });
};

//Update
//to update the Services details.
//it is inactive yet, because the purpose so far is just to add the services details and read them.
const put_service = (req, res, next) => {
    console.log('put_service');
    let id = req.params.id;
    let data = service_data(req);

    service_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((service) => {
        res.send(service);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


//Delete
//to delete the services details by using the id.
//it is inactive yet, because the purpose so far is just to add the services details and read them.
const delete_service = (req, res, next) => {
    let id = req.params.id;

    service_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

module.exports.post_service = post_service;
module.exports.get_services = get_services;
module.exports.get_service = get_service;
//modul.exports.put_service = put_service;
//module.exports.delete_service = delete_service;