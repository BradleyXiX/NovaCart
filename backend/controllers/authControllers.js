import bcrypt from "bcryptjs";
import { sql } from "../config/db.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Please provide name, email and password" 
        });
    }

    if (password.length < 6) {
        return res.status(400).json({ 
            success: false, 
            message: "Password must be at least 6 characters" 
        });
    }

    try {
        // Check if user already exists
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (existingUser.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already in use" 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (default to non-admin)
        const newUser = await sql`
            INSERT INTO users (name, email, password, is_admin)
            VALUES (${name}, ${email}, ${hashedPassword}, false)
            RETURNING id, name, email, is_admin as "isAdmin"
        `;

        res.status(201).json({ 
            success: true, 
            message: "Account created successfully",
            user: newUser[0]
        });
    } catch (error) {
        console.log("Error in signup", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Please provide email and password" 
        });
    }

    try {
        // Find user by email
        const user = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (user.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        const userRecord = user[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, userRecord.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        // Return user data (excluding password)
        res.status(200).json({ 
            success: true, 
            message: "Signed in successfully",
            user: {
                id: userRecord.id,
                name: userRecord.name,
                email: userRecord.email,
                isAdmin: userRecord.is_admin
            }
        });
    } catch (error) {
        console.log("Error in signin", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
