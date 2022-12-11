require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@davileu.omyqbp8.mongodb.net/sneakershop?retryWrites=true&w=majority`;

mongoose.connect(connectionStr, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
