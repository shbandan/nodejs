const mongoose = require('mongoose');

const UserDetailSchema = mongoose.Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    isactive: Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('UserDetail', UserDetailSchema);