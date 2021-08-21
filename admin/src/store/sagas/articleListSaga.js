import { call,put,take,select } from "@redux-saga/core/effects";
import { actionTypes as articleListTypes } from "../reducers/articleListReducer";
import { actionTypes as NewArticleTypes} from "../reducers/newArticleReducer";
import { actionsType as IndexTypes } from "../reducers/rootReducer";
import { get,post } from "../fetch/fetch";

//获取文章列表
export function* getArticleList (pageNum,params=null){
    yield put({type:IndexTypes.FETCH_START})
    try{
        let newParams = {...params,pageNum}
        console.log(newParams)
        return yield call(get,'/admin/getArticle',newParams)
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}

//编辑文章
export function* editArticle(id){
    yield put({type:IndexTypes.FETCH_START})
    try{
        return yield call(post,'/getArticleDetail',{id})
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}

//删除文章
export function* deleteArticle(id){
    yield put({type:IndexTypes.FETCH_START})
    try{
        return yield call(post,'/admin/deleteArticle',{id})
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}

export function* editAritcle_flow(){
    while(true){
        const req = yield take(articleListTypes.EDIT_ARTICLE)
        console.log(req)
        const res = yield call(editArticle,req.id)
        if(res){
            if(res.code===0){
                let title = res.data.title
                let id = res.data._id
                let author = res.data.author
                let desc = res.data.desc
                let imgUrl = res.data.img_url
                let pstate = res.data.state
                let tags = res.data.tags.map((tag)=>{
                    return tag._id
                })
                console.log(tags)
                let category = res.data.category.map(cat=>{
                    return cat._id
                })
                let content = res.data.content
                yield put({type:NewArticleTypes.UPDATETITLE,title})
                yield put({type:NewArticleTypes.SET_ARTILCE_ID,id})
                yield put({type:NewArticleTypes.UPDATEAUTHOR,author})
                yield put({type:NewArticleTypes.UPDATEDESC,desc})
                yield put({type:NewArticleTypes.UPDATEIMGURL,imgUrl})
                yield put({type:NewArticleTypes.UPDATEPSTATE,pstate})
                yield put({type:NewArticleTypes.UPDATETAGS,tags})
                yield put({type:NewArticleTypes.UPDATECATEGORY,category})
                yield put({type:NewArticleTypes.UPDATECONTENT,content})
            }
        }else{
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:0})
        }
    }
}

//监听文章列表事件
export function* getArticleList_flow(){
    while(true){
        const req = yield take(articleListTypes.GET_ARTICLE_LIST)
        console.log(req.pageNum,req.params)
        const res = yield call(getArticleList,req.pageNum,req.params)
        console.log(res)
        if(res){
            if(res.code===0){

                res.data.pageNum = req.pageNum
                yield put({type:articleListTypes.SET_ARTICLE_LIST,data:res.data})
            }else if(res.message==='身份信息已过期，请重新登录'){
                yield put({type: IndexTypes.SET_MESSAGE, msgContent: res.message, msgType: 0})
                console.log("需要跳转到登录页面")
            }
        }else{
            yield put({type: IndexTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }
    }
}

//监听删除文章事件
export function* deleteArticle_flow(){
    while(true){
        const req = yield take(articleListTypes.DELETE_ARTICLE)
        console.log(req.id)
        const pageNum = yield select(state=>state.articleListReducer.pageNum)
        console.log(pageNum)
        const res = yield call(deleteArticle,req.id)
        if(res){
            if(res.code===0){
                yield put({type: IndexTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1})
                yield put({type:articleListTypes.GET_ARTICLE_LIST,pageNum})
            }else if(res.message === '身份信息已过期，请重新登录'){
                yield put({type: IndexTypes.SET_MESSAGE, msgContent: res.message, msgType: 0})
                console.log("需要跳转到登录页面")
                window.location.replace('/login')
            }
        }else{
            yield put({type: IndexTypes.SET_MESSAGE, msgContent: res.message, msgType: 0})
        }
    }
}