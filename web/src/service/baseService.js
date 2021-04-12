import axios from '@common/lib/https';

export const _GET = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export const _POST = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export const _PUT = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export const _DELETE = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, { params }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export const Http = 'https://whatblog.cn';