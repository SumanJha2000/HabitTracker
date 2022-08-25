const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/routes.js');
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

//mongoose connection
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("mongoose connected successfully");
})

//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


//routers
app.use(router);

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
})