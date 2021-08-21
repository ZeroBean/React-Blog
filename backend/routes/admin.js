const router = require('express').Router()
const TagsRoute = require('./tags')
const ArticlesRoute = require('./articles')
const CatRoute = require('./category')
const userRoute = require('./user')


//admin才能到添加跟删除标签,获取标签直接使用main的路由

//使用session进行登录验证


router.use('/',userRoute)

//登录前进行拦截

// router.use((req,res,next)=>{
//     if(req.session.userInfo){
//         next()
//     }else{
//         responseClient(res,200,1,'身份信息已过期,请重新登录')
//     }
// })

router.use('/',TagsRoute)
router.use('/',ArticlesRoute)
router.use('/',CatRoute)





module.exports = router