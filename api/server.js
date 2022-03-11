const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Let's git it!<h1>`)
})

server.use("*", (req, res, next) => {
    next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` });
  });
  
  function errorHandling(err, req, res, next) { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
    });
  }

  server.use(errorHandling);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
