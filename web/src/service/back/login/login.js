import { _POST ,Http } from '@service/baseService';

export const adminLogin = (plyload) => _POST(Http + '/api/adminLogin', plyload);
