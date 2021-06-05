const express = require('express');
const app = express();
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const personsRoute = require('./persons.route');
const productsRoute = require('./products.route')

const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')
const db = mongoose.connection;

dotenv.config()

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use('/images', express.static('images'));
app.use(cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/persons', personsRoute);
app.use('/products', productsRoute);
app.use(expressValidator())
app.use('/', routes)
app.use(morgan("dev"))

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});