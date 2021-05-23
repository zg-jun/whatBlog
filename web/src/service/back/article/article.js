import { _GET, _POST, _PUT, _DELETE ,Http} from '@service/baseService';

export const getAllArticle = (plyload) => _GET(Http + '/api/getAllArticle', plyload);

export const addArticle = (plyload) => _POST(Http + '/api/addArticle', plyload);

export const editArticle = (plyload) => _PUT(Http + '/api/editArticle', plyload);

export const showArticle = (plyload) => _PUT(Http + '/api/showArticle', plyload);

export const recoveryArticle = (plyload) => _PUT(Http + '/api/recoveryArticle', plyload);

export const delArticle = (plyload) => _DELETE(Http + '/api/delArticle', plyload);

// 获取所有标签
export const getClassify = (plyload) => _GET(Http + '/api/getClassify', plyload);

