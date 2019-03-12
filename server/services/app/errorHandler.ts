export {}

const app = require('../app/app')

app.use( (err, req, res, next) => {

    let status, statusText = null

    if (err.response) {
       [status, statusText] = err.response
    }

    res.status(status || 500).send({
        error: true,
        message : statusText || 'Internal Service Error'
    })
})
