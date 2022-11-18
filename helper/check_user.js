const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = function(payload = "") {
    return new Promise((res, rej) => {
        const token = payload.token || payload

        if(!token) rej(new Error("Token boş bırakılamaz."))

        jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
            if(err || !decoded) rej(new Error(err || "Token decode edilemedi."))
            res(decoded)
        });
    })
}