const fsPromises=require('fs').promises;
const path=require('path');
const bcrypt=require('bcrypt')
const pathToUsersDB=path.resolve(__dirname, '../database/usersDB.json')
const usersDB={
    users: require('../models/usersModel'),
    setUsers: function (data){this.users=data}
}

const handleNewUser= async (req, res)=>{
    const {user, pwd, rePwd}=req.body
    if(!user||!pwd||!rePwd) return res.status(400).json({'message': 'username amd password are required.'})
    if(pwd!=rePwd) return res.status(400).json({'message': 'passwords dont match.'})
    
    const duplicate =usersDB.users.find(person=>person.username===user)
    if(duplicate) res.status(409);//conflict
    try{
        const hashedPwd=await bcrypt.hash(pwd, 10);
        const newUser={"userName":user, "password": hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser])
        fs.writeFileSync(pathToUsersDB, JSON.stringify(usersDB))
        console.log(usersDB.users)
        res.status(201).json({'success':`newuser ${user} created!`})

    }catch(err){   
    console.log(err)
    res.status(500).json({'message': err.message})
}


}
module.exports={handleNewUser}