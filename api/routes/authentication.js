let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({ message: "Working" })
})

router.post('/login', (req, res) => {
    res.status(200).send({ message: "Logged in" })
})

module.exports = router