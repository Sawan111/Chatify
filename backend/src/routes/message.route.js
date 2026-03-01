
import express from "express";

import { arcjetProtection } from "../middleWare/arcjet.middleware.js";

import {getAllContacts,getMessageByUserId,getChatPartners,sendMessage} from "../controllers/message.controller.js";



import { protectedRoute } from "../middleWare/auth.middleware.js";

const router=express.Router();

router.use(protectedRoute,arcjetProtection);


router.get("/contacts",getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id",getMessageByUserId);
router.post("/send/:id",sendMessage);


router.get("/send",(req,res)=>{
    res.json({message:"Message sent successfully"});
    res.send("Message sent successfully");
});

export default router;