const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    emp_name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    mobileNo: {
        type: String,
        trim: true,
    },
    countryCode: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    designationDescription:{
        type: String,
        trim: true
    },
   workimages:{
       type:Array
   },
   updatedAt:{
     type: String,
     trim: true
   }
})
module.exports = mongoose.model('emp', empSchema);