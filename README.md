### Product Management System

Product Management System is the backend server that use to manage product.

### API Endpoints Guidelines

* `GET /products`

* `GET /products/:id`

* `POST /products`
  - Request Body : 
    {
      name,
      category,
      price,
      stock
    };

* `PUT /products/:id`
  - Request Body : 
    {
      name,
      category,
      price,
      stock
    };

* `DELETE /products/:id`