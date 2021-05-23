import { _GET,_POST,_PUT,_DELETE ,Http } from '@service/baseService';

// 获取管理员
export const getAdminUser = (plyload) => _GET(Http +'/api/getAdminUser', plyload);
// 添加管理员
export const addAdminUser = (plyload) => _POST(Http +'/api/addAdminUser', plyload);
// 编辑管理员
export const editAdminUser = (plyload) => _PUT(Http +'/api/editAdminUser', plyload);
// 删除管理员
export const delAdminUser = (plyload) => _DELETE(Http +'/api/delAdminUser', plyload);
