import { _PUT, Http } from '@service/baseService'

export const addStatistics = (plyload) =>
  _PUT(Http + '/api/addStatistics', plyload)
