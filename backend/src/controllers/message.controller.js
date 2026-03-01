import Message from "../models/Message.js";
import User from "../models/User.js";

import cloudinary from "../lib/cloudinary.js";


export const getAllContacts=async(req,res)=>{
    try {
        //fetch all users except the current user
       const loggedInUserId=req.user._id;
       const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
        } 
    catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({message:"Failed to fetch contacts"});

    }
};

export const getMessageByUserId=async(req,res)=>{
    try {
        const myId=req.user._id;
        const {id:userTochatId}=req.params;
        const messages=await Message.find({
            $or:[
                {sender:myId,recipient:userTochatId},
                {sender:userTochatId,recipient:myId},
            ]
            });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({message:"Failed to fetch messages"});
    }
};
export const sendMessage=async(req,res)=>{
    try {
        const {text,image,video,audio}=req.body;
        const senderId=req.user._id;
        const {id:recierverId}=req.params;

      
        let imageUrl;
        let videoUrl;
        let audioUrl;
        if(image){
            const uploadResult=await cloudinary.uploader.upload(image,{folder:"chatify"});
            imageUrl=uploadResult.secure_url;
        }
        if(video){
            const uploadResult=await cloudinary.uploader.upload(video,{folder:"chatify"});
            videoUrl=uploadResult.secure_url;
        }
        if(audio){
            const uploadResult=await cloudinary.uploader.upload(audio,{folder:"chatify"});
            audioUrl=uploadResult.secure_url;
        }
        const newMessage=new Message({
            senderId,
            recierverId,
            text,
          
            image:imageUrl,
            video:videoUrl,
            audio:audioUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);

       
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({message:"Failed to send message"});
    }
};
export const getChatPartners=async(req,res)=>{
    try {
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId},
                {recierverId:myId},
            ]
        });
        const chatPartnersId=[
            ...new Set(messages.map(msg=>
          msg.senderId.toString()===myId.toString()
          ?msg.recierverId.toString()
          :msg.senderId.toString()
                  )
            )
         ];
     const chatPartners=await User.find({_id:{$in:chatPartnersId}}).select("-password");
    
      res.status(200).json(chatPartners);
     }catch (error) {
        console.error("Error fetching chat partners:", error);
        res.status(500).json({message:"Failed to fetch chat partners"});
    }
};