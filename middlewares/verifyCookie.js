const User = require("../database/Users");
const jwt = require("jsonwebtoken");
///middleware to check users access
const handleRefrershToken = async (req, res, next) => {
  const cookies = req.cookies;
  console.log(req.cookies)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded)
      if (err || foundUser.userId !== decoded._id) return res.sendStatus(403); 
      next()
    })
}

  module.exports = { handleRefrershToken }