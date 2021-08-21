import {call,put,select,take} from 'redux-saga/effects'
import { actionsType as IndexAction } from '../reducers/rootReducer'
import { actionTypes as NewArticleAction } from '../reducers/newArticleReducer'
import {post} from '../fetch/fetch'

export function* saveArticle(data){
    console.log(data)
    yield put({type:IndexAction.FETCH_START})
    try {
        let id = yield select(state=>state.newArticleReducer.id)
        if(id){
            data.id = id
            return yield call(post, '/admin/updateArticle',data)
        }else{
            return yield call(post, '/admin/addArticle', data)
        }
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:"网络请求失败",msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* saveArticle_flow(){
    while(true){
        const req = yield take(NewArticleAction.SAVE_ARTICLE)
        const res = yield call(saveArticle,req.data)
        if(res && res.code===0){
            yield put({type:IndexAction.SET_MESSAGE,msgContent:res.message,msgType:0})
            //跳转到管理文章页面
        }else if(res.message === "身份信息已过期,请重新登录"){
            yield put({type:IndexAction.SET_MESSAGE,msgContent:res.message,msgType:1})
            console.log("需要跳转到登录页面")
       }else{
            //表示失败后设置提醒信息
            yield put({type:IndexAction.SET_MESSAGE,msgContent:res.message,msgType:1})
       }
    }
}