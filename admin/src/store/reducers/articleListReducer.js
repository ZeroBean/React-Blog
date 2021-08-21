const initState = {
    articleList:[],
    pageNum:1,
    total:0
}

export const actionTypes = {
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
    SET_ARTICLE_LIST: "SET_ARTICLE_LIST",
    EDIT_ARTICLE: "EDIT_ARTICLE",
    DELETE_ARTICLE: "DELETE_ARTICLE"
}

export const actions = {
    get_article_list: (pageNum = 1,params=null)=>{
        return {
            type: actionTypes.GET_ARTICLE_LIST,
            pageNum,
            params,
        }
    },
    delete_article : (id)=>{
        return {
            type:actionTypes.DELETE_ARTICLE,
            id
        }
    },
    edit_article: (id)=>{
        console.log(id)
        return {
            type:actionTypes.EDIT_ARTICLE,
            id
        }
    }
}

export function articleListReducer(state=initState,action){
    switch(action.type){
        case actionTypes.SET_ARTICLE_LIST:
            return {
                ...state,
                articleList:[...action.data.list],
                total:action.data.count,
                pageNum:action.data.pageNum
            }
        default :
            return state
    }
}