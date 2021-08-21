const router = require('express').Router()
const Category = require('../models/category')
const { responseClient } = require('../utils/utils')

//添加标签
router.post('/addCategory', async(req,res)=>{
    let {name} = req.body
    const findCat = await Category.findOne({name})
    if(!findCat){
        let newCat = new Category({
            name
        })

       await newCat.save((err,result)=>{
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
router.post('/deleteCategory', async(req,res)=>{
    let {id} = req.body
    await Category.deleteOne({_id:id},(err,result)=>{
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