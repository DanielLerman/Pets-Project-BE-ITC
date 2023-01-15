const User=require('../database/Users');

const handleLogOut =async(req,res)=>{
    console.log('logoutttttt')
    const cookies=req.cookies;
    console.log(cookies)
    if(!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken=cookies.jwt;

//is their any refersh toke in db
    const foundUser=await User.findOne({refreshToken}).exec();
    
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true , sameSite:'None', secure: true});
        return res.sendStatus(204);
    }
 console.log("found a user")
    //delete refreshToken in db
    foundUser.refreshToken='';
    //save the changing
    const result=await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure:true});
    res.sendStatus(204);

}
module.exports={handleLogOut}