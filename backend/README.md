# E-Commerce Demo Backend (Node.js + Express + MySQL, raw SQL)

## Setup

```bash
cd backend
cp .env.example .env      # then set your MySQL password
mysql -u root -p < sql/database.sql
npm install
npm run dev
```

Server: http://localhost:5000

## API

| Method | Endpoint | SQL |
| --- | --- | --- |
| GET | /api/products | `SELECT * FROM products` |
| GET | /api/products/:id | `SELECT * FROM products WHERE id = ?` |
| POST | /api/products | `INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)` |
| PUT | /api/products/:id | `UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?` |
| DELETE | /api/products/:id | `DELETE FROM products WHERE id = ?` |

No ORM, no query builder — only `mysql2/promise` with parameterized SQL.

## Pointing the frontend at this backend

The frontend reads the API base URL from `VITE_API_URL` and falls back to the
bundled demo API when it is not set. To use this Express server:

```
VITE_API_URL=http://localhost:5000
```
