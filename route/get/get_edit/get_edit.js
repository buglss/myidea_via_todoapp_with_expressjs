const checkUser = require("../../../helper/check_user")

module.exports = function(msg) {
    if(!msg.res) throw new Error("Response objesi bulunamadı.")

    msg.token = msg.req.cookies.token

    checkUser(msg).then((user) => {
        msg.payload = DB.getCollection("todo").find(x => x.id == msg.payload.id && (x.stamp.username === user.username || user.roles.includes("admin")))

        if(!msg.payload) throw new Error("İd ile eşleşen bir kayıt bulunamadı.")
        if(msg.payload.done) throw new Error("Tamamlanan işler güncellenemez.")

        msg.res.render("get_edit", msg)
    }).catch((err) => {
        msg.error = {
            message: err
        }
        require(process.cwd() + "/route/get/get_/get_.js")(msg)
    })

}