const UserDetail = require('../models/userdetail.model.js');

exports.create = (req,res) => {
    if(!req.body.username) {
        return res.status(400).send({
            message: "UserDetail content can not be empty"
        });
    }

    const userDetail = new UserDetail({
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        isactive: req.body.isactive
    });

    userDetail.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creaint user."
            });
        });
};

exports.findAll = (req,res) => {
    UserDetail.find()
        .then(userdetails => {
            res.send(userdetails);
        }).catch(err => {
            res.status(500).send({
                message: error.message || "Error occured while retriveing user details."
            });
        });
};

exports.findOne = (req,res) => {
    UserDetail.findById(req.params.userid)
        .then(userdeta => {
            if(!userdeta) {
                return res.status(404).send({
                    message : "Request user detail not found for id: " + req.params.userid
                });            
            }
            res.send(userdeta);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message : "Request user detail not found for id: " + req.params.userid
                });                
            }
            return res.status(500).send({
                message : "Error while fetching requesed user id : " + req.params.userid
            });
        });
};

exports.update = (req,res) => {

};

exports.delete = (req,res) => {
    
};