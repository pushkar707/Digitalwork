import { Router, Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/JWT";
import User from "../models/User";
import { getAwsUploadLink } from "../utils/aws_s3";
import { ExtendedRequest, checkRefreshToken } from "../utils/middleware";

const router = Router()

router.post("/add",checkRefreshToken,async(req:ExtendedRequest,res:Response) => {
    const userId = req.userId    

    await User.findByIdAndUpdate(userId,req.body)
    return res.json({success:true,message:"User updated successfully"})
})

router.get("/image_upload_link", async (req:ExtendedRequest,res:Response) => {
    const {key} = req.query
    if(!key)
        return res.json({error:true, message:"No object key found"})

    const newKey = Date.now().toString() + key

    const signedUrl = getAwsUploadLink(newKey)
    return res.json({success:true, signedUrl, key:newKey}) 
})

router.get("/fees", checkRefreshToken, async(req:ExtendedRequest, res:Response) => {
    const userId = req.userId

    const user = await User.findById(userId,{isCommercialLicense:1, licenseCategories:1})
    if(!user)
        return 
    const fees:{[key:string]:number} = {"Learning Test Fees":150, "Service Fees":150}
    let total = 300

    if(user?.isCommercialLicense === true){
        fees['commercialLicense'] = 500
        total+=500
    }

    const {licenseCategories} = user
    licenseCategories.forEach(category => {
        fees[category + " test"] = 300
        total+=300
    });
    // console.log(fees);
    
    return res.json({success:true, fees,total})
})

module.exports = router