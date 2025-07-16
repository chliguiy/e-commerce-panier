# BoutiqueFR Backend

NestJS backend API for the BoutiqueFR e-commerce application.

## Features

- RESTful API endpoints for categories, products, and orders
- MySQL database integration with TypeORM
- CORS enabled for frontend integration
- Data validation with class-validator
- Automatic database seeding

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:categoryId` - Get products by category

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE boutique_fr;
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Update database credentials in `.env` file

5. Start the development server:
```bash
npm run start:dev
```

The server will run on http://localhost:8080

## Database Schema

The application will automatically create the following tables:
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items

Sample data will be automatically seeded on first run.

## Frontend Integration

Update your frontend API base URL to:
```
http://localhost:8080
```

The backend is configured to accept CORS requests from:
- http://localhost:5173 (Vite dev server)
- https://lustrous-cheesecake-8132b4.netlify.app (deployed frontend)