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
    mobileNumber: String,
    fatherName:String,
    aadharnumber:{
        type: String,
        unique: true,
    },
    dob:String,
    state:String,
    category:String,
    bloodGroup:String,
    gender:String,
    addressLine1:String,
    addressLine2:String,
    pincode:String,

    licenseCategories:[String],
    selfDeclationFilled:Boolean,
    isCommercialLicense:Boolean,
    isDonatingOrgans: Boolean,

    aadharImageKey:String,
    profileImageKey: String,
    signatureImageKey: String,

    feesPaid: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User",userSchema)