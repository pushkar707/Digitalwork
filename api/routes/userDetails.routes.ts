import { Router, Request, Response } from "express";
import { verifyJwtToken } from "../utils/JWT";
import User from "../models/User";
import { getAwsUploadLink } from "../utils/aws_s3";

const router = Router()

router.post("/add",async(req:Request,res:Response) => {
    const {refreshToken} = req.body
    if(!refreshToken)
        return res.json({error:true,message:"No refresh token found"})

    const userId = verifyJwtToken(refreshToken)
    if(!userId)
        return res.json({error:true, message:"Refresh token could not be verified"})

    delete req.body.refreshToken

    console.log(req.body);
    

    await User.findByIdAndUpdate(userId,req.body)
    return res.json({success:true,message:"User updated successfully"})
})

router.get("/image_upload_link", async (req:Request,res:Response) => {
    const {key} = req.query
    if(!key)
        return res.json({error:true, message:"No object key found"})

    const newKey = Date.now().toString() + key

    const signedUrl = getAwsUploadLink(newKey)
    return res.json({success:true, signedUrl, key:newKey})
        
})

module.exports = router