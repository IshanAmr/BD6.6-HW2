const express = require('express');
const { retrieveAllGames, retrieveGameById } = require("./controller/index");
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/games', async (req, res) => {
    try {
        const games = retrieveAllGames();
        if(games.length === 0) return res.status(400).json({ message : "No game found"});

        return res.status(200).json({games: games});
    } catch (error) {
        console.log("Games not found due to error "+error.message);
    }
  })

  app.get('/games/details/:id', async (req, res) => {
      try {
         const id = parseInt(req.params.id);
         const game = retrieveGameById(id);

         if(!game) return res.status(400).json({message : "No game found"});

         return res.status(200).json({game : game});
      } catch (error) {
         console.log("Games not found due to error "+error.message);
      }
  })

  module.exports = { app };
