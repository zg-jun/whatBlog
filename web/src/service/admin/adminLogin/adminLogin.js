import { _POST } from '@service/baseService';

export const adminLogin = (plyload) => _POST('/backapi/adminLogin', plyload);
