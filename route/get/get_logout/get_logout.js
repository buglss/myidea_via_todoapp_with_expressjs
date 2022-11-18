module.exports = function(msg) {
    msg.res.clearCookie("token")
    msg.res.redirect("/")
}