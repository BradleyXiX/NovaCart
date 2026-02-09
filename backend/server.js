import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { sql } from "./config/db.js";
import { arcjetInstance } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json()); // for parsing incoming data
app.use(cors()); // handles cors errors
app.use(helmet()); // security middleware
app.use(morgan("dev")); // logs the requests

// ensure logs directory exists for writing arcjet logs
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs", { recursive: true });
}

//apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    // pass the request as the third argument so Arcjet can read request details
    // (ip, headers, method, path) used by local rules like tokenBucket
    const decision = await arcjetInstance.protect(undefined, {
      requested: 1, // specifies that each request consumes 1 token
    }, req);

    // Log decisions for debugging rate-limit behavior
    try {
      const short = {
        time: new Date().toISOString(),
        ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
        method: req.method,
        path: req.path,
        denied: decision.isDenied(),
        ttl: decision.ttl ?? null,
        results: Array.isArray(decision.results) ? decision.results.map((r) => ({
          id: r.ruleId || "",
          conclusion: r.conclusion || r._conclusion || "",
          reason: r.reason && r.reason.constructor && r.reason.constructor.name ? r.reason.constructor.name : String(r.reason),
        })) : [],
      };
      const line = JSON.stringify(short) + "\n";
      fs.appendFileSync("logs/arcjet.log", line);
      // also console.log for quick terminal visibility
      console.log("[Arcjet]", short.time, short.ip, short.method, short.path, "denied=", short.denied, "ttl=", short.ttl);
    } catch (logErr) {
      console.error("Failed to write arcjet log:", logErr);
    }

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed(),
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Test endpoint for admin user (for testing only)
app.post("/api/auth/test-admin", (req, res) => {
  res.json({
    success: true,
    user: { 
      id: 1, 
      name: "Test Admin", 
      email: "admin@test.com", 
      isAdmin: true 
    }
  });
});

async function initDB() {
  try{// Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          image VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
        );
        `;
    console.log("Database initialized");
  } catch (error) {
    console.log("Error in the initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
