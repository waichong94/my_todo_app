const {User} = require("../models");
const jwt    = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

// Function to validate password
async function validatePassword(encryptedPassword, enteredPassword, key = "secret_todo_app") {
    
}

exports.signup = async (req,res) => {
    const {username, password, email} = req.body;
    const encryptPassword = await CryptoJS.AES.encrypt(password, "secret_todo_app").toString();
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: encryptPassword
          });
           
        const data = {
            user: {
                uid: user.id
            }
        }
    
        const token = await jwt.sign(data, "secret_todo_app");
        user.token = token;
        return res.status(200).send({
            "status" : true,
            "msg" :"Signup Successfully",
            "data" : user,
            "token": token
        });
    } catch (error) {
        return res.status(500).json(error.errors[0].message);
    }
}

exports.login = async (req, res) => {  
    const user = await User.findOne({where: {
        username: req.body.username,
    }})
    const decryptedBytes = CryptoJS.AES.decrypt(user.password, "secret_todo_app");
    const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if(user === null || decryptedPassword !== req.body.password){
        return res.status(400).send({
            "status" : false,
            "msg" : "Username and Password does not match."
        });
    }
    
    const data = {
        user: {
            uid: user.id
        }
    }
    const token = await jwt.sign(data, "secret_todo_app");
    return res.status(200).send({
        "status" : true,
        "msg" :"Login Successfully",
        "data" : user,
        "token": token
    });
}
