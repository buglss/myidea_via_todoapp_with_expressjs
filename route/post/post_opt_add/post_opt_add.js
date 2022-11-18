const checkUser = require("../../../helper/check_user")

module.exports = function(msg) {
    if(!msg.res) throw new Error("Response objesi bulunamadı.")

    msg.token = msg.req.cookies.token

    checkUser(msg).then((user) => {
        const typeLookup = require("../../../storage/type_lookup")

        type = "add"

        if(!Object.keys(typeLookup).includes(type)) throw new Error(`${type} geçersiz bir parametre değeridir.`)

        if(!typeLookup[type].requireArgs.every(arg => msg.payload[arg])) throw new Error(`${typeLookup[type].text} istediğiniz elemanın ${typeLookup[type].requireArgs} bilgisi(leri) olmalı.`)

        const date = new Date()
        const now = date.getTime()

        DB.getCollection("todo").push({
            id: now,
            name: msg.payload.name,
            done: false,
            stamp: {
                createdAt: now,
                ip: msg.req.ip,
                username: user.username || "",
                email: user.email || ""
            },
            date: date.toLocaleDateString("TR"), // DD.AA.YYYY
            time: date.toLocaleTimeString("TR") // SS:DD:NN
        })

        msg.res.redirect("/")
    }).catch((err) => {
        msg.error = {
            message: err
        }
        msg.res.render("get_", msg)
    })

}