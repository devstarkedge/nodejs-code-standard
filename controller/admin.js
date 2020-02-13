const adminModel = require('./../model/admin');
const jwt = require('jsonwebtoken');
require('dotenv').load();
exports.signUp = (req, res, next) => {
    console.log("req", req.body);
    adminModel
        .signUp(req.body).then(result => {
            console.log(result);
            /* const token=jwt.sign({"id":result},process.env.JWTKEY,{expiresIn: '365d'}) 
             return res.status(200).json({
                 "status_code": 200,
                 "error":false,
                 "err_message": "",
                 "message": "Authentication Successful",
                 "token":token
             }) */
        })
        .catch(failed => {
            console.log(failed)
            /*return res.status(failed.status_code).json(failed);*/
        })
}
exports.logIn = (req, res, next) => {
    adminModel
        .logIn(req.body).then(result => {
            const token = jwt.sign({ "id": result, "type": "admin" }, process.env.JWTKEY, { expiresIn: '365d' })
            return res.status(200).json({
                "status_code": 200,
                "error": false,
                "err_message": "",
                "message": "Authentication Successful",
                "token": token
            })
        })
        .catch(failed => {
            return res.status(failed.status_code).json(failed);
        })
}
exports.addEmp = (req, res, next) => {
    //console.log("hey")
    adminModel
        .addEmp(req.body)
        .then(result => {
            return res.status(result.status_code).json(result);
        })
        .catch(err => {
            return res.status(err.status_code).json(err);
        })
}

exports.allEmp = (req, res, next) => {
    adminModel
        .allEmp()
        .then(result => {
            return res.status(result.status_code).json(result);
        })
        .catch(err => {
            return res.status(err.status_code).json(err);
        })
}
exports.searchbyAny = (req, res, next) => {
    adminModel
       .searchbyAny(req.body)
       .then(result=>{
           return res.status(result.status_code).json(result);
       })
       .catch(err =>{
           return res.status(err.status_code).json(err);
       })
}
exports.updateEmpProfile=(req,res,next)=>{
    adminModel
    .updateProfile(req.body,req.files)
    .then(result=>{
        return res.status(result.status_code).json(result);
    })
    .catch(err =>{
        return res.status(err.status_code).json(err);
    })
}