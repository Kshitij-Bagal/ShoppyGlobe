# 🛍️ ShoppyGlobe
An e-commerce web application for seamless online shopping, featuring product listings, cart management, authentication, and a user-friendly interface.

---
## 📖 Introduction
ShoppyGlobe is an e-commerce platform built with React.js and Redux Toolkit for state management. It provides a smooth and responsive shopping experience, with features like product browsing, adding items to the cart, updating quantities, and secure user authentication. The project aims to deliver a complete online store with a robust frontend and scalable backend (built separately with Node.js and MongoDB).

---
## 🚀 Uses
- Explore various products with detailed descriptions and prices.
- Add products to the cart, update quantities, and remove items.
- Register and log in securely with JWT authentication.
- Checkout with a simulated payment portal.
- Track your order history and view previous purchases.
---
## ✨ Features
- Product Browsing: View products with detailed descriptions, prices, and availability.
- Cart Management: Add, update, and remove products from the cart, with live cart updates.
- User Authentication: Secure registration, login, and JWT-based authentication for protected routes.
- Order History: Users can view past orders and details of their purchases.
- Checkout & Payment: Simulated checkout page with payment options and order confirmation.
- Admin Dashboard: Admins can manage products, users, and orders through a secure admin panel.
- Responsive Design: Fully responsive interface for mobile, tablet, and desktop views.


---
## 🛠️ Tech Stack
- Frontend: React.js, Vite, Redux Toolkit, JavaScript
- Styling: CSS, Tailwind CSS / Bootstrap
- Backend (separate repo): Node.js, Express.js, MongoDB
- API Testing: ThunderClient
- Version Control: Git, GitHub


---
## 📂 Project Structure
```
src/
├── assets/                    # Static assets and images
├── components/                # Reusable UI components
│   ├── Cart.jsx               # Cart component
│   ├── CartItem.jsx           # Individual cart item
│   ├── FilterBar.jsx          # Product filter
│   ├── ProductItem.jsx        # Single product display
│   ├── ProductList.jsx        # Product listing
│   └── ScrollToTop.jsx        # Scroll to top button
├── hooks/                    # Custom React hooks
│   ├── useFetchOrders.js      # Fetch user orders
│   ├── useFetchProducts.js    # Fetch products
│   └── useFetchUser.js        # Fetch user data
├── pages/                    # Application pages
│   ├── Home.jsx               # Homepage
│   ├── BrowseProduct.jsx      # Browse products
│   ├── ProductDetail.jsx      # Product details
│   ├── CartPage.jsx           # Cart page
│   ├── LoginSignup.jsx        # Login/Signup page
│   ├── CheckOut.jsx           # Checkout page
│   ├── OrdersPage.jsx         # User orders
│   ├── PaymentPortal.jsx      # Payment handling
│   └── NotFound.jsx           # 404 page
├── redux/                    # Redux state management
│   ├── cartSlice.js           # Cart state
│   ├── userSlice.js           # User state
│   └── store.js               # Redux store configuration
├── styles/                   # CSS styles
├── App.js                    # Main app component
├── index.js                  # React entry point
└── main.jsx                  # Vite entry point
```

## 🛠️ Installation & Setup
Clone the repository:
```
git clone https://github.com/your-username/ShoppyGlobe.git
```
Navigate to the project folder:
```
cd ShoppyGlobe
```
Install dependencies:
```
npm install
```
Start the development server:
```
npm run dev
```
Open the app in your browser:
```
http://localhost:5173
```
---

## 🤝 How to Contribute
Contributions are welcome! Here’s how you can help:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m "Add new feature").
4. Push to the branch (git push origin feature/your-feature).
5. Create a pull request, and we’ll review it together!

---
## 🎯 Future Goals

🛡️ Wishlist & Favorites: Save favorite products for later.\
🌍 Localization & Currency Support: Multi-language support and regional pricing.\
🏷️ Discounts & Coupons: Apply discounts and promotional codes.\
📦 Order Tracking: Real-time order tracking and notifications.\
📊 Admin Dashboard: Manage products, users, and orders.\

---
## 📩 How to Reach Me
If you have any questions or suggestions, feel free to reach out!

📧 Email: [kshitijbagal.cs@gmail.com](kshitijbagal.cs@gmail.com)  
🐙 GitHub: [github.com/kshitijbagal](github.com/kshitijbagal)  
💬 LinkedIn: [linkedin.com/in/kshitijbagal](linkedin.com/in/kshitijbagal)  

---
## 📜 License
This project is licensed under the MIT License — feel free to use and modify it!
