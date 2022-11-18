const checkUser = require("../../../helper/check_user")

module.exports = function(msg) {
    if(!msg.res) throw new Error("Response objesi bulunamadı.")

    msg.token = msg.req.cookies.token

    checkUser(msg).then((user) => {
        const dataIndex = DB.getCollection("todo").findIndex(x => x.id == msg.payload.id && (x.stamp.username === user.username || user.roles.includes("admin")))

        if(!~dataIndex) throw new Error("İd ile eşleşen bir kayıt bulunamadı.")

        if(DB.getCollection("todo")[dataIndex].done) throw new Error("Tamamlanan işler güncellenemez.")

        const typeLookup = require("../../../storage/type_lookup")

        type = "update"

        if(!Object.keys(typeLookup).includes(type)) throw new Error(`${type} geçersiz bir parametre değeridir.`)

        if(!typeLookup[type].requireArgs.every(arg => msg.payload[arg])) throw new Error(`${typeLookup[type].text} istediğiniz elemanın ${typeLookup[type].requireArgs} bilgisi(leri) olmalı.`)

        const date = new Date()
        const now = date.getTime()

        DB.getCollection("todo")[dataIndex] = {
            ...DB.getCollection("todo")[dataIndex],
            name: msg.payload.name,
            stamp: {
                createdAt: now,
                ip: msg.req.ip,
                username: user.username || "",
                email: user.email || ""
            },
            date: date.toLocaleDateString("TR"), // DD.AA.YYYY
            time: date.toLocaleTimeString("TR") // SS:DD:NN
        }

        msg.res.redirect("/")
    }).catch((err) => {
        msg.error = {
            message: err
        }
        msg.res.render("get_", msg)
    })

}