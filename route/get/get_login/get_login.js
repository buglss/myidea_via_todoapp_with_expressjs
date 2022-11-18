const fs = require("node:fs")

module.exports = function(msg) {
    if(!msg.res) throw new Error("Response objesi bulunamadı.")

    let path = process.cwd() + "/route/get/get_login"
    fs.readFile(`${path}/get_login.css`, function(err, data) {
        msg.css = data.toString()
        msg.res.render("get_login", msg)
    })
}