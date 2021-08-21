import { call,put,take } from "@redux-saga/core/effects";
import { actionsType as IndexTypes} from "../reducers/rootReducer";
import { actionTypes as TagTypes } from "../reducers/tagReducer";
import { get,post } from "../fetch/fetch";
// import { useHistory } from "react-router";

export function* getAllTags(){
    yield put({type:IndexTypes.FETCH_START})
    try{
        return yield call(get,'/getTags')
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}


export function* getAllTagsFlow(){
    while(true){
        yield take(TagTypes.GET_ALL_TAGS)
        let res = yield call(getAllTags)
        if(res.code===0){
            let tempArr = []
            for(let i = 0;i<res.data.length;i++){
                tempArr.push(res.data[i])
            }
            yield put({type:TagTypes.SET_TAGS,data:tempArr})
        }
        else if(res.message === "身份信息已过期,请重新登录"){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            //没有登录进行请求，返回登录页面
            // setTimeout(()=>{
                
            // })
            console.log("需要跳转到登录页面")
        }else{
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
        }
    }
}


export function* addTag(name){
    console.log(name)
    yield put({type:IndexTypes.FETCH_START})
    try{
        return yield call(post,'/admin/addTag',{name})
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}


export function* add_TagFlow(){
    while(true){
       const req =  yield take(TagTypes.ADD_TAG)
       const res = yield call(addTag,req.name)

       if(res.code===0){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            yield put({type:TagTypes.GET_ALL_TAGS})
       }else if(res.message === "身份信息已过期,请重新登录"){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            console.log("需要跳转到登录页面")
       }else{
            //表示失败后设置提醒信息
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
       }
    }
}

export function* delTag(id){
    console.log(id)
    yield put({type:IndexTypes.FETCH_START})
    try{
       return yield call(post,'/admin/deleteTag',{id})
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}

export function* delTagFlow(){
    while(true){
        const req = yield take(TagTypes.DELETE_TAG)
        const res = yield call(delTag,req.id)
        console.log(res)
        if(res.code===0){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            yield put({type:TagTypes.GET_ALL_TAGS})
        }else if(res.message === "身份信息已过期,请重新登录"){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            console.log("需要跳转到登录页面")
       }else{
            //表示失败后设置提醒信息
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
       }
    }
}