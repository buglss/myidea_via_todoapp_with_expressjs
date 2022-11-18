const checkUser = require("../../../helper/check_user")

module.exports = function(msg) {
    if(!msg.res) throw new Error("Response objesi bulunamadı.")

    msg.token = msg.req.cookies.token

    checkUser(msg).then((user) => {
        msg.payload = DB.getCollection("todo").filter(x => x.stamp.username === user.username || user.roles.includes("admin")).sort((a, b) => b.stamp.createdAt - a.stamp.createdAt)
        msg.hasAdmin = user.roles.includes("admin")
        msg.user = user

        msg.res.render("get_", msg)
    }).catch((err) => {
        msg.res.redirect("/login")
    })

}