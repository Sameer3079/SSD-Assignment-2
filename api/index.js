let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let authenticationRouter = require('./routes/authentication')
let app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/authentication', authenticationRouter)

const port = 3001
app.listen(port, error => {
    if (error) {
        console.log('Error starting up server')
    }
    console.log('Server started on port ' + port)
})


module.exports = app