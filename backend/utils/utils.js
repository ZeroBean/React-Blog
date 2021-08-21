//处理返回值及其返回状态码

module.exports = {
    responseClient(res,httpCode=500,code=3,message='服务器异常',data={}){
        let responseData = {};
        responseData.code = code;
        responseData.message = message
        responseData.data = data
        res.status(httpCode).json(responseData)
    }
}