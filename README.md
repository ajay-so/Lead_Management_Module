# Lead Management System

A simple **Lead Management Module** built with **Node.js, Express, and MongoDB**.  
This project provides REST APIs to manage leads with features like **pagination**, **filtering**, and **search**.

---

## Features
- Add new leads with details (first name, last name, email, phone, source, etc.)
- Fetch all leads with:
  - Pagination
  - Filtering by `status` or `source`
  - Search across name, email, and phone
- Update existing leads
- Delete leads
- Custom Lead ID generation (example: `lead-abc123`)

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Packages**: Nodemon, dotenv, shortid (or nanoid for custom IDs)

---

## Setup & Installation

1. **Clone the Repository**
- git clone <your-repo-url>
- cd LeadManagement

2. **Install Dependencies**
- npm install

3. **Setup Environment Variables**
- Create a .env file in the root folder and add:
 - PORT=5000
 - MONGO_URI=your_mongodb_connection_string

4. **Run the project**
- npm run dev or nodemon index.js
- This will start the server with nodemon at http://localhost:5000.

