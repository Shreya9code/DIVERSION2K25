import jwt from "jsonwebtoken";

//doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Debugging log*/
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    console.log("Extracted Token:", token); // Debugging log
 if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }
   
    /*
    
    //check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }*/
    //verify token
    console.log("Token Before Verification:", token);
    console.log("JWT Secret at Verification:", process.env.JWT_SECRET);
    const decodedBefore = jwt.decode(token, { complete: true });
    console.log("Decoded Token Before Verification:", decodedBefore);
//verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.docId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};
export default authDoctor;
