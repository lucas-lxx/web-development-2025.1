const express = require('express');
const sequelize = require('./util/db');
require('dotenv').config();

const user_router = require('./routes/user.route')

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user', user_router);
app.use('/', express.static('./frontend'));


// sequelize.sync({ force: true })
sequelize.sync()
.then(_ => {
  console.log("======sequelize sync start================")
  app.listen(process.env.PORT, process.env.HOST, res => {
    console.log(`app listening on port: ${process.env.PORT}`)
  });
})
.then(_ => {
  console.log("======sequelize sync end==================")
})
.catch(err => {
  console.log(err);
})