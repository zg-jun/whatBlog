import { _GET ,Http} from '@service/baseService';

export const getFriends = (plyload) => _GET(Http + '/api/getFriends', plyload);
