const request = require('supertest');
const app = require('../app');

let id;

test("POST /directors debe crear un director", async() => {
    const newDirector = {
        firstName: "Adam",
        lastName: "Sandler",
        nationality: "American",
        image: "https://cdn.britannica.com/52/243652-050-FEE0A5E4/Actor-Adam-Sandler-2019.jpg",
        birthday: "12-12-1990"
    };
    const res = await request(app)
        .post('/directors')
        .send(newDirector);
    id = res.body.id    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);    
});

test("GET /directors debe traer todos los directores", async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test("PUT /directors/:id debe actualizar un director", async() => {
    const director = {
        firstName: "Adam act",
        lastName: "Sandler",
        nationality: "American",
        image: "https://cdn.britannica.com/52/243652-050-FEE0A5E4/Actor-Adam-Sandler-2019.jpg",
        birthday: "12-12-1990"
    }
    const res = await request(app)
        .put(`/directors/${id}`)
        .send(director)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);    
});

test("DELETE /directors/:id debe eliminar un actor", async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
})