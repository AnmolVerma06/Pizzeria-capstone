# 🍕 Pizzeria - Full Stack MERN Capstone Project

A full-stack MERN application that allows users to browse pizzas, customize ingredients, manage their shopping cart, and complete checkout with dynamic pricing. This project was developed as part of the Full Stack Web Development Capstone Assessment.

## 🚀 Live Features

- Browse available pizzas with images, descriptions and pricing
- Add pizzas to cart
- Increase or decrease quantity directly from the Order Pizza page
- Build your own pizza with custom ingredients
- Dynamic pricing based on selected ingredients
- Shopping cart management
- Real-time bill calculation
- Checkout page with order summary
- Responsive UI using React Bootstrap
- State management using Redux Toolkit
- RESTful backend APIs using Express.js
- MongoDB database integration

---

# 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Axios
- Bootstrap
- React Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# 📂 Project Structure

```
Pizzeria-capstone
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seed
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── styles
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ✨ Core Functionalities

## 🏠 Home Page

- Navigation bar
- Logo redirects to Home
- About section
- Ingredients section
- Delivery information
- Responsive landing page

---

## 🍕 Order Pizza

- Display pizza menu from database
- Pizza name
- Description
- Price
- Ingredients
- Toppings
- Veg / Non-Veg indicator
- Pizza image
- Add to Cart
- Quantity selector (- 1 +)

---

## 🧑‍🍳 Build Your Pizza

- Select ingredients
- Dynamic price calculation
- Live preview of selected ingredients
- Add customized pizza to cart

---

## 🛒 Shopping Cart

- View added pizzas
- Increase quantity
- Decrease quantity
- Remove items
- Dynamic bill calculation
- Ingredient price calculation
- Grand total

---

## ✅ Checkout

- Complete order summary
- Quantity modification
- Accurate billing
- Validation before checkout

---

# 📊 Capstone Checkpoints

## ✔ Checkpoint 1 - Home Page

- Navigation working
- Logo redirects to Home

---

## ✔ Checkpoint 2 - Order Pizza

- Menu data loaded
- Add to Cart working
- Quantity modification from product card

---

## ✔ Checkpoint 3 - Build Your Pizza

- Ingredient selection
- Dynamic pricing

---

## ✔ Checkpoint 4 - Checkout

- Quantity modification
- Accurate bill calculation

---

## ✔ Final Validation

- End-to-end workflow completed
- Dynamic data fetching
- Responsive UI
- Clean code structure
- Redux state management
- API integration
- Form validations

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/AnmolVerma06/Pizzeria-capstone.git
```

```
cd Pizzeria-capstone
```

---

## Backend Setup

```
cd backend
npm install
```

Create a `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend

```
npm run dev
```

---

## Frontend Setup

```
cd frontend
npm install
```

Run frontend

```
npm start
```

---

# 🌱 Seed Database

Run

```bash
npm run seed
```

This populates the database with sample pizzas and ingredients.

---

# 📡 API Endpoints

## Pizza

| Method | Endpoint |
|---------|----------|
| GET | /api/pizzas |

---

## Ingredients

| Method | Endpoint |
|---------|----------|
| GET | /api/ingredients |

---

## Cart

| Method | Endpoint |
|---------|----------|
| GET | /api/cart |
| POST | /api/cart |
| PUT | /api/cart/:id |
| DELETE | /api/cart/:id |
| DELETE | /api/cart |

---

# 🎯 Learning Outcomes

- MERN Stack Development
- REST API Development
- Redux Toolkit
- React Hooks
- MongoDB & Mongoose
- State Management
- Responsive UI Design
- Component-based Architecture
- CRUD Operations
- Dynamic Pricing Logic

---

# 👨‍💻 Author

**Anmol Verma**

GitHub: https://github.com/AnmolVerma06

Repository:
https://github.com/AnmolVerma06/Pizzeria-capstone

---

# 📄 License

This project was developed for educational purposes as part of the Full Stack Web Development Capstone Project.
