import { _POST } from '@service/baseService';

export const adminLogin = (plyload) => _POST('/backApi/adminLogin', plyload);
