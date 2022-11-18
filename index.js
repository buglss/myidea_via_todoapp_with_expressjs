const express = require('express')
const app = express()
const _db = require("./storage/db")
const routeTable = require("./helper/route_table")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const mustacheExpress = require("mustache-express")
0;
(async () => {
  DB = _db

  app.use("/", express.static(process.env.HTTP_STATIC || "www"))
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
  })
  app.use(bodyParser.urlencoded())
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.engine('html', mustacheExpress())
  app.set('view engine', 'html')

  const routes = await routeTable()
  app.set('views', Object.entries(routes).reduce((acc, curr) => acc.concat(curr[1].map(p => `${process.cwd()}/route/${curr[0]}/${p.replace(/\//g, curr[0] + "_")}`)), []));
  for(let method in routes)
    routes[method].forEach(route => {
      app[method](route, (req, res) => {
        let dir = route.replace(/^\//g, method + "_").replace(/\//g, "_")
        let file = dir + ".js"
        let filePath = `${process.cwd()}/route/${method}/${dir}/${file}`
        return require(filePath)({ payload: req.method === "GET" ? req.query : req.body, req, res })
      })
    })

  const PORT = process.env.PORT || "3000"
  const HOST = process.env.HOST || "127.0.0.1"

  app.listen(PORT, HOST, () => {
    console.log(`Server now running at http://${HOST}:${PORT}`)
  })
})()