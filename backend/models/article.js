const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const articleSchema = new mongoose.Schema({
    //文章标题
    title:{
        type:String,
        required:true,
    },
    //文章关键字,留作查找使用
    // keywords:[{
    //     type:String,
    //     default:''
    // }],

    //作者
    author:{
        type:String,
        required:true,
    },
    //文章描述
    desc:{
        type:String,
        required:true,
    },
    //文章内容
    content:{
        type:String,
        required:true,
    },
    //字数
    numbers:{
        type:String,
        default:0,
    },
    //封面图
    img_url:{
        type:String,
        default:'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-johannes-plenio-1103970.jpg&fm=jpg'
    },
    //文章类型，暂时不需要
    //文章的发布状态 0-草稿，1-已发布
    state:{
        type:Number,
        default:1,
    },
    //文章标签
    tags:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Tag',
        required:true,
    }],
    //评论暂时不做
    //文章分类
    category:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category',
        required:true,
    }],
    //点赞用户，暂时不做

    //其他元信息
    meta:{
        views:{type:Number,default:0}
    },

    //创建日期
    create_time:{
        type:Date,
        default:Date.now
    },
    //最后修改日期
    update_time:{
        type:Date,
        default:Date.now
    }
})

// articleSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("article",articleSchema)

