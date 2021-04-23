import { _GET, _PUT ,Http } from '@service/baseService';

export const getArticle = (plyload) => _GET(Http +'/api/getArticle', plyload);

export const getArticleDetail = (plyload) => _GET(Http +'/api/getArticleDetail', plyload);

export const editViews = (plyload) => _PUT(Http + '/api/editViews', plyload);