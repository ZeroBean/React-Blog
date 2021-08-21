const router = require('express').Router()
const { response } = require('express')
const Article = require('../models/article')
const {responseClient} = require('../utils/utils')

//code  0表示成功 1：数据不合法 2：客户端数据错误 3：后端错误


//管理后台获取文章

router.get('/getArticle', async(req,res)=>{
    console.log(req.query)
    //根据标签查找
    // let tag_id = req.query.tag_id || null
    // let category_id = req.query.category_id || null
    let state = req.query.state || ''
    let pageNum = parseInt(req.query.pageNum) || 1
    let pageSize = parseInt(req.query.pageSize) || 5
    let condition = {}
    if(state){
        state = parseInt(state)
        condition.state = state
    }

    //设置查找默认值

    console.log(condition)
    //设置每次查找大小
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize
    //设置返回数据
    let responseData = {
        count:0,
        list:[]
    }
    Article.countDocuments(condition,(err,count)=>{
        if(err){
            console.log('Error:' + err)
        }else{
            responseData.count = count
            console.log(count)
            let fields = {
                title:1,
                author:1,
                state:1,
                desc:1,
                img_url:1,
                tags:1,
                category:1,
                meta:1,
                create_time:1
            }
            let options = {
                skip:skip,
                limit:pageSize,
                sort: {create_time : -1},
            }
            console.log(condition)
            console.log(options)
            Article.find(condition,fields,options,(error,result)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log(result)
                    responseData.list = result
                }
                responseClient(res,200,0,'操作成功',responseData)
            })
            .populate([
                {path:'tags'},
                {path: 'category'}
            ]).exec((err,doc)=>{
                // console.log("doc:");          // aikin
                // console.log("doc.tags:",doc.tags);          // aikin
                // console.log("doc.category:",doc.category);           // undefined
            })
        }
    })
})


//创建一个文章
router.post('/addArticle',async (req,res)=>{
    const {
        title,
        author,
        content,
        desc,
        img_url,
        tags,
        category,
        state,
    } = req.body
    console.log(tags)
    let tempArticle = null
    //tags，category 要传入Ojectid 为 24位hash码
    if(img_url){
        tempArticle = new Article({
            title,
            author,
            content,
            numbers:content.length,
            desc,
            img_url,
            tags,
            category,
            state,
        })
    }else{
        tempArticle = new Article({
            title,
            author,
            content,
            numbers:content.length,
            desc,
            tags,
            category,
            state,
        })
    }
    console.log(tempArticle)
    try{
        await tempArticle.save().then(data=>{
            responseClient(res,200,0,'保存成功',data)
        })
    }catch(err){
        console.log(err)
        responseClient(res)
    }
})

//更新文章信息
router.post('/updateArticle', async(req,res)=>{
    const {
        title,
        author,
        content,
        desc,
        img_url,
        tags,
        category,
        state,
        id
    } = req.body

    await Article.findOneAndUpdate(
        {_id:id},
        {
            title,
            author,
            content,
            desc,
            img_url,
            tags,
            category,
            state
        },
        {},
        (err,result)=>{
            if(err){
                responseClient(res)
            }else{
                responseClient(res,200,0,'更新成功',result)
            }
        }
    )
})


//删除文章
router.post('/deleteArticle', async(req,res)=>{
    const { id } = req.body

    await Article.deleteOne({_id:id},(err,result)=>{
        if(err){
            console.log(err)
            responseClient(err)
        }
        if(result.n===1){
            responseClient(res,200,0,'删除成功',result)
        }else{
            responseClient(res,201,0,'文章不存在',result)
        }
    })
})

module.exports = router