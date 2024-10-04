# Full-Stack Application Documentation

This is a full-stack application using React for the frontend, Node.js, Express, MongoDB for the backend. The application implements JWT-based authentication and authorization features with role-based access control (RBAC) for admin, seller, and user roles.

## Table of Contents
1. Overview
2. Frontend Setup
3. Backend Setup
4. API Documentation
5. Authentication Endpoints
6. Product Endpoints
7. Seller Endpoints
8. Authentication and Authorization
9. Optional Advanced Features
10. JWT Access and Refresh Tokens
11. Role-Based Authorization
12. Deployment Instructions

## Overview
This project implements a simple e-commerce-like application where:

 - Admins can add, update, and delete products.
 - Sellers can manage their own products (add, update, delete).
 - Users can browse products. The application also includes authentication with JWT and access control based on user roles.

## Frontend Setup (React)
### Setup Instructions:
 - Clone the frontend repository.
Run `npm install` to install the necessary dependencies.
Start the application with `npm start`.

####  Code Structure:
 - Pages: Contains all the UI pages like Login, Signup, Product Listings.
 - Components: Containes Navbar, AdminAccess components.
 - State Management: Utilizes React's Context API for managing global state.
 - API Service Integration: Axios is used to interact with backend API routes, including authentication (JWT storage in localStorage).

#### Usage Instructions:
 - Authentication: Users can sign up, log in, and log out.
 - Product Access: Users can view products, while sellers can manage their own products and admins can manage all products.

## API Endpoints (Frontend):
The frontend interacts with the following endpoints:

`/api/auth/signup` – for signing up users.
`/api/auth/login` – for logging in users.
`/api/products` – for viewing products (user, seller, admin).
`/api/products/:id` – for product details (user, seller, admin).

### Authentication Handling:
JWT is stored in localStorage and passed in the Authorization headers for secure access to protected routes.

### Deployment Instructions (Frontend):
The frontend can be deployed on platforms like Vercel, Netlify, or GitHub Pages. Make sure to configure the appropriate API URL for production.

## Backend Setup (Node.js, Express, MongoDB)
#### Setup Instructions:
Clone the backend repository.

Run `npm install` to install all dependencies.

Set up your environment variables (`.env` file) as follows:

`MONGO_URI`: MongoDB Atlas connection string.
`JWT_SECRET`: Secret key for signing JWT tokens.
`PORT`: Port number on which you want to run your server.

Start the server using `npm start`.

 - Environment Variables:
`MONGO_URI`: MongoDB connection string for the MongoDB Atlas instance.
`JWT_SECRET`: Secret key for JWT authentication.

### API Documentation
 - Authentication Endpoints:
`POST` `/api/auth/signup` – User signup (open to all).
Payload: { name, email, password }
Response: Success or error message.

`POST` `/api/auth/login` – User login (open to all).
Payload: { email, password }
Response: JWT token and user details.

`POST` `/api/auth/token` – Generate new JWT (refresh token).
Payload: { refreshToken }
Response: New access token.

`POST` `/api/auth/logout` – User logout (blacklist token).

`GET` `/api/auth/all-users` – Admin can view all users.

 - Product Endpoints:
`POST` `/api/products` – Admin can add a product.
Payload: { name, description, price, category }

`GET` `/api/products` – Admin, seller, and users can view all products.

`GET` `/api/find-by-id/:id` – Retrieve a product by ID (admin, seller, and users).

`PATCH` `/api/products/:id` – Admin can update product details.

`DELETE` `/api/products/:id` – Admin can delete a product.

 - Seller Endpoints:
`POST` `/api/products/product-add-seller` – Seller can add products to their own bucket.
Payload: { name, description, price, category }

`GET` `/api/products/all-product-seller` – Seller can view all their products.

`PATCH` `/api/products/update-product-seller/:id` – Seller can update their product.

`DELETE` `/api/products/delete-product-seller/:id` – Seller can delete their product.

### Authentication and Authorization
 - JWT Authentication: JWT is used for secure access to all protected routes.
 - Access Control: The system implements role-based access control:
 - Admin: Can manage all products and users.
 - Seller: Can manage only their own products.
 - User: Can only view products.
To secure routes, JWT tokens are validated in middleware before allowing access.

 ### JWT Access and Refresh Tokens:
JWT tokens are used for authentication, with access and refresh tokens.
The `/auth/token` endpoint generates new tokens upon expiration of the access token.
Tokens are stored in localStorage on the client side.

### Role-Based Authorization:
Admins have full access to all routes.
Sellers can only manage their own products.
Users can only view products.

## Deployment Instructions
 - Frontend:
Deploy the frontend app on platforms like Vercel, Netlify, or GitHub Pages.

 - Backend:
Deploy the backend on platforms like Heroku, Render, or Railway.
Ensure that environment variables are configured in the production environment.