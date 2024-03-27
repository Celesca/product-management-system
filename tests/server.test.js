const request = require('supertest');
const app = require('../server');


require("dotenv").config();

describe('GET /products', () => {
    it("should return all products", async() => {
        const res = await request(app).get("/products");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
})

describe('GET /products/:id', () => {
    it("should return a single product", async() => {
        const res = await request(app).get("/products/1");
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(1);
    })
})

describe('GET /products/:id with no product in products', () => {
    it("should return a 404", async() => {
        const res = await request(app).get("/products/100");
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toStrictEqual("Product not found");
    })
})

describe('GET /products/:id with invalid id', () => {
    it("should return a 400", async() => {
        const res = await request(app).get("/products/-1");
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("Invalid ID");
    })
})