const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
require('../models')

let id;

test("POST /movies debe crear una pelicula", async() => {
    const newMovie = {
        name: "La guerra del mañana",
        image: "adsadasdasdasdasdasd",
        synopsis: "sadadasdasdsadasdasdas",
        releaseYear: 2022
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();    
})

test("GET /movies debe traer todos las peliculas", async() => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("PUT /movies/:id debe actualizar una pelicula", async() => {
    const movie = {
        name: "La guerra del mañana",
        image: "adsadasdasdasdasdasd",
        synopsis: "sadadasdasdsssadasdasadasdasdas",
        releaseYear: 2022
    };
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
})


test("DELETE /movies debe eliminar una pelicula", async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
})
