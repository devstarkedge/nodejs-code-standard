var express = require('express');
var router = express.Router();
const Empcontroller = require('./../controller/employee');
const Empvalidation = require('./../validation/employee');
const Emp = require('./../middleware/emp');

router.post("/logIn", Empvalidation.logIn, Empcontroller.logIn);

router.post('/UpdateProfile', Empvalidation.updateProfile, Emp, Empcontroller.updateProfile);

router.post('/showProfile', Emp, Empcontroller.showProfile);

module.exports = router;