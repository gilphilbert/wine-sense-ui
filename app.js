const express = require('express')
const app = express()

const PORT = 8080

const bob = require('./api')(app)

const { resolve } = require('path')
const publicPath = resolve(__dirname, './dist')
const staticConf = { maxAge: '1y', etag: false }
app.use(express.static(publicPath, staticConf))

app.use(express.static(publicPath, staticConf))

// now our secret stuff
// const private = require('./api/private')(app)

app.listen(PORT, () => {
  console.log(`[START] Listening on ${PORT}`)
})
