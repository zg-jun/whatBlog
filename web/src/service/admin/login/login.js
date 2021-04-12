import { _POST ,Http } from '@service/baseService';

export const adminLogin = (plyload) => _POST(Http + '/backapi/adminLogin', plyload);
