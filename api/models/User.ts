import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:String,
    isFirebaseAuth:{
        type:Boolean,
        required:true
    },
    profileImageUrl:String
})

export default mongoose.model("User",userSchema)