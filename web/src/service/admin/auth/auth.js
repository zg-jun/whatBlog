import { _GET ,Http } from '@service/baseService';

export const getAdminUser = (plyload) => _GET(Http +'/backapi/getAdminUser', plyload);
