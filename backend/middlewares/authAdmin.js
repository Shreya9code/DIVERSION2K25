import jwt from 'jsonwebtoken';

//admin auth middleware
const authAdmin =async (req, res, next) => {
    try {
        //get token from header
        const atoken = req.headers["atoken"] || req.headers["aToken"];
        //check if token exists
        if (!atoken) {
            return res.status(401).json({success:false, message: "No token, authorization denied" });
        }
        //verify token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decoded!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false, message: "Not authorized,Token is not valid" });
        }
        //add user from payload
        //req.admin = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success:false ,message: "Token is not valid" });
    }
}
export default authAdmin;