import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads')
    },
    filename:function(req,file,cb){
        file.filename = "avatar"
        cb(null,  Date.now()+'-'+ file.filename+'.jpg')
    }
})

const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
export const upload = multer({storage: storage, fileFilter:fileFilter})