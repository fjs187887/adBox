import namePwd from './name-pwd'
import phoneNumber from './phone-number'
import { LOGIN_WECHAT, LOGIN_QQ } from 'app/src/boot/app-sdk/login/types'
// import { LOGIN_WECHAT, LOGIN_QQ, LOGIN_WEIBO } from 'app/src/boot/app-sdk/login/types'

export const types = [
  { name: '验证码', component: 'phone-number', icon: 'phone' }
  // ,{ name: '密码', component: 'name-pwd', icon: 'user' }
]
export const thirdPartyLogin = [
  { name: 'QQ', type: LOGIN_QQ, icon: 'statics/login/qq.png' },
  { name: '微信', type: LOGIN_WECHAT, icon: 'statics/login/wx.png' }
  // ,{ name: '微博', type: LOGIN_WEIBO, icon: 'statics/share/sina.png' }
]
export default { namePwd, phoneNumber }
