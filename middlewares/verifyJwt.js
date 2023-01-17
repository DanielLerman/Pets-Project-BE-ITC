// const jwt=require('jsonwebtoken');
// const User = require("../database/Users");

// const verifyJWT=async (req,res)=>{
//     console.log(req.cookies)
    // const authHeader=req.headers.authorization || req.headers.Authorization;
    // if(!authHeader?.starstWith('Bearer ')) return res.sendStatus(401);
    // console.log(authHeader);
    // const token =authHeader.split(' ')[1];
    // jwt.verify(
    //     token, 
    //     process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded)=>{
    //         if(err) return res.sendStatus(403);//invalid token
    //         req._id=decoded._id;
    //         req.roles=decoded.userInfo.roles 
    //         next()
    //     }
    // )
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);
//     const refreshToken = cookies.jwt;
//     const foundUser = await User.findOne({ refreshToken }).exec();
//     if (!foundUser) return res.sendStatus(403);
//     try{
//       jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//         if (err || foundUser.userId !== decoded._id) return res.sendStatus(403); 
//         res.send({ ok: true, userName: foundUser.fullName });
//         return true
//       })
//     }catch(err){console.log(err)}
     
// }

// module.exports=verifyJWT;


const User = require("../database/Users");
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res,next) => {
  console.log("this is th cookiesss", req.cookies)

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
module.exports = { verifyJwt };