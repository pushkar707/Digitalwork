import express,{Request,Response} from "express"
import User from "./models/User"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

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
    if(!isFirebaseAuth){
        password = bcrypt.hashSync(password,8)
        await User.create({email,password,isFirebaseAuth:false})
    }else{
        await User.create({email,isFirebaseAuth:true,profileImageUrl})
    }
})
 
const PORT = process.env.PORT || 8000

app.listen(PORT,() =>{
    console.log("Listening on port "+PORT);
})