const initialState = {
    isFetching:false,
    msg:{
        type:3, //0--表示失败，1--表示成功 //3--表示初始状态无信息
        content:''
    },
    user:{} //表示用户是否已经登录
}

export const actionsType = {
    FETCH_START : "FETCH_START",
    FETCH_END : "FETCH_END",
    USER_LOGIN : "USER_LOGIN",
    SET_USER : "SET_USER",
    SET_MESSAGE : "SET_MESSAGE",
    USER_AUTH:"USER_AUTH",
}

export const actions = {
    get_login: function(username,password){
        return {
            type: actionsType.USER_LOGIN,
            username,
            password,
        }
    },
    clear_msg: function(){
        return {
            type:actionsType.SET_MESSAGE,
            msgType:1,
            msgContent:''
        }
    },
    user_auth:function () {
        return{
            type:actionsType.USER_AUTH
        }
    }
}

export function rootReducer(state=initialState,action){
    switch (action.type){
        case actionsType.FETCH_START:
            return {
                ...state,isFetching:true
            }
        case actionsType.FETCH_END:
            return{
                ...state,isFetching:false
            }
        case actionsType.SET_MESSAGE:
            return {
                ...state,
                msg:{
                    type: action.msgType,
                    content: action.msgContent
                }
            }
        case actionsType.SET_USER:
            return {
                ...state,
                user:action.data
            }
        default :
            return state
    }
}