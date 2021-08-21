import { call,put,take } from "@redux-saga/core/effects";
import { actionsType as IndexTypes} from "../reducers/rootReducer";
import { actionTypes as CatTypes } from "../reducers/catReducer";
import { get,post } from "../fetch/fetch";
// import { useHistory } from "react-router";

export function* getAllCats(){
    yield put({type:IndexTypes.FETCH_START})
    try{
        return yield call(get,'/getCats')
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}


export function* getAllCatsFlow(){
    while(true){
        yield take(CatTypes.GET_ALL_CATS)
        let res = yield call(getAllCats)
        if(res.code===0){
            let tempArr = []
            for(let i = 0;i<res.data.length;i++){
                tempArr.push(res.data[i])
            }
            yield put({type:CatTypes.SET_CATS,data:tempArr})
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


export function* addCat(name){
    console.log(name)
    yield put({type:IndexTypes.FETCH_START})
    try{
        return yield call(post,'/admin/addCategory',{name})
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}


export function* add_CatFlow(){
    while(true){
       const req =  yield take(CatTypes.ADD_CAT)
       const res = yield call(addCat,req.name)

       if(res.code===0){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            yield put({type:CatTypes.GET_ALL_CATS})
       }else if(res.message === "身份信息已过期,请重新登录"){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            console.log("需要跳转到登录页面")
       }else{
            //表示失败后设置提醒信息
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
       }
    }
}

export function* delCat(id){
    console.log(id)
    yield put({type:IndexTypes.FETCH_START})
    try{
       return yield call(post,'/admin/deleteCategory',{id})
    }catch(err){
        yield put({type:IndexTypes.SET_MESSAGE,msgContent:"网络请求错误",msgType:0})
    }finally{
        yield put({type:IndexTypes.FETCH_END})
    }
}

export function* delCatFlow(){
    while(true){
        const req = yield take(CatTypes.DELETE_CATS)
        const res = yield call(delCat,req.id)
        console.log(res)
        if(res.code===0){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            yield put({type:CatTypes.GET_ALL_CATS})
        }else if(res.message === "身份信息已过期,请重新登录"){
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
            console.log("需要跳转到登录页面")
       }else{
            //表示失败后设置提醒信息
            yield put({type:IndexTypes.SET_MESSAGE,msgContent:res.message,msgType:1})
       }
    }
}