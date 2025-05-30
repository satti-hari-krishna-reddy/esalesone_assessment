# eSalesOne Assessment Project

This is a full-stack eCommerce checkout flow simulation built as part of an assessment. It includes a complete frontend-backend integration and follows a realistic user journey:

## 🔧 Tech Stack

**Frontend:**

* React 
* Tailwind CSS
* Vite
* Deployed with Vercel

**Backend:**

* Node.js with Express
* MongoDB (with Mongoose)
* Nodemailer + Mailtrap for simulated email confirmations
* Docker for containerization
* Deployed with Azure

---

## 📂 Folder Structure

* `/frontend`: Contains the React-based frontend
* `/backend`: Express API, MongoDB integration, email logic, Docker setup

---

## 🔄 Flow Summary

### Landing Page

* Lists products fetched from backend
* Allows variant + quantity selection
* Clicking "Buy Now" routes to Checkout

### Checkout Page

* Form with validations (email, phone, card, expiry, etc)
* Shows dynamic order summary (based on selection from landing page)
* On submit:

  * Simulates 3 outcomes: success, decline, or error
  * Saves order to DB
  * Bsckend will update the inventory count of the prodcuts
  * Sends email (via Mailtrap)
  * Redirects to Thank You page

### Thank You Page

* Shows order ID, full order details, and confirmation message

---

## 🧪 Additional Features

* Dummy product seed data inserted on first server start
* CORS enabled to allow frontend-backend communication

---

## 🚀 Getting Started

* Update `.env` with your MongoDB and Mailtrap credentials

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
node server.js
```

---

## 📬 Email (Mailtrap)

* Emails triggered on successful or failed transactions

---

## ✍️ Author

Hari Krishna Reddy

* GitHub: [Hari Krishna](https://github.com/satti-hari-krishna-reddy)
* Linkedin: [Hari Krishna](https://www.linkedin.com/in/hari-krishna-r-86659b249/)
