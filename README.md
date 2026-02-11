# NovaCart 🛒

NovaCart is a modern, full-stack e-commerce application built with performance and user experience in mind. It features a robust backend using Node.js and PostgreSQL, and a dynamic, responsive frontend built with React and Tailwind CSS.

## 🚀 Features

- **Product Management**: Browse and view product details.
- **Shopping Cart**: Add items to cart and manage purchases.
- **Authentication**: Secure user login and registration.
- **Admin Dashboard**: Manage products and view system status (Admin access required).
- **Security**: Rate limiting and bot protection powered by Arcjet.
- **Responsive Design**: Optimized for all devices using Tailwind CSS and DaisyUI.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **Security**: [Arcjet](https://arcjet.com/), Helmet, CORS
- **Logging**: Morgan

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A [Neon](https://neon.tech/) account (or any PostgreSQL database)
- An [Arcjet](https://arcjet.com/) account (for security features)

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/BradleyXiX/NovaCart.git
   cd NovaCart
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Configuration**
   Create a `.env` file in the **root** directory and add the following variables. You will need credentials from your Neon database and Arcjet dashboard.

   ```env
   # Server Configuration
   PORT=3000

   # Database Configuration (Neon/PostgreSQL)
   PGHOST=your-neon-hostname.net
   PGDATABASE=neondb
   PGUSER=your-db-user
   PGPASSWORD=your-db-password

   # Security (Arcjet)
   ARCJET_KEY=aj_your_arcjet_key
   ```

   > **Note**: The application uses the `@neondatabase/serverless` driver which requires SSL. Ensure your database connection string supports it.

5. **Initialize Database**
   The database tables are initialized automatically when the server starts if they don't exist.

## 🏃‍♂️ Running the Application

To run the full stack application, you will need to run the backend and frontend servers concurrently (or in separate terminals).

### Start the Backend
From the root directory:
```bash
npm run dev
```
*Server will start on http://localhost:3000*

### Start the Frontend
Open a new terminal, navigate to the frontend directory, and start the development server:
```bash
cd frontend
npm run dev
```
*Frontend will typically start on http://localhost:5173*

## 🛡️ API Endpoints

The backend provides the following main API routes:
- `/api/auth`: Authentication routes (login, register)
- `/api/products`: Product management routes

## 📄 License

This project is licensed under the ISC License.
