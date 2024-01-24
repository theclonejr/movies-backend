const request = require('supertest');
const app = require('../app');
require('../models')

let id;

test("POST /actors debe crear un actor", async() => {
    const newActor = {
        firstName: "Adam",
        lastName: "Sandler",
        nationality: "American",
        image: "https://cdn.britannica.com/52/243652-050-FEE0A5E4/Actor-Adam-Sandler-2019.jpg",
        birthday: "12-12-1990"
    }
    const res = await request(app)
        .post('/actors')
        .send(newActor)
    id = res.body.id;    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName)    

});

test("GET /actors debe traer todos los actores", async()=>{
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("PUT /actors/:id debe actualizar un actor", async() => {
    const actor = {
        firstName: "Adam Actualizado",
        lastName: "Sandler",
        nationality: "American",
        image: "https://cdn.britannica.com/52/243652-050-FEE0A5E4/Actor-Adam-Sandler-2019.jpg",
        birthday: "1990-12-12"
    };
    const res = await request(app).put(`/actors/${id}`).send(actor)  
    expect(res.status).toBe(200);

})

test("DELETE /actors/:id debe eliminar un actor", async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
})