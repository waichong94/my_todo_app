const express = require('express');
const app  = express();
const PORT = process.env.PORT || 9001;
const path = require('path');
const jwt = require('jsonwebtoken');

const routes = require('./Routes/routes');
const auth = require('./Middleware/authentication');

const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { sequelize, User } = require('./models');
app.use(async (req, res, next) => {  
    let response = await auth.checkToken(req, res);
    if(response === undefined){
        return res.status(404).send({
            'status' : false,
            'msg'    : "Something went wrong.",
        });
    }
    if(!response.status){
        return res.send(response);
    }
    next()
})

app.use("", routes);

app.listen(PORT, async () => {
    console.log("SERVER LISTENING ON http://localhost:" + PORT );
    await sequelize.authenticate();
    console.log("Database Connected!");
})