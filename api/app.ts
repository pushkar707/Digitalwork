import express,{Request,Response} from "express"
import User from "./models/User"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import getJwtToken from "./utils/getJwtToken"

dotenv.config()

mongoose.connect(process.env.MONGO_DB_URI || "mongodb://localhost:27017/learner_license")
.then(() => {
    console.log("Connected to mongoose");
}).catch(() => {
    console.log("Could not connect to mongoose");  
})

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/register",async (req:Request,res:Response) => {
    let {email,password,isFirebaseAuth,profileImageUrl} = req.body
    if(!email.length || !password.length)
        return res.json({error:true,message:"Missing required fields"})
    let user
    try {
        if(!isFirebaseAuth){
            password = bcrypt.hashSync(password,8)
            user = await User.create({email,password,isFirebaseAuth:false})
        }else{
            user = await User.create({email,isFirebaseAuth:true,profileImageUrl})
        }
        return res.json({success:true,refreshToken:getJwtToken(user.id)})
    } catch (error:any) {
        console.log(error);
        if(error.code == 11000){
            return res.json({error:true,message:"User with given email already exists"})
        }
        return res.json({error:true,message:error.message})
    }
})

app.post("/login",async (req:Request,res:Response) => {
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
 
const PORT = process.env.PORT || 8000

app.listen(PORT,() =>{
    console.log("Listening on port "+PORT);
})