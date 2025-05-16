const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await user
      .findOne({ email: isVerified.email })
      .select({ password: 0 }); //pass ko chhodkr baki field ka data milega
    console.log(userData);

      
    req.user = userData; //ye data auth controller me jaega
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invallid token" });
  }
};

module.exports = authMiddleware;
