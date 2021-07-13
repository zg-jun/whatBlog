import { _GET, _POST, _PUT, Http } from '@service/baseService'

export const getArticle = (plyload) => _GET(Http + '/api/getArticle', plyload)

export const getArticleDetail = (plyload) =>
  _GET(Http + '/api/getArticleDetail', plyload)

export const editViews = (plyload) => _PUT(Http + '/api/editViews', plyload)

// 获取评论
export const getComment = (plyload) => _GET(Http + '/api/getComment', plyload)

// 提交评论
export const addComment = (plyload) => _POST(Http + '/api/addComment', plyload)
