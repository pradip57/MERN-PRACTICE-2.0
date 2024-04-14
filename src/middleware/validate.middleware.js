const bodyValidator = (schema) => {

return async  (req,res,next) => {
try{
    const data = req.body
    await schema.validateAsync(data,{abortEarly:false})
    next()
        
    }catch(exception){
        next(exception)
    }
}

}


module.exports = {bodyValidator}