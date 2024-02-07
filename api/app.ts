import express,{Request,Response} from "express"

import cors from "cors"
import dotenv from "dotenv"
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

app.use('/auth',require("./routes/auth.routes"))
app.use("/user/details",require("./routes/userDetails.routes"))

const PORT = process.env.PORT || 8000

app.listen(PORT,() =>{
    console.log("Listening on port "+PORT);
})