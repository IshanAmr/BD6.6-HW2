let games = [
  {
    'gameId': 1,
    'title': 'The Legend of Zelda: Breath of the Wild',
    'genre': 'Adventure',
    'platform': 'Nintendo Switch'
  },
  {
    'gameId': 2,
    'title': 'Red Dead Redemption 2',
    'genre': 'Action',
    'platform': 'PlayStation 4'
  },
  {
    'gameId': 3,
    'title': 'The Witcher 3: Wild Hunt',
    'genre': 'RPG',
    'platform': 'PC'
  }
];

function retrieveAllGames() {
    return games;
}

function retrieveGameById(id) {
    const game = games.find(ele=> ele.gameId === id);
    return game;
}

module.exports = { retrieveAllGames, retrieveGameById };