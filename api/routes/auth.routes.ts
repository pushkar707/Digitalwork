import {Router,Request,Response} from "express";
import bcrypt from "bcrypt"
import {getJwtToken, verifyJwtToken} from "../utils/JWT"
import User from "../models/User"

const router = Router();

router.post("/register",async (req:Request,res:Response) => {
    let {email,password} = req.body
    if(!email.length || !password.length)
        return res.json({error:true,message:"Missing required fields"})
    let user
    try {
        password = bcrypt.hashSync(password,8)
        user = await User.create({email,password,isFirebaseAuth:false})
        return res.json({success:true,refreshToken:getJwtToken(user.id)})
    } catch (error:any) {
        console.log(error);
        if(error.code == 11000){
            return res.json({error:true,message:"User with given email already exists"})
        }
        return res.json({error:true,message:error.message})
    }
})

router.post("/login",async (req:Request,res:Response) => {
    const {email,password} = req.body;
    try{
        if(!email.length || !password.length)
            return res.json({error:true,message:"Missing required fields"})

        const user = await User.findOne({email},{password:1})
        if(!user)
            return res.json({error:true,message:"Invalid Credentials"})

        const isPasswordCorrect = bcrypt.compareSync(password, user.password || "")
        if(isPasswordCorrect)
            return res.json({success:true, refreshToken:getJwtToken(user.id)})
        
        return res.json({error:true,message:"Invalid Credentials"})
    }catch (e:any) {
        console.log(e);        
        return res.json({error:true,message:e.message})
    }
})

router.post("/firebase",async(req:Request,res:Response) => {
    const {email,name} = req.body
    try{
        const user = await User.create({email,isFirebaseAuth:true,name})
        return res.json({success:true,"refreshToken":getJwtToken(user.id)})
    }
    catch (error:any) {
        console.log(error);
        if(error.code == 11000){
            const user = await User.findOne({email},{id:1})
            console.log(user);
            if(user)           
                return res.json({success:true,"refreshToken":getJwtToken(user.id)})
        }
        return res.json({error:true,message:error.message})
    }
})
 
router.get("/verify",async (req:Request,res:Response) => {
    const {refreshToken} = req.query
    if(!refreshToken)
        return res.json({error:true,message:"No refresh token provided"})
    
    // @ts-ignore
    const userId = verifyJwtToken(refreshToken)    
    if(userId){
        const user = await User.findById(userId,{password:0,isFirebaseAuth:0,_id:0})
        if(!user)
            return res.json({error:true,message:"No user found with given token"})

        return res.json({success:true,user})
    }
    return res.json({error:true,message:"Invalid Token"})
})

module.exports = router