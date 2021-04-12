import { _GET, _POST, _PUT, _DELETE ,Http} from '@service/baseService';

export const getAllArticle = (plyload) => _GET(Http + '/backapi/getAllArticle', plyload);

export const addArticle = (plyload) => _POST(Http + '/backapi/addArticle', plyload);

export const editArticle = (plyload) => _PUT(Http + '/backapi/editArticle', plyload);

export const showArticle = (plyload) => _PUT(Http + '/backapi/showArticle', plyload);

export const recoveryArticle = (plyload) => _PUT(Http + '/backapi/recoveryArticle', plyload);

export const delArticle = (plyload) => _DELETE(Http + '/backapi/delArticle', plyload);