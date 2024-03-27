const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`)
  next();
})

app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5},
  { id: 2, name: 'Typescript Fundamental', category: 'Books', price: 150, stock: 2}
]

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get Single Product
app.get('/products/:id', (req, res) => {
  if (req.params.id <= 0) {
    return res.status(400).send({message: 'Invalid ID'});
  }
  const product = products.find(product => product.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send({message: 'Product not found'});
  }
  res.json(product);
})

// POST request
app.post('/products', (req, res) => {
    res.send('Add a new product');
})

// PUT request
app.put('/products/:id', (req, res) => {
    res.send('Update the product with id ' + req.params.id);
})

// DELETE request
app.delete('/products/:id', (req, res) => {
    res.send('Delete the product with id ' + req.params.id);
})

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});

module.exports = app;