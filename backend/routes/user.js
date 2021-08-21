const router = require('express').Router()
const { responseClient } = require('../utils/utils')
const User = require('../models/user')
const session = require('express-session')
const cookieParser = require('cookie-parser')


router.use(cookieParser('react_cookie'))
//设置登录session
router.use(session({
    secret:"react_cookie",
    name:'session_id',
    resave:true,
    // rolling:true,
    saveUninitialized:true,
    cookie:{
        maxAge: 60*1000*30 //过期时间
    }
}))

router.post('/login',async(req,res)=>{
    const {username,password} = req.body
    // console.log(req.body)
    if(!username){
        responseClient(res,400,2,'用户名不能为空')
        return
    }
    if(!password){
        responseClient(res,400,2,'密码不能为空')
        return
    }
   await User.findOne({username,password}, (err,userInfo)=>{
        if(err){
            responseClient(res)
        }else{
            if(userInfo){
                const data={}
                data.username = userInfo.username
                data.userId = userInfo._id
                data.userType = userInfo.type
                req.session.userInfo = data
                console.log(req.session)
                responseClient(res,200,0,"登录成功",data)
                return
            }else{
                responseClient(res,400,1,"用户不存在")
                return
            }
        }
    })
})

router.post("/register", async(req,res)=>{
    const {username,password,passwordAgain} = req.body
    //数据校验
    if(!username){
        responseClient(res,400,2,'用户名不能为空')
        return
    }
    if(!password){
        responseClient(res,400,2,'密码不能为空')
        return
    }
    if(password !== passwordAgain){
        responseClient(res,400,2,"密码不一致")
    }
    await User.findOne({username}, async (err,userInfo)=>{
        if(err){
            responseClient(res)
        }else{
            if(userInfo){
                responseClient(res,400,1,'用户名已经存在')
            }else{
                let user = new User({
                    username,
                    password
                })
               await user.save((err,result)=>{
                    if(err){
                        responseClient(res)
                    }else{
                        responseClient(res,200,0,'注册成功',result)
                    }
               })
            }
        }
    })
})

router.get('/userInfo',function (req,res) {
    console.log(req.session)
    if(req.session.userInfo){
        responseClient(res,200,0,'',req.session.userInfo)
    }else{
        responseClient(res,200,1,'身份信息已过期,请重新登录',req.session.userInfo)
    }
});

module.exports = router