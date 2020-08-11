import { _GET, _POST, _PUT, _DELETE } from '@service/baseService';

export const getAllArticle = (plyload) => _GET('/backApi/getAllArticle', plyload);

export const addArticle = (plyload) => _POST('/backApi/addArticle', plyload);

export const editArticle = (plyload) => _PUT('/backApi/editArticle', plyload);

export const showArticle = (plyload) => _PUT('/backApi/showArticle', plyload);

export const recoveryArticle = (plyload) => _PUT('/backApi/recoveryArticle', plyload);

export const delArticle = (plyload) => _DELETE('/backApi/delArticle', plyload);
