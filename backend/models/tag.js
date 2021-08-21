const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const tagSchema = new mongoose.Schema({
    //标签名称
    name:{
        type:String,
        required:true,
    },
    //发布日期
    create_time:{
        type:Date,
        default:Date.now,
    },
    //更新日期
    update_time:{
        type:Date,
        default:Date.now
    }
})

// tagSchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model("Tag",tagSchema)