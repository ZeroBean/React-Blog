const express = require('express')
const app = express()
const mongoose = require('./core/mongodb')
const CONFIG = require('./app.config')
const adminRoute = require('./routes/admin')
const mainRoute = require('./routes/main')
const cors = require('cors')


app.use(express.json())

//设置跨域

// const whitelist = ['http://localhost:3000','http://localhost:3001']
var corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true,
    maxAge: '1728000',
    //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))


//前台主页路由
app.use('/admin',adminRoute)
app.use('/',mainRoute)

app.listen("5000",()=>{
    console.log("Backend is running")
})