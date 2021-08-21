const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    //用户名
    username:{
        type:String,
        required:true,
    },
    //密码
    password:{
        type:String,
        required:true,
    },
    //用户类型 0--管理员 1--普通用户 暂时不设其他用户
    type:{
        type:Number,
        default:0
    }
})

// userSchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('User',userSchema)

