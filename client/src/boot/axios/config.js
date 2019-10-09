export const API_HOST = (process.env.DEV ? {
  ws: 'ws://ws.ad.xioyo.top/',
  http: 'http://api.dev.ad.fumenhu.cn/'
} : {
  ws: 'ws://ws.dev.ad.fumenhu.cn/',
  http: 'http://api.dev.ad.fumenhu.cn/'
})
export const API_VERSION = ''
