const initState = {
    title:'',//文章标题
    author:'ZZN',//作者
    desc:'',//文章简介
    imgUrl:'',//封面图片
    pstate:1,//发布状态 0--草稿 1--正式发布
    tags:[],//标签列表
    category: '',//分类
    content:'',//内容
    id:'',//文章ID
}

export const actionTypes = {
    SAVE_ARTICLE : "SAVE_ARTICLE",//提交文章--按发布状态
    UPDATETITLE : "UPDATETITLE", //更新标题
    UPDATEAUTHOR : "UPDATEAUTHOR",//更新作者
    UPDATEDESC : "UPDATEDESC",//更新文章描述
    UPDATEIMGURL : "UPDATEIMGURL",//更新封面内容
    UPDATEPSTATE : "UPDATEPSTATE", //更新发布状态
    UPDATETAGS : "UPDATETAGS", //更新标签
    UPDATECATEGORY : "UPDATECATEGORY", //更新分类
    UPDATECONTENT : "UPDATECONTENT", //更新内容.
    SET_ARTILCE_ID : "SET_ARTILCE_ID"
}

export const actions = {
    update_title : (title)=>{
        return {
            type:actionTypes.UPDATETITLE,
            title
        }
    },
    update_author: (author)=>{
        return{
            type:actionTypes.UPDATEAUTHOR,
            author
        }
    },
    update_desc : (desc)=>{
        return {
            type:actionTypes.UPDATEDESC,
            desc
        }
    },
    update_imgUrl : (imgUrl)=>{
        return {
            type:actionTypes.UPDATEIMGURL,
            imgUrl
        }
    },
    update_pstate: (pstate)=>{
        return {
            type:actionTypes.UPDATEPSTATE,
            pstate
        }
    },
    update_tags: (tags)=>{
        return{
            type:actionTypes.UPDATETAGS,
            tags
        }
    },
    update_category : (category)=>{
        return {
            type: actionTypes.UPDATECATEGORY,
            category
        }
    },
    update_content: (content)=>{
        return {
            type: actionTypes.UPDATECONTENT,
            content
        }
    },
    save_article : (data)=>{
        return {
            type:actionTypes.SAVE_ARTICLE,
            data
        }
    }
}

export function newArticleReducer(state=initState,action){
    switch (action.type){
        case actionTypes.UPDATETITLE :
            return {
                ...state,
                title:action.title
            }
        case actionTypes.UPDATEAUTHOR :
            return {
                ...state,
                author:action.author
            }
        case actionTypes.UPDATEDESC :
            return {
                ...state,
                desc: action.desc
            }
        case actionTypes.UPDATEIMGURL :
            return {
                ...state,
                imgUrl:action.imgUrl
            }
        case actionTypes.UPDATEPSTATE :
            return {
                ...state,
                pstate: action.pstate
            }
        case actionTypes.UPDATETAGS : 
            return {
                ...state,
                tags: action.tags
            }
        case actionTypes.UPDATECATEGORY :
            return {
                ...state,
                category: action.category
            }
        case actionTypes.UPDATECONTENT :
            return {
                ...state,
                content: action.content
            }
        case actionTypes.SET_ARTILCE_ID : 
            return {
                ...state,
                id:action.id
            }
        default : 
            return state
    }

}