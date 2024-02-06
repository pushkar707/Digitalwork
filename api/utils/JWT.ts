import jwt from "jsonwebtoken"

export const getJwtToken = (tokenInput:any) => {
    return jwt.sign(tokenInput, process.env.JWT_SECRET_KEY || "rtdiufkdsfwaPSL");
}

export const verifyJwtToken = (token:string) => {
    try{
        const tokenValue = jwt.verify(token, process.env.JWT_SECRET_KEY || "rtdiufkdsfwaPSL")
        return tokenValue
    }catch(e:any){
        if(e.name === "JsonWebTokenError")
            return null
    }
}