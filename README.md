**Intern Portal**

A simple full-stack application for interns to register/login, view their profile, referral code, total donations raised, make donations, and see a leaderboard of top donors.

# Tech Stack

Frontend: React, Vite, Tailwind CSS, Axios, React Router

Backend: Node.js, Express, MongoDB Atlas, Mongoose

Authentication: JSON Web Tokens (JWT)

Styling & Icons: Tailwind CSS, react-icons

# Features

User Authentication: Register and log in with JWT-based auth

Protected Dashboard: Only authenticated users can access

Profile Display: Intern name, auto-generated referral code, total donations raised

Donation Flow:

Enter a positive amount

Real-time update of total donations

Confirmation modal with a green check icon and thank-you message

Leaderboard: Displays top donors, updated dynamically after each donation

# Prerequisites

Node.js v18 or newer

npm or yarn

MongoDB Atlas account (or compatible MongoDB URI)

**Setup & Installation**

1. Clone the Repository

git clone <YOUR_REPO_URL>
cd intern-portal

2. Backend Setup

cd backend
npm install

Create a .env file in backend/ with:

MONGODB_URI="<your-mongodb-atlas-uri>"
JWT_SECRET="<your-jwt-secret>"
PORT=4000

Start the backend server:

npm start

3. Frontend Setup

cd ../frontend
npm install

If you need a custom API base URL, create a .env in frontend/:

VITE_API_BASE_URL="http://localhost:4000/api"

# Start the frontend:

npm run dev

# Usage

Open your browser to http://localhost:5173

Register a new account or Log in with existing credentials

On the Dashboard, view your profile:

Your name

Your referral code (e.g. yourname2025)

Total donations raised

Enter a donation amount (must be >0) and click Donate

See a confirmation modal and watch your total & leaderboard update in real time

**API Reference**

# Authentication

POST /api/auth/registerBody: { name, email, password }Response: { token, user }

POST /api/auth/loginBody: { email, password }Response: { token, user }

**Intern Routes**

# All require Authorization: Bearer <token> header

GET /api/intern/profileResponse: { name, referralCode, totalDonations }

GET /api/intern/leaderboardResponse: [{ name, raised }, ...]

POST /api/intern/donateBody: { amount }Response: { profile, leaderboard }

**Deployment**

# Frontend:
Deploy the frontend/ folder to Vercel, Netlify, or GitHub Pages.Set VITE_API_BASE_URL environment variable if using a custom domain.

# Backend: 
Deploy the backend/ folder to Render, Railway, or another Node.js host.Configure environment variables: MONGODB_URI, JWT_SECRET, and PORT.

**License**

MIT © Parvez Mussarf Hussain

