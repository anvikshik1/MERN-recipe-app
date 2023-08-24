import jwt from 'jsonwebtoken'
import express from 'express'
import bcrypt from 'bcrypt'
import { userModel } from '../models/Users.js';
import generateToken from '../middleware/generateToken.js';


const router = express.Router();

router.post("/logout", (req,res) => {
    res.cookie('jwt', "" ,{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'User logged out'})
})

router.post("/register", async (req,res) =>{
    const {username,password} = req.body;
    const userExist = await userModel.findOne({username})

    if(userExist){
        return res.status(400).json("User already exist");
    }

    const hashedPasswd = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        password:hashedPasswd
    })

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            username:user.username,
        })
    }else{
        res.status(400).json("Invalid user data")
    }
})

router.get("/allusers", async (req,res) =>{
    const user = await userModel.find({})
    res.status(200).json(user)
})

router.post("/login", async (req,res) =>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username})
    if(!user) return res.json("User doesn't exist!");
    const isPasswdValid = await bcrypt.compare(password,user.password);
    if(user && isPasswdValid){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            username:user.username,
            password:user.password,
        })
    }else{
        res.status(401).json("Invalid email or password") 
    }
})

export {router}
