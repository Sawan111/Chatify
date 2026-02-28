import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";


export const protectedRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
         if(!decoded || !decoded.userId){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectedRoute middleware:", error.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};