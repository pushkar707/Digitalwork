import jwt from "jsonwebtoken"

export default (tokenInput:string) => {
    return jwt.sign(tokenInput, process.env.JWT_SECRET_KEY || "rtdiufkdsfwaPSL");
}