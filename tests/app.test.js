const { retrieveAllGames, retrieveGameById } = require("../controller/index");
const request = require("supertest");
const http = require('http');
const { app } = require("../index");

jest.mock("../controller", () => {
    const originalModule = jest.requireActual("../controller");
    return {
        ...originalModule,
        retrieveAllGames: jest.fn(),
        retrieveGameById: jest.fn(),
    };
});

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Controller Function tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all games", () => {
        const mockGames = [
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
          }
        ];

        retrieveAllGames.mockReturnValue(mockGames);

        const results = retrieveAllGames();
        expect(results).toEqual(mockGames);
        expect(results.length).toBe(2);
    });

    it("should return game given id", () => {
      const mockGame = 
      {
        'gameId': 1,
        'title': 'The Legend of Zelda: Breath of the Wild',
        'genre': 'Adventure',
        'platform': 'Nintendo Switch'
      }

      retrieveGameById.mockReturnValue(mockGame);

      const results = retrieveGameById(1);
      expect(results).toEqual(mockGame);
  });
});

describe("API Endpoint tests", () => {
    it("GET /games should get all movies", async () => {
      const mockGames = [
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
        }
      ];

        retrieveAllGames.mockReturnValue(mockGames);

        const res = await request(server).get("/games");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ games: mockGames });
    });

    it("GET /games/details/:id should get a game by ID", async () => {
      const mockGame = 
      {
        'gameId': 1,
        'title': 'The Legend of Zelda: Breath of the Wild',
        'genre': 'Adventure',
        'platform': 'Nintendo Switch'
      };

        retrieveGameById.mockReturnValue(mockGame);

        const res = await request(server).get("/games/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ game: mockGame });
    });
});
