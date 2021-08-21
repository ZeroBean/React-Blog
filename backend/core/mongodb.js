const CONFIG = require('../app.config')

const mongoose = require('mongoose')

mongoose.connect(CONFIG.MONGODB.uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(console.log("数据库连接成功")).catch(err=>{
    console.log(err)
})

module.exports = mongoose
