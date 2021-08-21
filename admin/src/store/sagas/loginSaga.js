import {put,call,take} from 'redux-saga/effects'
import { actionsType } from '../reducers/rootReducer'
import {post,get} from '../fetch/fetch'


export function* login(username,password){
    yield put({type:actionsType.FETCH_START})
    try{
        return yield call(post,'/admin/login',{username,password})
    }catch(err){
        yield put({type:actionsType.SET_MESSAGE,msgContent:"用户名或密码错误",msgType:0})
    }finally{
        yield put({type:actionsType.FETCH_END})
    }
}

export function* loginflow(){
    while(true){
        let request = yield take(actionsType.USER_LOGIN)
        let response = yield call(login,request.username,request.password)
        if(response && response.code===0){
            yield put({type:actionsType.SET_MESSAGE,msgContent:"登录成功",msgType:1})
            yield put({type:actionsType.SET_USER,data:response.data})
        }
    }
}

export function* user_auth(){
    while(true){
        yield take(actionsType.USER_AUTH)
        try{
            yield put({type:actionsType.FETCH_START})
            const response = yield call(get,'/admin/userInfo')
            console.log(response)
            if(response && response.code===0){
                yield put({type:actionsType.SET_USER,data:response.data})
            }
        }catch(err){
            console.log(err);
        }finally{
            yield put({type:actionsType.FETCH_END})
        }
    }
}