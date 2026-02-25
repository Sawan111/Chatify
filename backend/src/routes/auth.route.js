import express from "express";
import {signup} from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",signup);

router.get("/signin",(req,res)=>{
    res.send("Sign in Endpoint");
});


export default router;