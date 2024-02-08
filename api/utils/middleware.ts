import { NextFunction, Response , Request} from "express";
import { verifyJwtToken } from "./JWT"

export interface ExtendedRequest extends Request {
    userId?: string;
}

export const checkRefreshToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let {refreshToken} = req.body
    if(!refreshToken)
        refreshToken = req.query.refreshToken
    if(!refreshToken)
        return res.json({error:true,message:"No refresh token found"})

    const userId = verifyJwtToken(refreshToken)
    if(!userId)
        return res.json({error:true, message:"Refresh token could not be verified"})

    delete req.body.refreshToken 
    req.userId = (userId as string);
    next();
  }