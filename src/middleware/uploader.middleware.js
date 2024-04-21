const multer = require('multer')

const myStorage = multer.diskStorage({

    
})

const uploader = multer({

    storage: myStorage,
    
})