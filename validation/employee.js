const Joi = require('joi');
exports.logIn = (req, res, next) => {
    const schema = Joi.object().keys({
        emp_name: Joi.string().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,20}$/)
    })
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
        return res.status(400).json({
            "status_code": 400,
            "error": true,
            "err_message": error.details[0].message.replace(/\\"/g)
        })
    }
    //console.log("helo");
    next();
}
exports.updateProfile = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        countrycode: Joi.string().regex(/^([0|\+[0-9]{1,5})$/).required(),
        mobileno: Joi.string().regex(/^[7-9][0-9]{9}$/).required(),
        location: Joi.string().required(),
        designation:Joi.string().required(),
        designationDescription:Joi.string().required()
   }).unknown();
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
        return res.status(400).json({
            "status_code": 400,
            "error": true,
            "err_message": error.details[0].message.replace(/\\"/g)
        })
    }
    next();
}
exports.updateEmpProfile = (req,res,next)=>{
    
}