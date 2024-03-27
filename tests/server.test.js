const request = require('supertest');
const app = require('../server');


require("dotenv").config();

// GET Method

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

// POST /products

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

// PUT /products/:id

describe('PUT /products/:id normal', () => {
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



describe('PUT /products/:id with no id in products', () => {
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

describe('PUT /products/:id with invalid id', () => {
    it("should return a 400", async() => {
        const res = await request(app).put("/products/-1").send({
            name: "Updated Product",
            category: "Updated Category",
            price: 200,
            stock: 20
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("Invalid ID");
    })
})

describe('PUT /products/:id Invalid Request', () => {
    it("should return a 400", async() => {
        const res = await request(app).put("/products/3").send({
            name: "Updated Product",
            category: "Updated Category",
            price: 200
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("All fields are required");
    })
});

describe('PUT /products/:id Minus stock', () => {
    it("should return a 400", async() => {
        const res = await request(app).put("/products/3").send({
            name: "Updated Product",
            category: "Updated Category",
            price: 200,
            stock: -20
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("Price and Stock must be greater than 0");
    })
});

// DELETE /products/:id
describe('DELETE /products/:id normal', () => {
    it("should return a 200 and deleted product", async() => {
        const deletedProduct = 
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5};
        const res = (await request(app).delete("/products/1"));
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(deletedProduct);
    })
})

describe('DELETE /products/:id with not found id', () => {
    it("should return a 404", async() => {
        const res = await request(app).delete("/products/25");
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toStrictEqual("Product not found");
    })
})

describe('DELETE /products/:id with invalid id', () => {
    it("should return a 400", async() => {
        const res = await request(app).delete("/products/-1");
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toStrictEqual("Invalid ID");
    })
});