import { Router, Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/JWT";
import User from "../models/User";
import { getAwsUploadLink } from "../utils/aws_s3";
import { ExtendedRequest, checkRefreshToken } from "../utils/middleware";

const router = Router()

router.post("/add",checkRefreshToken,async(req:ExtendedRequest,res:Response) => {
    const userId = req.userId
    console.log("Route accessed");    

    await User.findByIdAndUpdate(userId,req.body)
    return res.json({success:true,message:"User updated successfully"})
})

router.get("/all",checkRefreshToken,  async(req:ExtendedRequest, res:Response) => {
    const userId = req.userId

    const user = await User.findById(userId)
    if(!user)
        return

    return res.json({success:true, user})
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
    
    return res.json({success:true, fees,total})
})

router.put("/takeTest", checkRefreshToken, async(req:ExtendedRequest, res:Response) => {
    const userId = req.userId
    const user = await User.findById(userId,{learningTestFeesPaid:1, testTaken:1, profileImageKey:1, name:1})
    if(!user)
        return

    if(!user.learningTestFeesPaid)
        return res.json({success:false,feesPaid: false, message: "Fees for the test has not been paid"})

    user.testTaken = true
    user.learningTestFeesPaid = false
    await user.save()
    const {profileImageKey, name} = user
    return res.json({success:true,message:"User's test attempt recorded",profileImageKey,name})
})

router.put("/testResults", checkRefreshToken, async (req:ExtendedRequest, res:Response) => {
    const userId = req.userId
    const {testPassed} = req.body
    await User.findByIdAndUpdate(userId, {testPassed})
    return res.json({success:true, message: "User updated"})
})

module.exports = router