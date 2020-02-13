const empModel = require('./../model/employee');
const jwt = require('jsonwebtoken');
exports.logIn = (req, res, next) => {
    empModel
        .logIn(req.body).then(result => {
            const token = jwt.sign({ "id": result, "type": "emp" }, process.env.JWTKEY, { expiresIn: '365d' })
            return res.status(200).json({
                "status_code": 200,
                "error": false,
                "err_message": "",
                "message": "Authentication Successful",
                "token": token
            })
        })
        .catch(err => {
            return res.status(err.status_code).json(err);
        })
}
exports.updateProfile = (req, res, next) => {
    empModel
        .updateProfile(req.empData, req.body, req.files)
        .then(result => {
            return res.status(result.status_code).json(result);
        })
        .catch(err => {
            return res.status(err.status_code).json(err);
        })
}
exports.showProfile = (req, res, next) => {
    empData
        .showProfile(req.empData)
        .then(result => {
            return res.status(result.status_code).json(result);
        })
        .catch(err => {
            return res.status(err.status_code).json(err);
        })
}
