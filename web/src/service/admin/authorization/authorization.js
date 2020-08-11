import { _GET } from '@service/baseService';

export const getAdminUser = (plyload) => _GET('/backApi/getAdminUser', plyload);
