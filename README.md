# Node.js + Express + MongoDB Starter

This project is a basic Node.js application using Express for the server and Mongoose to connect to MongoDB. It includes user authentication (signup/login with JWT), protected routes, and menu management.

## Features
- User signup and login with hashed passwords (bcrypt)
- JWT authentication for protected routes
- Only authenticated users can add, edit, or delete users/menus
- Public endpoints for user and menu listing
- Role-based user filtering

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` (or create `.env`):
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
3. **Run the server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   node index.js
   ```

The server will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Auth
- `POST /users/signup` — Register a new user
- `POST /users/login` — Login and receive a JWT token

### Users
- `GET /users` — List all users (public)
- `GET /users/:role` — List users by role (token required)
- `POST /users` — Add user(s) (token required)
- `PUT /users/:id` — Edit user (token required)
- `DELETE /users/:id` — Delete user (token required)

### Menu
- `GET /menu` — List all menu items (public)
- `POST /menu` — Add menu item(s) (token required)
- `PUT /menu/:id` — Edit menu item (token required)
- `DELETE /menu/:id` — Delete menu item (token required)

## Project Structure
- `index.js`: Main server file
- `modules/`: Mongoose models
- `routes/`: Express route handlers and middleware
- `.env`: Environment variables

## Customization
- Update `MONGO_URI` and `JWT_SECRET` in your `.env` file to match your setup.

---