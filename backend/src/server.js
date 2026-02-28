import express from "express";
import cooksParser from "cookie-parser";

import path from "path";
import cors from "cors";

import {ENV} from "./lib/env.js";
import {connectDB} from "./lib/db.js"

import authRoutes from "./routes/auth.route.js";


const PORT = ENV.PORT;
const app=express();





const __dirname=path.resolve();
console.log(ENV.PORT);


// req body
app.use(express.json()); 
app.use(cooksParser());




app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatifynew-beta.vercel.app",
    "https://gupshup-ci52.onrender.com"
  ],
  credentials: true
}));

app.use("/api/auth",authRoutes); 
//make ready for deployment
if (ENV.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

}
app.get("/", (req, res) => {
  res.send("Chatify Backend Running 🚀");
});

app.listen(PORT,()=>{
   console.log("Server running on the port 3000")
   connectDB()
});