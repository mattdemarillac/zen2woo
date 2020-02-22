const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')

const indexRouter = require('./controllers/import')
const exportRouter = require('./controllers/export')
const listRouter = require('./controllers/list')
const database = require('./classes/db/database')

const db = async () => {
  await database.connect()
}

var app = express()

app.use(logger('common', {
  stream: fs.createWriteStream('./logs/log.txt', { flags: 'a' })
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('db', db.call())

app.use('/import', indexRouter)
app.use('/list', listRouter)
app.use('/export', exportRouter)

module.exports = app
