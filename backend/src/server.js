import express from "express";
import dotenv from "dotenv";
import path from "path";
import {connectDB} from "./lib/db.js"

import authRoutes from "./routes/auth.route.js";
dotenv.config();
const PORT = process.env.PORT;
const app=express();
import cors from "cors";

app.use(cors({
  origin: "https://chatiapp-tau.vercel.app",
  credentials: true
}));


const __dirname=path.resolve();
console.log(process.env.PORT);
const API = import.meta.env.VITE_API_URL;

axios.post(`${API}/api/auth/signup`, data);
console.log(import.meta.env.VITE_API_URL);


app.use("/api/auth",authRoutes); 
//make ready for deployment
if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

}

app.listen(PORT,()=>{
   console.log("Server running on the port 3000")
   connectDB()
});