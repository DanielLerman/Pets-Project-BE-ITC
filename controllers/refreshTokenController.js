const User = require("../database/Users");
const jwt = require("jsonwebtoken");

const handleRefrershToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  try{
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.userId !== decoded._id) return res.sendStatus(403); 
      console.log("good")
    })
  }catch(err){console.log(err)}

 // req.body.userId =

  // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    
    
  //   if (err || foundUser.userId !== decoded._id) return res.sendStatus(403);
  //   const roles = Object.values(foundUser.role);
  //   const accessToken = jwt.sign(
  //     {
  //       userInfo: {
  //         email: decoded.email,
  //         roles: roles,
  //       },
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: "30s" }
  //   );
  //   res.json(accessToken);

  // });
};
module.exports = { handleRefrershToken };
