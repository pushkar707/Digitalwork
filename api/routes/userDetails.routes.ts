import { Router, Request, Response } from "express";
import { verifyJwtToken } from "../utils/JWT";
import User from "../models/User";

const router = Router()

router.post("/add",async(req:Request,res:Response) => {
    const {refreshToken} = req.body
    if(!refreshToken)
        return res.json({error:true,message:"No refresh token found"})

    const userId = verifyJwtToken(refreshToken)
    if(!userId)
        return res.json({error:true, message:"Refresh token could not be verified"})

    delete req.body.refreshToken

    await User.findByIdAndUpdate(userId,req.body)
    return res.json({success:true,message:"User updated successfully"})
})

module.exports = router