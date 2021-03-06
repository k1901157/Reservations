const customer_model = require('../models/customer_model');

//All Data needed to add Customers details to Database.
const customer_data = (req) => {
    let data = {
        customer_name: req.body.customer_name,
        customer_phone: req.body.customer_phone,
        customer_email: req.body.customer_email,

    };
    return data;
};

//Create
//Add Customers Details to Database.
const post_customer = (req, res, next) => {
    console.log('post_customer');
    let data = customer_data(req);

    let new_customer = customer_model(data);

    new_customer.save().then(() => {
        console.log(new_customer);
        res.send(JSON.stringify(new_customer));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check your entries and try again!');
    }); 
};

//Read
//Get all Customers Details from Database.
const get_customers = (req, res, next) => {
    console.log('get_customers');

    customer_model.find({})
        .lean()
        .then(customer  => {
            res.send(JSON.stringify(customer));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};
//Read by id 
const get_customer = (req, res, next) => {
    let id = req.params.id;

    customer_model.findById(id)
    
        .lean()
        .then(customer  => {
        res.send(JSON.stringify(customer));
        res.send();
        
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
        console.log('Please check the id!');
    });
};

//Update
//to update the customers details.
//it is inactive yet, because the purpose so far is just to add the customers details and read them.
const put_customer = (req, res, next) => {
    console.log('put_customer');
    let id = req.params.id;
    let data = customer_data(req);

    customer_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((customer) => {
        res.send(customer);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


//Delete
//to delete the Customers details by using the id.
//it is inactive yet, because the purpose so far is just to add the customers details and read them.
const delete_customer = (req, res, next) => {
    let id = req.params.id;

    customer_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

module.exports.post_customer = post_customer;
module.exports.get_customers = get_customers;
module.exports.get_customer = get_customer;
//modul.exports.put_customer = put_customer;
//module.exports.delete_customer = delete_customer;