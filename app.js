var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./data/json-server/db/db.json')
const middlewares = jsonServer.defaults('./controllers/json-server/')

var indexRouter = require('./controllers/express/import');
// var exportRouter = require('./controllers/export');
var listRouter = require('./controllers/express/list');

var app = express();

server.use(middlewares)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/import', indexRouter);
app.use('/list', listRouter)
// app.use('/export', exportRouter);
app.use('/api', middlewares, router);

module.exports = app;
