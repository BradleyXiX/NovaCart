import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json()) // for parsing incoming data
app.use(cors()); // handles cors errors
app.use(helmet()); // security middleware 
app.use(morgan("dev")); // logs the requests 

app.use("/api/products", productRoutes)

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `    
        console.log("Database initialized");
    } catch (error) {
        console.log("Error in the initDB", error);
    }
}

initDB().then(()=> {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})