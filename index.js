const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDatabase = require('./config/db')
connectToDatabase(process.env.MONGO_URL)

const waybill = require('./controllers/waybill')
const signup = require('./controllers/signup')
const login = require('./controllers/login')
require('dotenv').config()

app.use(cors({
    origin: 'https://miniads-waybill.vercel.app/'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req,res)=>{
    res.status(200).send('<h1>Welcome to Miniads Waybill API</h1>')
})

app.use('/waybill', waybill)
app.use('/signup', signup)
app.use('/login', login)


app.listen(8080, console.log('Server Connected...'))