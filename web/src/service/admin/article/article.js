import { _POST } from '@service/baseService';

export const addArticle = (plyload) => _POST('/backApi/addArticle', plyload);
