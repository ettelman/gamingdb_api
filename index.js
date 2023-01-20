const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;

// mongoose for mongodb
const mongoose = require("mongoose");
const mongodb = 'mongodb://localhost:27017/gamesdb';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
// schema for the games
const gameSchema = new mongoose.Schema({

        name: {
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        score: {
            type: Array,
            required: true
        }
    })
    
    // create model for mongoose-schema
const Game = mongoose.model('Game', gameSchema)


// connect to db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json())
app.use(cors())

// get all games
app.get('/games', (req, res) => {
    Game.find(function(err, games) {
        if (err) return console.error(err);

        res.status(200).send({ // send games
            games
        })
    });
});

// get specific game with id
app.get('/games/:id', (req, res) => {
    let game = req.params.id;
    Game.findById(game, function(err, response) {
        if (err) {
            res.status(404).send('Could not find specified game')
        } else {

            res.status(200).send({ // send game with id
                response
            })

        }
    });
});

// delete method for game specified by id
app.delete('/games/:id', (req, res) => {
    let game = req.params.id;
    Game.findOneAndDelete({ '_id': game }, function(err, del) {
        if (err) {
            res.status(404).send('Cant find specified game')
        } else {

            res.status(200).send({ 
                messege: "Game removed",
                deleted: del
            })

        }
    });
});

// add game
app.post('/games', (req, res) => {
    // object to be added
    const game = new Game({
        name: req.body.name,
        platform: req.body.platform,
        genre: req.body.genre,
        year: req.body.year,
        score: req.body.score
    });
    game.save(function(err) {
        if (err) {
            res.status(400).send({ message: err.message })
            return false;
        } else {
            res.status(201).send({
                game
            })
        }
    });
});

app.patch('/games/:id', async (req, res) => {
    try {
        const updatedPost = await Game.updateOne(
            {_id : req.params.id},
            {$set : {
                name: req.body.name,
                platform: req.body.platform,
                genre: req.body.genre,
                year: req.body.year,
                score: req.body.score
            }}
        )
        res.status(201).send({
            messege: "Game updated"
        })
    } catch (err) {
        res.status(400).send({ message: err.message })
        return false;
    }
});

app.listen(
    PORT,
    () => console.log(`its alive @ ${PORT}`)
)