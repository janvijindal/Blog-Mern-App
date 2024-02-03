import express from "express";
import {create,deletepost,updatepost,getposts} from '../controllers/post.js'
import { verifyToken } from '../util/verifyUser.js';


//creating a router
const router=express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

export default router;
