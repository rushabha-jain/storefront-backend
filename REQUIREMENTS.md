# store-front

## Users

### 1. Create User

**_Endpoint:_**

```bash
Method: POST
URL: {{url}}/users
```

**_Headers:_**

| Key           | Value            |
| ------------- | ---------------- |
| Content-Type  | application/json |
| Authorization | Bearer {{jwt}}   |

**_Body:_**

```js
{
	"firstname": "rushabha",
	"lastname": "jain",
	"email": "randomEmail1@email.com",
	"password": "randomePassword"
}
```

**_Output:_**

```js
{
    "status": "success",
    "data": {
        "id": "32",
        "firstname": "rushabha",
        "lastname": "jain",
        "email": "randomEmail1@email.com",
        "password": "randomePassword"
    }
}
```

### 2. Get User

**_Endpoint:_**

```bash
Method: GET
URL: {{url}}/users/:id
```

**_Headers:_**

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer {{jwt}} |

**_URL variables:_**

| Key | Value |
| --- | ----- |
| id  | 31    |

**_Response:_**

```js
{
    "status": "success",
    "data": {
        "id": "31",
        "firstname": "Rushabha",
        "lastname": "Jain",
        "email": "randomEmail@email.com",
        "password": "$2b$10$o6cx46nuMbG.gVLq1MCfCOh6pQgMYU8Fz96jx5xJXYFwjKiDgYBUm"
    }
}
```

### 3. Get Users

**_Endpoint:_**

```bash
Method: GET
URL: {{url}}/users
```

**_Headers:_**

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer {{jwt}} |

**_Response:_**

```js
{
    "status": "success",
    "data": [
        {
            "id": "31",
            "firstname": "Rushabha",
            "lastname": "Jain",
            "email": "randomEmail@email.com",
            "password": "$2b$10$o6cx46nuMbG.gVLq1MCfCOh6pQgMYU8Fz96jx5xJXYFwjKiDgYBUm"
        }
    ]
}
```

### 4. Login

**_Endpoint:_**

```bash
Method: POST
URL: {{url}}/users/login
```

**_Headers:_**

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

**_Body:_**

```js
{
	"email": "randomEmail@email.com",
	"password": "randomePassword"
}
```

**_Response:_**

```js
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTYxOTI0NTAyMSwiZXhwIjoxNjE5NDE3ODIxfQ.V46iYetMagbl-7p0CKVXgI0R7zOndpKjx0pOWS4RwyM"
}
```

### 5. Signup

**_Endpoint:_**

```bash
Method: POST
URL: {{url}}/users/signup
```

**_Headers:_**

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

**_Body:_**

```js
{
	"firstname": "Rushabha",
	"lastname": "Jain",
	"email": "randomEmail@email.com",
	"password": "randomePassword"
}
```

**_Response:_**

```js
{
    "status": "success",
    "data": {
        "id": "31",
        "firstname": "Rushabha",
        "lastname": "Jain",
        "email": "randomEmail@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTYxOTI0NDg5OCwiZXhwIjoxNjE5NDE3Njk4fQ.46NY52uIVY3wchcsokkWmm-UG5tVNSQbyrEEPzO0ij8"
}
```

## Products

### 1. Create Product

**_Endpoint:_**

```bash
Method: POST
URL: {{url}}/products
```

**_Headers:_**

| Key           | Value            |
| ------------- | ---------------- |
| Content-Type  | application/json |
| Authorization | Bearer {{jwt}}   |

**_Body:_**

```js
{
	"name": "iPhone 5",
	"price": "199"
}
```

**_Response:_**

```js
{
    "status": "success",
    "data": {
        "id": "21",
        "name": "iPhone 5",
        "price": "199"
    }
}
```

### 2. Get Products

**_Endpoint:_**

```bash
Method: GET
URL: {{url}}/products
```

**_Response:_**

```js
{
    "status": "success",
    "data": [
        {
            "id": "21",
            "name": "iPhone 5",
            "price": 199
        }
    ]
}
```

### 3. Show Product

**_Endpoint:_**

```bash
Method: GET
URL: {{url}}/products/:productId
```

**_URL variables:_**

| Key       | Value |
| --------- | ----- |
| productId | 21    |

**_Response:_**

```js
{
    "status": "success",
    "data": {
        "id": "21",
        "name": "iPhone 5",
        "price": 199
    }
}
```

## Orders

### 1. Add product in the order

**_Endpoint:_**

```bash
Method: POST
URL: {{url}}/orders/:orderId/products
```

**_Headers:_**

| Key           | Value            |
| ------------- | ---------------- |
| Content-Type  | application/json |
| Authorization | Bearer {{jwt}}   |

**_URL variables:_**

| Key     | Value |
| ------- | ----- |
| orderId | 17    |

**_Body:_**

```js
{
	"product_id": 21,
	"quantity": 5
}
```

**_Response:_**

```js
{
    "status": "success",
    "data": {
        "id": "5",
        "order_id": 17,
        "product_id": 21,
        "quantity": 5
    }
}
```

### 2. Get Products in the order

**_Endpoint:_**

```bash
Method: GET
URL: {{url}}/orders/:orderId/products
```

**_Headers:_**

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer {{jwt}} |

**_URL variables:_**

| Key     | Value |
| ------- | ----- |
| orderId | 17    |

**_Response:_**

```js
{
    "status": "success",
    "data": [
        {
            "name": "iPhone 5",
            "price": 199,
            "quantity": 5
        }
    ]
}
```

### 3. Create Order

**_Endpoint:_**

```bash
Method: POST
URL: {{url}}/orders/users/:userId
```

**_Headers:_**

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer {{jwt}} |

**_URL variables:_**

| Key    | Value |
| ------ | ----- |
| userId | 31    |

**_Response:_**

```js
{
    "status": "success",
    "data": {
        "id": "17",
        "user_id": 31
    }
}
```

### 4. Get Orders By User

**_Endpoint:_**

```bash
Method: GET
URL: {{url}}/orders/users/:userId?status=1
```

**_Headers:_**

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer {{jwt}} |

**_Query params:_**

| Key    | Value | Description                        |
| ------ | ----- | ---------------------------------- |
| status | 1     | Optional(0 : active, 1: completed) |

**_URL variables:_**

| Key    | Value |
| ------ | ----- |
| userId | 31    |

**_Response:_**

```js
{
    "status": "success",
    "data": [
        {
            "id": "17",
            "user_id": "31",
            "status": 1
        }
    ]
}
```

### 5. Mark Order Complete

**_Endpoint:_**

```bash
Method: PATCH
URL: {{url}}/orders/:orderId/markAsComplete
```

**_Headers:_**

| Key           | Value          |
| ------------- | -------------- |
| Authorization | Bearer {{jwt}} |

**_URL variables:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| orderId | 17    |             |

**_Response:_**

```js
{
    "status": "success"
}
```
