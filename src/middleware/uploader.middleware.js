const multer = require('multer')
const fs = require('fs')

const setPath = (path) => {
    return (req,res,next) => {
        req.uploadDir =  path
        next()
    }

}

const myStorage = multer.diskStorage({

    destination : (req,file,cb) => {

        const path = "./public/uploads"+req.uploadDir
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }

        cb(null, path)
    },

})

const uploader = multer({

    storage: myStorage,
    
})