import { _GET ,Http} from '@service/baseService';


export const playlistDetail = (plyload) => _GET(Http + '/mapi/playlist/detail', plyload);

export const songUrl = (plyload) => _GET(Http + '/mapi/song/url', plyload);

export const getLyric = (plyload) => _GET(Http + '/mapi/lyric',plyload);