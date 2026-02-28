import express from "express";

import { arcjetProtection } from "../middleWare/arcjet.middleware.js";

import { updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleWare/auth.middleware.js";
import {signup,login ,logout} from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",arcjetProtection,login);


router.post("/logout",logout);
router.put("/updateProfile",protectedRoute,updateProfile);
router.get("/check", protectedRoute,(req,res)=>res.status(200).json(req.user));


export default router;