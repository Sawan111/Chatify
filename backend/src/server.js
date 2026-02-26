import express from "express";

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

app.use("/api/auth",authRoutes); 
//make ready for deployment
if (ENV.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

}

app.listen(PORT,()=>{
   console.log("Server running on the port 3000")
   connectDB()
});