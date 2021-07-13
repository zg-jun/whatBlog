import { _GET, _POST, _PUT, _DELETE, Http } from '@service/baseService'

// 获取友链
export const getFriends = (plyload) => _GET(Http + '/api/getFriends', plyload)

// 添加友链
export const addFriends = (plyload) => _POST(Http + '/api/addFriends', plyload)

// 编辑友链
export const editFriends = (plyload) => _PUT(Http + '/api/editFriends', plyload)

// 删除友链
export const delFriends = (plyload) =>
  _DELETE(Http + '/api/delFriends', plyload)

// 获取访问记录
export const getStatistics = (plyload) =>
  _GET(Http + '/api/getStatistics', plyload)
