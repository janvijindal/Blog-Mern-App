import express from "express";
import { signup,signin ,google} from "../controllers/auth.js";

//creating a router
const router=express.Router();

//creating api
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)



export default router;