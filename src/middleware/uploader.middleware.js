const multer = require('multer')
const fs = require('fs')
const { generateRandomString } = require('../utilities/helpers')

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

    filename: (req,file,cb) => {

        
    }

})

const uploader = multer({

    storage: myStorage,
    
})