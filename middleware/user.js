const jwt = require('jsonwebtoken')
const jwtPassword = require('../config')

function userMiddleware(req,res,next){
    const token = req.headers.authorization;
    //token format : Bearer askdjflaksjdlfkjaslkjdfa
    const words = token.split(" ");
    const jwtToken = words[1];

    const decodeToken = jwt.decode(jwtToken,jwtPassword);
    if(decodeToken.username){
        req.username = decodeToken.username
        next()
    }else{
        res.status(403).json({
            msg : "Oops Somenting Went Worng! Try Again"
        })
    }
}

module.exports = userMiddleware