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

const allowedOrigins = ['https://miniads-waybill.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin.replace(/\/$/, "")) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req,res)=>{
    res.status(200).send('<h1>Welcome to Miniads Waybill API</h1>')
})

app.use('/waybill', waybill)
app.use('/signup', signup)
app.use('/login', login)


app.listen(8080, console.log('Server Connected...'))