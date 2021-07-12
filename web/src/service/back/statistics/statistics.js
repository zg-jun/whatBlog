import { _GET, Http } from '@service/baseService'

export const getStatistics = (plyload) =>
  _GET(Http + '/api/getStatistics', plyload)
