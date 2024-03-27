const request = require('supertest');
const app = require('../server');


require("dotenv").config();

describe('GET /products', () => {
    it("shoule return all products", async() => {
        const res = await request(app).get("/products");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
})
