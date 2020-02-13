const Emp = require('./employeeProfile');
const bcrypt = require('bcrypt');
const fs = require('fs');
const uniqid = require('uniqid');
const baseurl = './../adminparsan/public/images';
const weburl = "http://localhost:13000";
exports.logIn = (empdetail) => {
    return new Promise((resolve, reject) => {
        Emp
            .find({ "emp_name": empdetail.emp_name })
            .exec()
            .then(emp => {
                bcrypt.compare(empdetail.password, emp[0]['password'], function (err, res) {
                    if (err) {
                        reject({
                            status_code: 500,
                            error: true,
                            err_message: "server does not support"
                        })
                    }
                    else if (res) {
                        resolve(emp[0]["_id"]);
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
exports.updateProfile = (emp_id, empdetail, file) => {
    return new Promise((resolve, reject) => {
        const query = {
            "$and": [
                {
                    email: empdetail.email
                },
                { "_id": { "$ne": emp_id } }
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
                            { "_id": emp_id },
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
exports.showProfile = (emp_id) => {
    return new Promise((resolve, reject) => {
        Emp
            .find({ "_id": emp_id })
            .exec()
            .then(result => {
                resolve({
                    "status_code": 200,
                    "error": false,
                    "err_message": "",
                    "message": result[0]
                })
            })
            .catch(err => {
                reject({
                    "status_code":500,
                    "error": true,
                    "err_message": "",
                    "message": "server does not support"
                })
            })
    })
}
