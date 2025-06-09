
# Full Stack App - Node.js + Express + PostgreSQL + React + TypeScript + Vite

This is a full-stack web application built using:

- **Backend:** Node.js + Express
- **Frontend:** React + TypeScript + Vite
- **Database:** PostgreSQL

---

## 📁 Project Structure

```
.
├── client/           # React frontend (Vite + TypeScript)
├── server/           # Node.js backend (Express)
├── README.md
```

---

## 🔧 Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (v13+)
- [npm](https://www.npmjs.com/)
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) (optional, for loading env vars)

---

## 🗄️ Database Setup

### 1. Create and Configure PostgreSQL Database

First, ensure PostgreSQL is running.

#### Option A: Manual Setup

Create the database:

```sql
CREATE DATABASE job_management;
```

Run the schema file:

```bash
psql -U your_username -d job_management -f server/schema.sql
```

#### Option B: Automated Setup (recommended)

```bash
# Create database and run schema in one command:
psql -U postgres -c "CREATE DATABASE job_management" && \
psql -U postgres -d job_management -f server/schema.sql
```

### 2. Verify the Schema

Connect to your database and verify the tables were created:

```sql
\c job_management
\dt
```

You should see these tables:

- `jobsites`
- `categories`
- `jobsitecategories`
- `categoryitems`

The `schema.sql` will:

- Create the database
- Set up all tables with proper constraints
- Insert the 3 default categories
- Create necessary indexes
- Set up permissions

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/EronMahmuti/flex-task.git
cd react-interview-task
```

---

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
touch server/.env
```

Add your backend configuration:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=--your_password--
DB_NAME=job_management
```

Create `.env` in `client/` for frontend environment variables:

```env
VITE_API_URL=http://localhost:3000/api
```

---

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

---

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

### 5. Run the Development Servers

#### Start the Backend

```bash
cd server
npm run dev
```

#### Start the Frontend

```bash
cd ../client
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend/API: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running in Production (Optional)

To serve the frontend from the backend:


## 🧰 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, JWT, PostgreSQL
- **Database:** PostgreSQL (via `pg` )

---

--- 
 ## How would you make this solution scale to millions of records?


To scale this solution to millions of records, I would focus on:

Efficient Pagination: Use keyset (or cursor-based) pagination instead of traditional OFFSET/LIMIT pagination. Keyset pagination fetches records based on the last seen value, which is much faster and more efficient for large datasets because it avoids scanning all previous rows.

Caching & In‐Memory Layers: Implement caching (like Redis or Memcached) to store frequently accessed data in memory. This reduces load on the database and speeds up response times, especially for repeated or popular queries.

Connection Pooling: Use a connection pool to manage database connections efficiently. Connection pooling reuses existing connections, reducing overhead and ensuring the database can handle many simultaneous requests without becoming a bottleneck.

Frontend Optimization: In React, use pagination UI components (such as react-paginate) or virtualization libraries (like react-window) to render only the visible items, preventing performance issues when dealing with large lists

--- 
 ## How might you make this app more secure?

Validate and sanitize all user input to prevent attacks like XSS and SQL injection.

Keep all dependencies updated to patch known security vulnerabilities.

Implement proper authentication and authorization, ensuring users can only access what they are allowed.

Use HTTPS to encrypt data in transit and protect sensitive information.

Regularly review and test your app for security issues, including dependencies and third-party libraries
