import express from "express";
import { Signout, Update,deleteUser,getUsers,getUser } from "../controllers/user.js";
import { verifyToken } from "../util/verifyUser.js";

//creating a router
const router=express.Router();

//routes
router.post('/signout',Signout);
router.put('/update/:userId',verifyToken,Update);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);


export default router;