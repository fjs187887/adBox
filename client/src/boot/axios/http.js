import store from 'src/store'
import Http from './http/index'
import { CallAppSdkNoCallback } from '../app-sdk'

export default class {
  constructor () {
    let _http = new Http()
    function _run (type, url, data, callback) {
      if (typeof _http[type] === 'function') {
        return _http[type](url, data, callback)
      }
    }
    Object.defineProperty(this, 'ajax', {
      get: () => function (options, callback) {
        return _run('ajax', options, callback)
      }
    })
    Object.defineProperty(this, 'post', {
      get: () => function (url, data, callback) {
        return _run('post', url, data, callback)
      }
    })
    Object.defineProperty(this, 'get', {
      get: () => function (url, data, callback) {
        return _run('get', url, data, callback)
      }
    })
  }
  login (data, callback) {
    let promise = this.post('login:do', data, callback)
    promise.then(({ data: { errcode, data, message } }) => {
      if (errcode === 0) {
        CallAppSdkNoCallback('saveActFromJS', [data.token, data.id])
      }
    })
    return promise
  }
  loginOut (callback) {
    CallAppSdkNoCallback('saveActFromJS', ['', ''])
    return this.post('login:out', callback)
  }
  getAccess (type, callback) {
    return this.get('user:access.get', { type }, callback)
  }
  getRsaKey (callback) {
    return this.post('login:get-rsa-key', callback)
  }
  loginSmsCode (phone, callback) {
    return this.post('sms-code:login', { phone }, callback)
  }
  updatePhoneSmsCode (phone, callback) {
    return this.post('sms-code:update-phone', { phone }, callback)
  }
  userGetInfo (id, callback) {
    return this.get('user:info-get', { id }, callback)
  }
  userUpdateInfo (data = {}, callback) {
    return this.post('user:info-update', data, callback)
  }
  gettask (data, callback) {
    return this.post('app/task/index', data, callback)
  }
  addtask (data, callback) {
    return this.post('app/task/add', data, callback)
  }
  getbusiness (callback) {
    return this.post('app/business/index', {}, callback)
  }
  getbusinessuser (callback) {
    return this.post('app/business/buser', {}, callback)
  }
  addfans (data, callback) {
    return this.post('app/userfans/add', {}, callback)
  }
  getFansLabel (data, callback) {
    return this.post('app/FansFollw/index', data, callback)
  }
  getSearch (data, callback) {
    return this.post('app/task/search', data, callback)
  }
  clearMessageUnread (sid, callback) {
    return this.post('message:unread.clear', { sid }, callback)
  }
  getMessageUnread (callback) {
    return this.get('message:unread.get', callback)
  }
  startMessageSession (uid, callback) {
    return this.get('message:start', { uid }, callback)
  }
  getMessageSession (page, callback) {
    return this.get('message:sessions.get', { page }, callback)
  }
  getFansSession (page, callback) {
    return this.get('message:fans.get', { page }, callback)
  }
  getSystemSession (data, callback) {
    let ajax = this.get('message:system.get', data, callback)
    ajax.then(({ data: { errcode, data } }) => {
      if (errcode === 0) {
        store.dispatch('setSessionList', { type: 'system', sessions: data })
      }
    })
    return ajax
  }
  getMessageSessionById (sid, callback) {
    return this.get('message:session.get', { sid }, callback)
  }
  getMessages (data, callback) {
    return this.get('message:get', data, callback)
  }
  sendMessage (sid, message, callback) {
    return this.post('message:send', { sid, message }, callback)
  }
  utaskcoupon (data, callback) {
    // http://192.168.1.77/app/task/utaskcoupon
    return this.post('app/task/utaskcoupon', data, callback)
  }
  receive (data, callback) {
    // http://192.168.1.77/app/task/share?tid=13
    return this.post('app/task/receive', data, callback)
  }
  usertask (data, callback) {
    // /app/task/usertask
    return this.post('app/task/usertask', data, callback)
  }
  task (data, callback) {
    // http://ad.cn/app/task/task?tid=36查询发布详情
    return this.post('app/task/task', data, callback)
  }
  alterTaskStatus (data, callback) {
    return this.post('app/task/alter_task_status', data, callback)
  }
  reviewTask (data, callback) {
    return this.post('app/task/review_task', data, callback)
  }
  userReviewTask (data, callback) {
    return this.post('app/task/user_review_task', data, callback)
  }
  agreeTask (data, callback) {
    return this.post('app/task/agree_task', data, callback)
  }
  reviewTaskNumber (data, callback) {
    return this.post('app/task/review_task_number', data, callback)
  }
  reviewInfo (data, callback) {
    return this.post('app/task/review_info', data, callback)
  }
  taskReport (data, callback) {
    return this.post('app/task/task_report', data, callback)
  }
  dataTrend (data, callback) {
    return this.post('app/task/data_trend', data, callback)
  }
  shareInfo (data, callback) {
    return this.post('app/task/share_info', data, callback)
  }
  walletDetail (data, callback) {
    return this.post('app/wallet/detail', data, callback)
  }
  walletRanking (data, callback) {
    return this.post('app/wallet/Ranking', data, callback)
  }
  userOrder (data, callback) {
    return this.post('app/user/order', data, callback)
  }
  userCenter (data, callback) {
    return this.post('app/user/usercenter', data, callback)
  }
  checksta (data, callback) {
    return this.post('app/UserAuthentication/check_isauth', data, callback)
  }
  brokerage (data, callback) {
    return this.post('app/UserCoupon/brokerage', data, callback)
  }
  getHotTextPackages (callback) {
    return this.get('hot-text:packages.get', callback)
  }
  buyHotPackage (data, callback) {
    return this.post('hot-text:packages.buy', data, callback)
  }
  getHotCategory (callback) {
    return this.get('hot-text:category.get', callback)
  }
  getHotRecommend (category, page, callback) {
    return this.get('hot-text:recommend.get', { category, page }, callback)
  }
  getHotStatistics (callback) {
    return this.get('hot-text:statistics', callback)
  }
  getHotMyself (page, callback) {
    return this.get('hot-text:myself.get', { page }, callback)
  }
  getHotContent (source, callback) {
    return this.get('hot-text:content.get', { source }, callback)
  }
  getHotAds (page, callback) {
    return this.get('hot-text:ads.get', { page }, callback)
  }
  addHotAd (ad, callback) {
    return this.post('hot-text:ads.add', ad, callback)
  }
  delHotAd (id, callback) {
    return this.post('hot-text:ads.del', { id }, callback)
  }
  publishHot (id, setting, type, callback) {
    return this.post('hot-text:content.publish', { id, setting }, callback)
  }
}
