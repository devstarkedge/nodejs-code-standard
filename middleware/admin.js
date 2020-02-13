const jwt = require('jsonwebtoken');
const Joi=require('joi');

module.exports = (req, res, next) => {
    console.log("token",req.headers);
     const schema = Joi.object().keys({
        authorization : Joi.string().required()
    }).unknown();
    const { error, value }=Joi.validate(req.headers,schema);
    if(error){
        return res.status(400).json({
            "status_code": 400,
            "error": true,
            "err_message": error.details[0].message.replace(/\\"/g)
        })
    }
    else{
      jwt.verify(req.headers.authorization, process.env.JWTKEY, function(err, decoded) {
        console.log("decoded",decoded);
        if(err || decoded.type!="admin"){
            return res.status(401).json({
                "status_code": 401,
                "error": false,
                "err_message":"Unauthorised"
            })
        }
       // console.log("decoded",decoded);
      else if(decoded.type=="admin"){
          console.log("come in  this ")
       next();
      }   
    });
 }   
}