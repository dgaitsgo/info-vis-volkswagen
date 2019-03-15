export {}

const app = require('../app/app')

app.use( (err, req, res, next) => {

    let status, statusText, data = null

    if (err.response) {
       [status, statusText, data] = err.response
    }

    res.status(status || 500).end()
})
