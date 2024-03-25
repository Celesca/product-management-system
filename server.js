const express = require('express');
const app = express();
const port = 3000;

// GET request
app.get('/products', (req, res) => {
  res.send('Hello World!');
});

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