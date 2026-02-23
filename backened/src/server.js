import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
dotenv.config();
const PORT = process.env.PORT;
const app=express();
console.log(process.env.PORT);


app.use("/api/auth",authRoutes); 

app.listen(PORT,()=>console.log("Server running on the port ok 3000"));