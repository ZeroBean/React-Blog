const router = require('express').Router()
const Article = require('../models/article')
const Tag = require('../models/tag')
const Cat = require('../models/category')
const { responseClient } = require('../utils/utils')
const category = require('../models/category')
const dayjs = require('dayjs')

//获取标签信息
router.get('/getTags', async(req,res)=>{
    await Tag.find({},(err,result)=>{
        if(err){
            console.log(err)
            responseClient(res)
        }else{
            responseClient(res,200,0,'获取成功',result)
        }
    })
})

//获取分类信息

router.get('/getCats', async(req,res)=>{
    await Cat.find({},(err,result)=>{
        if(err){
            console.log(err)
            responseClient(res)
        }else{
            responseClient(res,200,0,'获取成功',result)
        }
    })
})




// 获取文章信息
router.get('/getArticle', async(req,res)=>{
    console.log(req.query)
    //根据标签查找
    let tag_id = req.query.tag_id || null
    let category_id = req.query.category_id || null
    let pageNum = parseInt(req.query.pageNum) || 1
    let pageSize = parseInt(req.query.pageSize) || 5
    //设置查找默认值
    let conditions = {
        state:1
    }
    //设置每次查找大小
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize
    //设置返回数据
    let responseData = {
        count:0,
        list:[]
    }
    Article.countDocuments(conditions,(err,count)=>{
        if(err){
            console.log('Error:' + err)
        }else{
            responseData.count = count
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
            console.log(conditions)
            console.log(options)
            Article.find(conditions,fields,options,(error,result)=>{
                if(error){
                    console.log(error)
                }else{
                    let newList = []
                    //根据标签id返回数据
                    if(category_id){
                        console.log(category_id)
                        result.forEach(item=>{
                            const catlists = item.category
                            for(let i = 0;i<catlists.length;i++){
                                console.log(catlists[i]._id)
                                if(catlists[i]._id==category_id){
                                    newList.push(item)
                                }
                            }
                            // if(item.category.indexOf(category_id)>-1){
                            //     newList.push(item)
                            // }
                        })
                        let len = newList.length
                        responseData.count = len
                        responseData.list = newList
                    }else if(tag_id){
                        console.log('tag_id: ', tag_id)
                        result.forEach(item=>{
                            const taglists = item.tags
                            for(let i = 0;i<taglists.length;i++){
                                console.log(taglists[i]._id)
                                if(taglists[i]._id==tag_id){
                                    newList.push(item)
                                }
                            }
                            // if(item.tags.indexOf(tag_id)>-1){
                            //     newList.push(item)
                            // }
                        })
                        let len = newList.length
                        responseData.count = len
                        responseData.list = newList
                    }
                    else{
                        responseData.list = result
                    }
                    responseClient(res,200,0,'操作成功',responseData)
                }
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

router.get("/getTimeLine",async(req,res)=>{
    let fields = {
        title:1,
        create_time:1,
    }
    let responseData = {
        count:0,
        list:[]
    }
    Article.countDocuments({state:1},async(err,count)=>{
        if(err){
            console.log(err)
        }else{
            responseData.count = count
            await Article.find({state:1},fields,{sort:{create_time:-1}},(err,result)=>{
                if(err){
                    console.log(error)
                }else{
                    console.log(result)
                    let temp = []
                    result.forEach((item)=>{
                        let obj = {
                            id:item._id,
                            create_time:item.create_time,
                            title:item.title,
                            year:dayjs(item.create_time).format("YYYY"),
                            month:dayjs(item.create_time).format("MM"),
                            day:dayjs(item.create_time).format("DD"),
                        }
                        temp.push(obj)
                    })
                    responseData.list = temp
                    
                }
            })
            responseClient(res,200,0,'操作成功',responseData)
        }
    })
})

//获取文章详情
router.post("/getArticleDetail",async(req,res)=>{
    const {id} = req.body
    console.log(id)
    if(!id){
        responseClient(res,200,1,"文章不存在")
        return
    }else{
        Article.findOne({_id:id},(err,data)=>{
            if(err){
                console.log(err)
                responseClient(res)
            }else{
                data.meta.views = data.meta.views+1
                Article.updateOne({_id:id},{meta:data.meta},(err,result)=>{
                    if(err){
                        console.log(err)
                        responseClient(res)
                    }else{
                        responseClient(res,200,0,"操作成功",data)
                    }
                })
            }
        }).populate([
            {path:'tags'},
            {path:'category'}
        ]).exec()
    }
})

module.exports = router