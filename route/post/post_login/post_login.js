const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("node:fs")
require("dotenv").config()

function goLogin(msg) {
    let path = process.cwd() + "/route/get/get_login"
    fs.readFile(`${path}/get_login.css`, function(err, data) {
        msg.css = data.toString()
        msg.res.render("get_login", msg)
    })
}
module.exports = function(msg) {
    if(!msg.res) throw new Error("Response objesi bulunamadı.")

    if(!msg.payload.username || !msg.payload.password) {
        msg.error = {
            message: "Kullanıcı adı ve parola doldurulmalıdır."
        }
        goLogin(msg)
        return
    }

    msg.user = DB.getCollection("user").find(u => u.username === msg.payload.username)

    if(!msg.user) {
        msg.error = {
            message: "Kullanıcı adı ve parola hatalı."
        }
        goLogin(msg)
        return
    }

    bcrypt.compare(msg.payload.password, msg.user.password, function(err, result) {
        if(!result) {
            msg.error = {
                message: "Kullanıcı adı ve parola hatalı."
            }
            goLogin(msg)
            return
        }

        jwt.sign({
            username: msg.user.username,
            email: msg.user.email,
            displayName: msg.user.displayName,
            roles: msg.user.roles,
            ip: msg.req.ip
        }, process.env.JWTSECRET, { expiresIn: 86400 /* One Day */ }, function(err, token) {
            if(err) throw new Error(err)

            msg.res.cookie("token", token)
            msg.res.redirect("/")
        });
    });
}