import express from "express";
const router=express.Router();

router.get("/signup",(req,res)=>{
    res.send("Sign up Endpoint");
});
router.get("/signin",(req,res)=>{
    res.send("Sign in Endpoint");
});


export default router;