import express from "express"
import { getAllProducts } from "../controllers/productControllers.js";
import { createProducts } from "../controllers/productControllers.js";
const router = express();

router.get("/", getAllProducts); 

router.post("/", createProducts);

export default router;


