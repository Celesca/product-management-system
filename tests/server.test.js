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

describe('GET /products/:id normal', () => {
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

describe('POST /products normal', () => {
    it("should create a new product", async() => {
        const res = await request(app).post("/products").send({
            name: "New Product",
            category: "New Category",
            price: 100,
            stock: 10
        });
        const addProductResponse = {
            id: 3,
            name: "New Product",
            category: "New Category",
            price: 100,
            stock: 10
        };
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(3);
        expect(res.body).toStrictEqual(addProductResponse);
    })
})

describe('POST /products Invalid Request', () => {
    it("should return a 400", async() => {
        const res = await request(app).post("/products").send({
            name: "New Product",
            category: "New Category",
            price: 100
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("All fields are required");
    })
});

describe('POST /products Minus stock', () => {
    it("should return a 400", async() => {
        const res = await request(app).post("/products").send({
            name: "New Product",
            category: "New Category",
            price: 100,
            stock: -10
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("Price and Stock must be greater than 0");
    })
});

describe('PUT /products normal', () => {
    it("should update a product", async() => {
        const res = await request(app).put("/products/3").send({
            name: "Updated Product",
            category: "Updated Category",
            price: 200,
            stock: 20
        });
        const updatedProduct = {
            id: 3,
            name: "Updated Product",
            category: "Updated Category",
            price: 200,
            stock: 20
        };
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(updatedProduct);
    })
});

describe('PUT /products with no id in products', () => {
    it("should return a 404", async() => {
        const res = await request(app).put("/products/100").send({
            name: "Updated Product",
            category: "Updated Category",
            price: 200,
            stock: 20
        });
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toStrictEqual("Product not found");
    })
})