const express = require("express");
const cors = require("cors");
const app = express();
const user = require("./routes/use-routes.js")
const dietRoute = require("./routes/diet-routes.js")
const nutritionRoute = require("./routes/nutrition-route.js")
const requestRoute = require("./routes/request-routes.js")
const verifyLogin =require("./routes/verifyLogin.js")

const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('thisissomesecret'));

app.use(cors())
app.use(express.json());
app.use('/diet', dietRoute);
app.use('/nutrition',nutritionRoute)
app.use('/users', user);
app.use('/request',requestRoute);

app.post('/login', verifyLogin)


module.exports = app;
