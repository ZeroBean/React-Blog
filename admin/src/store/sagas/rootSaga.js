 import { all } from "redux-saga/effects"
 import { loginflow,user_auth } from "./loginSaga"
 import { getAllTagsFlow,add_TagFlow,delTagFlow, } from "./tagSaga"
 import { getAllCatsFlow,add_CatFlow,delCatFlow} from './catSaga'
 import { saveArticle_flow } from "./newArticleSaga"
 import { getArticleList_flow,editAritcle_flow,deleteArticle_flow } from "./articleListSaga"

 export default function* rootSaga(){
    //  yield fork(loginflow)
    yield all([
        loginflow(),
        getAllTagsFlow(),
        add_TagFlow(),
        delTagFlow(),
        user_auth(),
        getAllCatsFlow(),
        add_CatFlow(),
        delCatFlow(),
        saveArticle_flow(),
        getArticleList_flow(),
        editAritcle_flow(),
        deleteArticle_flow(),
    ])
 }

 