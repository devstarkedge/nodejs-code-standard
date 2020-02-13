const mongoose=require('mongoose');
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
})
module.exports = mongoose.model('admin', adminSchema);