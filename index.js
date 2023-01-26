const express = require('express');
//const { get } = require('http');
//const Datastore = require('nedb')
//const mongoose = require("mongoose");
//const connectDB = require('./config/dbConn')
require('dotenv').config()

const app = express();

/* //Connect to MongoDB
connectDB();



mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(3000, () => console.log('Listening at 3000'))
  app.use(express.static('public'))

}) */


const playerDatabase = new Datastore('players.db')
//const seasonDatabase =new Datastore('seasons.db')

app.get('/player', (req, res) => {
    const player = req.query.player
    console.log('GET is proccessing')
    playerDatabase.findOne({ player: player }, (err, data) => {
        if (err) {
            console.log('ID is not in database')
            console.log(err)
            return
        } else {
            console.log('ID was founded')
            console.log(data.ID)

            res.json({
                status: 'success',
                player: player,
                id: data.ID
            })

            console.log(`Request was successful ${player}`)
        }
    })


}) 

app.get('https://data.mongodb-api.com/app/data-vvrcs/endpoint/data/v1', (req, res) => {
    console.log()
}) 