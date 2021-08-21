const mongoose = require('mongoose')

// const AutoIncrement = require('mongoose-sequence')(mongoose)

const categorySchema = new mongoose.Schema({
    //分类名称
    name:{
        type:String,
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now,
    },
    //最后修改时间
    update_time :{
        type:Date,
        default:Date.now,
    },
})

// categorySchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('Category',categorySchema)