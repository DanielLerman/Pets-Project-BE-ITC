const User = require("../database/Users");
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res,next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  try{
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.userId !== decoded._id) return res.sendStatus(403); 
      // res.send({ ok: true, userName: foundUser.fullName });
      next()
    })
  }catch(err){console.log(err)}
};
module.exports = { verifyJwt };