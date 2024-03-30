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

let productID = products.length;

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get Single Product
app.get('/products/:id', (req, res) => {
  const findProductID = parseInt(req.params.id)

  if (findProductID <= 0 || !findProductID) {
    return res.status(400).send({message: 'Invalid ID'});
  }
  const product = products.find(product => product.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send({message: 'Product not found'});
  }
  res.json(product);
})

function ProductRequestBody(request) {

  const newProductPrice = parseFloat(request.price);
  const newProductStock = parseFloat(request.stock);

  if (!request.name || !request.category || !newProductPrice || !newProductStock) {
    return res.status(400).send({message: 'Invalid request body'});
  }
  if (newProductPrice <= 0 || newProductStock <= 0) {
    return res.status(400).send({message: 'Price and Stock must be greater than 0'});
  }
  const newProduct = {
      id: productID++,
      name: request.name,
      category: request.category,
      price: newProductPrice,
      stock: newProductStock
    };

  return newProduct;
}

// POST request
app.post('/products', (req, res) => {
    const newProduct = ProductRequestBody(req.body);
    products.push(newProduct);
    res.json(newProduct);
})

// PUT request
app.put('/products/:id', (req, res) => {
  const updateProductID = parseInt(req.params.id);

  if (!updateProductID || updateProductID <= 0) {
    return res.status(400).send({message: 'Invalid ID'});
  }

  const product = products.find(p => p.id === updateProductID);
  if (!product) {
    return res.status(404).send({message : "Product not found"});
  }

  const updateProduct = ProductRequestBody(req.body);

  product.name = updateProduct.name;
  product.category = updateProduct.category;
  product.price = updateProduct.price;
  product.stock = updateProduct.stock;
  res.json(product);
});

// DELETE request
app.delete('/products/:id', (req, res) => {
  const deletedProductID = parseInt(req.params.id);
  if (deletedProductID <= 0 || !deletedProductID) {
    return res.status(400).send({ message: 'Invalid ID' });
  }

   const productIndex = products.findIndex(p => p.id === deletedProductID);
   if (productIndex === -1) {
    return res.status(404).send({message: 'Product not found'});
   }
   
   const deletedProduct = products.splice(productIndex, 1);
   res.json(deletedProduct[0]);
})

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});

module.exports = app;