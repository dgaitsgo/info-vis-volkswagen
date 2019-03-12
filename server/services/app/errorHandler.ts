import app from '../../services/app/app'

app.use( (err, req, res, next) => {

    if (err.response) {
        const { status, statusText } = err.response

        res.status(status).send({
            error : true,
            message: statusText,
        })
    }
    res.status(500).send({
        error: true,
        message : 'Internal Service Error'
    })
})
