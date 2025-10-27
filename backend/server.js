import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json()) // for parsing incoming data
app.use(cors()); // handles cors errors
app.use(helmet()); // security middleware 
app.use(morgan("dev")); // logs the requests 

app.get("/test", (req,res) => {
    console.log(res.getHeaders());
    res.send("Hello from the test route");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});