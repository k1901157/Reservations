const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const app = express();
const body_parser = require('body-parser');

// npm run start-dev

//controllers
const customer_controller = require('./controllers/customer_controller');
const service_controller = require('./controllers/service_controller');
const reservation_controller = require('./controllers/reservation_controller');


app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
})); 


app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
});


//CREATE
app.post("/api/customer", customer_controller.post_customer);
app.post("/api/service", service_controller.post_service);
app.post("/reservation", reservation_controller.post_reservation);

//READ
app.get("/api/customers", customer_controller.get_customers);
app.get("/api/services", service_controller.get_services);
app.get("/reservations", reservation_controller.get_reservations);

//READ by :id
app.get("/api/customer/:id", customer_controller.get_customer);
app.get("/api/service/:id", service_controller.get_service);
app.get("/reservation/:id", reservation_controller.get_reservation);

//UPDATE
app.put("/reservation/:id", reservation_controller.put_reservation);

//DELETE
app.delete("/reservation/:id", reservation_controller.delete_reservation);

//patch
app.patch("/reservation/:id", reservation_controller.patch_reservation);

const database_uri = "mongodb+srv://server:df5OnEZush49tpT2@cluster0-9q7ur.mongodb.net/reservationdb?retryWrites=true&w=majority";
                    
mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});