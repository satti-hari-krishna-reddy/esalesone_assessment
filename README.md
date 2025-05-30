# eSalesOne Assessment Project

This is a full-stack eCommerce checkout flow simulation built as part of an assessment. It includes a complete frontend-backend integration and follows a realistic user journey:

![esalesoneLandingPage](https://github.com/user-attachments/assets/c06ab899-f074-4d2a-b29f-f12610a65817)

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

![esalesoneProductPage](https://github.com/user-attachments/assets/b7223401-e364-43bf-8b35-f806fadcedf8)

### Checkout Page

![esalesoneCheckoutPage](https://github.com/user-attachments/assets/c3064bde-9b79-4b17-9504-d2bce3b68856)

* Form with validations (email, phone, card, expiry, etc)
* Shows dynamic order summary (based on selection from landing page)
* On submit:

  * Simulates 3 outcomes: success, decline, or error
  * Saves order to DB
  * Bsckend will update the inventory count of the prodcuts
  * Sends email (via Mailtrap)
  * Redirects to Thank You page

### Thank You Page

![esalesoneThankyouPage](https://github.com/user-attachments/assets/0bd31f01-9849-4364-a43a-91fa98a4f0a2)

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

![esalesoneSucessEmail](https://github.com/user-attachments/assets/a084ecc8-538c-4fcb-a322-643d57189c64)
![esalesonePaymentFail](https://github.com/user-attachments/assets/fd86560f-6404-4606-a02a-9f7809278909)
![esalesoneDenied](https://github.com/user-attachments/assets/83724d23-501b-451b-b08a-53d51d9a1296)

---

## ✍️ Author

Hari Krishna Reddy

* GitHub: [Hari Krishna](https://github.com/satti-hari-krishna-reddy)
* Linkedin: [Hari Krishna](https://www.linkedin.com/in/hari-krishna-r-86659b249/)
