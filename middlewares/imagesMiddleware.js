const multer=require('multer');
const path=require('path')
const pathToImage=path.resolve(__dirname,'../images')
const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')

const diskStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, pathToImage);
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null, file.fieldname+'-'+uniqueSuffix + path.extname(file.originalname ))
    }
});

cloudinary.config({ 
    cloud_name: 'dcacgmhyz', 
    api_key: '863813231582781', 
    api_secret: 'p6VrtZwLYRXrSZ685fbAcVHwE50' 
  });

const cloudStorage= new CloudinaryStorage({
    cloudinary: cloudinary,
    filename:function(req,res,cb){
        const uniqueSuffix=Data.now()+'-'+Math.round(Math.random()*1e9);
        cb(null, file.fieldname+'-'+uniqueSuffix + path.extname(file.originalname ))
    }
})


const generateUrl=(req,res,next)=>{
    const imageUrl=req.file.path;
    req.body.imageUrl=imageUrl;
    next();

}

const upload=multer({storage:cloudStorage});
module.exports={upload, generateUrl}