const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Admin = require('./../model/adminProfile');
const Emp = require('./../model/employeeProfile');
exports.signUp = (admindetail) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(admindetail.password, 10, function (err, hash) {
            if (err) {
                reject({
                    status_code: 500,
                    error: true,
                    err_message: "server does not support"
                })
            }
            else {
                const admin = new Admin({
                    "username": admindetail.username,
                    "password": hash
                })
                admin
                    .save()
                    .then(result => {
                        resolve({
                            "status_code": 200,
                            "error": false,
                            "err_message": "",
                            "message": "admin successfuly signUp"
                        })
                    })
                    .catch(err => {
                        reject({
                            "status_code": 500,
                            "error": true,
                            "err_message": "server does not support"
                        })
                    })
            }
        });
    })
}
exports.logIn = (admindetail) => {
    return new Promise((resolve, reject) => {
        Admin
            .find({ "username": admindetail.username })
            .exec()
            .then(admin => {
                //   console.log("admin",admin);
                bcrypt.compare(admindetail.password, admin[0]['password'], function (err, res) {
                    if (err) {
                        reject({
                            status_code: 500,
                            error: true,
                            err_message: "server does not support"
                        })
                    }
                    else if (res) {
                        resolve(admin[0]["_id"]);
                    }
                    else {
                        reject({
                            "status_code": 401,
                            "error": false,
                            "err_message": "Unauthorised"
                        })

                    }
                });
            })
            .catch(err => {
                reject({
                    status_code: 500,
                    error: true,
                    err_message: "server does not support"
                })
            })
    })
}
exports.addEmp = (empDetail) => {
    console.log("come in details");
    return new Promise((resolve, reject) => {
        Emp
            .find({ emp_name: empDetail.emp_name })
            .exec()
            .then(result => {
                console.log("result", result);
                if (result.length > 0) {

                    reject({
                        status_code: 200,
                        error: true,
                        err_message: "emp already exist"
                    })
                }
                else {
                    bcrypt.hash(empDetail.password, 10, function (err, hash) {
                        if (err) {
                            reject({
                                status_code: 500,
                                error: true,
                                err_message: "server does not support"
                            })
                        }
                        else {
                            const emp = new Emp({
                                "emp_name": empDetail.emp_name,
                                "password": hash
                            })
                            emp
                                .save()
                                .then(result => {
                                    resolve({
                                        "status_code": 200,
                                        "error": false,
                                        "err_message": "",
                                        "message": "employee successfuly Registered"
                                    })
                                })
                                .catch(err => {
                                    reject({
                                        "status_code": 500,
                                        "error": true,
                                        "err_message": "server does not support"
                                    })
                                })
                        }
                    });
                }
            })
    })
}
exports.allEmp = () => {
    return new Promise((resolve,reject)=>{
        Emp
        .find()
        .exec()
        .then(result => {
            resolve({
                "status_code":200,
                "error":false,
                "err_message":"",
                "message":result
            })
          })
        .catch(err=>{
            reject({
                "status_code":500,
                "error":true,
                "err_message":"server does not support"
           })
      })
    })    
}
exports.searchbyAny=(empDetail)=>{
    return new Promise((resolve,reject)=>{
        var regex = new RegExp(["^", empDetail.data, "$"].join(""), "i");
        const query = {
            "$or": [
                { 'email': empDetail.data},
                { 'mobileNo': empDetail.data },        
                { '_id': empDetail.data },
                { 'designation': regex},
                {'designationDescription': regex}
            ]
        }
        Emp
        .find(query)
        .exec()
        .then(result=>{
            resolve({
                "status_code":200,
                "error":false,
                "err_message": "",
                "message": result
            })
        })
        .catch(err=>{
            reject({
                "status_code":500,
                "error":true,
                "err_message":"server does not support"
            })
        })
    })
}
exports.updateProfile=(empdetail,file)=>{
    return new Promise((resolve, reject) => {
        const query = {
            "$and": [
                {
                    email: empdetail.email
                },
                { "_id": { "$ne": empdetail.emp_id } }
            ]
        }
        Emp
            .find(query)
            .exec()
            .then(result => {
                if (result.length > 0) {
                    reject({
                        "status_code": 200,
                        "error": true,
                        "err_message": "email Already exist"
                    })
                }
                else {
                    var profileimage;
                    var workimages = [];
                    console.log(empdetail);
                    console.log(file);
                    if (file['image'] != undefined) {
                        var profile = uniqid();
                        profileimage = weburl + "/" + profile + ".jpg";
                        console.log(profileimage);
                        fs.writeFile(baseurl + "/" + profile + ".jpg", file['image'][0]['data'], (err, data) => {
                            if (err) {
                                reject({
                                    "status_code": 500,
                                    "error": true,
                                    "err_message": "Sorry file is not uploaded"
                                })
                            }
                        })
                    }
                    if (file['workimages'] != undefined) {
                        for (var i = 0; i < file['workimages'].length; i++) {
                            var k = uniqid();
                            workimages.push(weburl + "/" + k + ".jpg");
                            fs.writeFile(baseurl + "/" + k + ".jpg", file['workimages'][i]['data'], (err, data) => {
                                if (err) {
                                    reject({
                                        "status_code": 500,
                                        "error": true,
                                        "err_message": "Sorry file is not uploaded"
                                    })
                                }
                            })
                        }
                    }
                    const updatedAt = new Date().toString();
                    Emp
                        .updateMany(
                            { "_id": empdetail.emp_id },
                            {
                                $set: {
                                    "email": empdetail.email,
                                    "mobileno": empdetail.mobileno,
                                    "countrycode": empdetail.countrycode,
                                    "location": empdetail.location,
                                    "image": profileimage,
                                    "designation": empdetail.designation,
                                    "designationDescription": empdetail.designationDescription,
                                    "workimages": workimages,
                                    "updatedAt": updatedAt
                                }
                            })
                        .then(result => {
                            if (result.n > 0) {
                                resolve({
                                    "status_code": 200,
                                    "error": false,
                                    "error_message": "",
                                    "message": "employee profile is successfuly updated"
                                })
                            }
                            else {
                                reject({
                                    "status_code": 500,
                                    "error": true,
                                    "error_message": "Server does not support",
                                })
                            }
                        })
                }
            })
    })
}