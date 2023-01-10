const User=require('../database/Users');

const handleLogOut =async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken=cookies.jwt;

//is their any refersh toke in db
    const foundUser=await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true , sameSite:'None', secure: true});
        return res.sendStatus(204);
    }

    //delete refreshToken in db
    foundUser.refreshToken='';
    //save the changing
    const result=await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure:true});
    res.sendStatus(204);

}
module.exports={handleLogOut}