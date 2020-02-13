var express = require('express');
var router = express.Router();
const admincontroller = require('./../controller/admin');
const adminvalidation = require('./../validation/admin');
const Admin = require('./../middleware/admin');
const empvalidation=require('./../validation/employee');


router.post('/signUp', adminvalidation.logIn, admincontroller.signUp);

router.post('/logIn', adminvalidation.logIn, admincontroller.logIn);

router.post('/addEmp', adminvalidation.addEmp, Admin, admincontroller.addEmp);

router.post('/allEmp',Admin,admincontroller.allEmp)

router.post('/searchbyAny', Admin, admincontroller.searchbyAny);

router.post('/updateEmpProfile', adminvalidation.updateEmpProfile, Admin, admincontroller.updateEmpProfile)

module.exports = router;
