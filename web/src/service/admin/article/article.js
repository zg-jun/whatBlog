import { _GET, _POST, _PUT, _DELETE } from '@service/baseService';

export const getAllArticle = (plyload) => _GET('/backapi/getAllArticle', plyload);

export const addArticle = (plyload) => _POST('/backapi/addArticle', plyload);

export const editArticle = (plyload) => _PUT('/backapi/editArticle', plyload);

export const showArticle = (plyload) => _PUT('/backapi/showArticle', plyload);

export const recoveryArticle = (plyload) => _PUT('/backapi/recoveryArticle', plyload);

export const delArticle = (plyload) => _DELETE('/backapi/delArticle', plyload);
