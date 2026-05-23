Jaida Tyre Agency — Full Stack E-Commerce Platform
A complete full stack e-commerce web application built for a real local business — Jaida Tyre Agency, Bari Bazar, Chaibasa. Built as Task 3 of the Pinnacle Labs Web Development Internship 2026.
Live Demo: https://roadgrip.netlify.app
GitHub: https://github.com/zaidkamar08/Tyre_agency

About the Project
This is not a demo project with fake data. It is a real e-commerce platform built for my father's automotive parts business in Chaibasa, Jharkhand. The website allows customers to browse real products, add them to cart, place orders, and register accounts. The admin panel allows the shop owner to manage products and track orders in real time.

Tech Stack
Frontend

React + Vite
Tailwind CSS
Framer Motion
React Router DOM
React Icons

Backend & Database

Supabase (PostgreSQL Database)
Supabase Authentication
Supabase Storage (Product Images)
Supabase Row Level Security

Deployment

Netlify


Features
Customer Side

Browse 15+ real products across 3 categories — Tyres, Vehicle Parts, EV Batteries
Search products with live suggestions
Filter by vehicle type — Truck, Bus, Tractor, Car, Electric Auto
Filter by brand — MRF, CEAT, Apollo, JK, Bridgestone and more
Product detail pages with full description and warranty info
Add to cart with quantity control
User signup and login with email
Place orders stored in real database
Order confirmation with shop contact details

Admin Side

Secure admin panel (login required)
Add new products with full details
Edit existing products
Delete products with confirmation
View all customer orders
Update order status — Pending, Confirmed, Delivered, Cancelled


Database Schema
products
  - id, name, description, price, category
  - vehicle_type, brand, stock, image_url, warranty

orders
  - id, user_id, total_price, status, created_at

order_items
  - id, order_id, product_id, quantity, price

Project Structure
src/
├── components/
│   └── Navbar.jsx
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Admin.jsx
├── supabase/
│   └── client.js
├── App.jsx
└── index.css

Getting Started
1. Clone the repository
bashgit clone https://github.com/zaidkamar08/tyre_agency.git
cd jaida-tyre-agency
2. Install dependencies
bashnpm install
3. Set up environment variables
Create a .env file in the root folder:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Run the development server
bashnpm run dev

About the Business
Jaida Tyre Agency


Established: 2000 (25+ years)
Products: MRF, CEAT, Apollo, JK, Bridgestone tyres
Vehicle Types: Truck, Bus, Tractor, Car, Electric Auto



Internship
Built as part of Pinnacle Labs Web Development Internship 2026
Intern: Md Jaaid Kamar
University: C.V. Raman Global University, Bhubaneswar
Program: B.Tech Computer Science and Engineering

Connect

LinkedIn: Md Jaaid Kamar
GitHub: zaidkamar08
Email: zaidkamar08@gmail.com
