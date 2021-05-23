import { _GET ,Http} from '@service/baseService';


export const playlistDetail = (plyload) => _GET(Http + '/mapi/playlist/detail', plyload);

export const songUrl = (plyload) => _GET(Http + '/mapi/song/url', plyload);

export const getLyric = (plyload) => _GET(Http + '/mapi/lyric',plyload);

// 获取文章分类
export const getClassify = (plyload) => _GET(Http + '/api/getClassify',plyload);

// 获取热门文章
export const getHotArticle = (plyload) => _GET(Http + '/api/getHotArticle',plyload);

