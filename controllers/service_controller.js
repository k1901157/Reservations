const service_model = require('../models/service_model');

const service_data = (req) => {
    let data = {
        service_name: req.body.service_name,

    };
    return data;
};

// Create
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
    }); 
};

//Read
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
    });
};

// Update
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