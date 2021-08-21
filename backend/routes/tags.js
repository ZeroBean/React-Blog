const router = require('express').Router()
const Tag = require('../models/tag')
const { responseClient } = require('../utils/utils')

//添加标签
router.post('/addTag', async(req,res)=>{
    let {name} = req.body
    const findTag = await Tag.findOne({name})
    if(!findTag){
        let newTag = new Tag({
            name
        })

       await newTag.save((err,result)=>{
           if(err){
               console.log(err)
               responseClient(res)
           }else{
               responseClient(res,200,0,'添加成功',result)
           }
       })
    }else{
        responseClient(res,200,1,'标签已存在')
    }
})

//删除标签
router.post('/deleteTag', async(req,res)=>{
    let {id} = req.body
    console.log(id)
    await Tag.deleteOne({_id:id},(err,result)=>{
        if(err){
            console.log(err)
            responseClient(res)
        }
        console.log(result)
        if(result.n===1){
            responseClient(res,200,0,'删除成功',result)
        }else{
            responseClient(res,201,1,'标签不存在',result)
        }
    })
})

module.exports = router