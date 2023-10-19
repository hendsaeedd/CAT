const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const bodyParser = require('body-parser')
const registerRouter = require('./routes/register')

//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//routes
app.use('/register', registerRouter)

app.listen(port, () => console.log(`app is listening on port ${port}!`))
