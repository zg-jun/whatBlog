import { _GET, _PUT } from '@service/baseService';

export const getArticle = (plyload) => _GET('/api/getArticle', plyload);

export const getArticleDetail = (plyload) => _GET('/api/getArticleDetail', plyload);

export const editViews = (plyload) => _PUT('/api/editViews', plyload);

