import { _GET } from '@service/baseService';

export const getArticle = (plyload) => _GET('/api/getArticle', plyload);

export const getArticleDetail = (plyload) => _GET('/api/getArticleDetail', plyload);
