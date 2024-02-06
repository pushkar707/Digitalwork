import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    name:String,
    password:String,
    isFirebaseAuth:{
        type:Boolean,
        required:true
    },
    profileImageUrl:String
})

export default mongoose.model("User",userSchema)