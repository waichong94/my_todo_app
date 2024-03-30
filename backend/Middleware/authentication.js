const {User} = require("../models");
const jwt    = require('jsonwebtoken');

exports.checkToken = async (req, res) => {  

    return new Promise(async (resolve, reject) => {
        const { url } = req;
        if(url == "/login" || url == "/signup"){
            return resolve({
                "status" : true,
            });
        }
       
        const token = req.header('auth-token');
        if(!token){
            return resolve({
                "status" : false,
                "errors" : "Please authenticate using a valid token."
            });
        }else{
            try {
                const data = await jwt.verify(token, 'secret_todo_app');
                req.user = data.user;
            } catch (error) {
                return resolve({
                    "status" : false,
                    "errors" : "Please authenticate using a valid token."
                });
            }
        }
        return resolve({
            "status" : true,
        });
    });

}
