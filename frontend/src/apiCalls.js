import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000";

export async function getTags(){
    return axios.get("/getTags")
}

export async function getCats(){
    return axios.get('/getCats')
}

export async function getArticles(pageNum,category_id,tag_id){
    return axios.get(`/getArticle?pageNum=${pageNum}&category_id=${category_id}&tag_id=${tag_id}`)
}


export async function getArticleDetail(id){
    return axios.post('/getArticleDetail',{id})
}

export async function getTimeLine(){
    return axios.get('/getTimeLine')
}