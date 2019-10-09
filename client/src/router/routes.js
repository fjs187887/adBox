/**
 * 默认路由都需要验证登录状态
 * 如果某路由不需要验证，则在路由的meta对象中添加 "QueryAuth: false" 即可
 * */
const routes = [
  {
    name: 'login',
    path: '/login/:type?',
    meta: { QueryAuth: false },
    component: () => import('pages/Login/index.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/task',
    meta: { QueryAuth: false },
    component: () => import('pages/Layout-footer.vue'),
    children: [
      {
        path: 'task',
        redirect: '/task/hall/task',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/rwhome.vue'),
        children: [
          {
            name: '新人专区',
            path: 'new-user',
            meta: { QueryAuth: false },
            component: () => import('pages/Task/NewUserZone/index.vue')
          },
          {
            name: '任务大厅',
            path: 'hall',
            redirect: '/task/hall/task',
            meta: { QueryAuth: false },
            component: () => import('pages/Task/TaskHall/index.vue'),
            children: [
              {
                name: '分享广告',
                path: 'task',
                meta: { QueryAuth: false },
                component: () => import('pages/Task/TaskHall/task-hall-task.vue')
              },
              {
                name: '小任务',
                path: 'taskmini',
                meta: { QueryAuth: false },
                component: () => import('pages/Task/TaskHall/task-hall-mini.vue')
              },
              {
                name: '团队任务',
                path: 'taskteam',
                meta: { QueryAuth: false },
                component: () => import('pages/Task/TaskHall/task-team.vue')
              }
            ]
          }
        ]
      },
      {
        name: '商家号',
        path: '/business',
        mete: { QueryAuth: false },
        component: () => import('pages/BusinessAccount/Business/index.vue')
      },
      {
        name: 'message',
        path: '/message',
        component: () => import('pages/Message/index.vue')
      },
      {
        name: 'media',
        path: 'media',
        redirect: '/media/self-media',
        meta: { QueryAuth: false },
        component: () => import('pages/Media/merchant-header.vue'),
        children: [
          {
            name: '自媒体',
            path: 'self-media',
            meta: { QueryAuth: false },
            component: () => import('pages/Media/SelfMedia/index.vue')
          },
          {
            name: '内容服务商',
            path: 'merchant',
            meta: { QueryAuth: false },
            component: () => import('pages/Media/Merchant/index.vue')
          }
        ]
      },
      {
        name: 'user',
        path: 'user',
        component: () => import('pages/UserCenter/index.vue')
      }
    ]
  },
  {
    name: 'message-detail',
    path: '/message',
    component: () => import('pages/Layout-header.vue'),
    children: [
      {
        name: 'msg-fans',
        path: 'fans',
        component: () => import('pages/Message/Fans/index.vue')
      },
      {
        name: '公告',
        path: 'gg',
        component: () => import('pages/Notice/gg.vue')
      },
      {
        name: '客服',
        path: 'kefu',
        component: () => import('pages/Notice/kefu.vue')
      },
      {
        name: 'msg-to-session',
        path: ':sid',
        component: () => import('pages/Message/detail/index.vue')
      }, {
        name: 'msg-to-user',
        path: 'user/:uid',
        component: () => import('pages/Message/detail/index.vue')
      }
    ]
  },
  {
    name: 'title-bar',
    path: '',
    meta: { QueryAuth: false },
    component: () => import('pages/Layout-header.vue'),
    children: [
      {
        name: '任务中心',
        path: '/taskcenter',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/NewUserZone/task-center.vue')
      },
      {
        name: '自媒体详情',
        path: '/selfmediadetail',
        meta: { QueryAuth: false },
        component: () => import('pages/Media/SelfMedia/detail.vue')
      },
      {
        name: '服务商详情',
        path: '/merchantdetail',
        meta: { QueryAuth: false },
        component: () => import('pages/Media/Merchant/detail.vue')
      },
      {
        name: '自媒体推广提交',
        path: '/selfmediapromotion',
        meta: { QueryAuth: false },
        component: () => import('pages/Media/SelfMedia/promotion.vue')
      },
      {
        name: '意见反馈',
        path: '/service',
        meta: { QueryAuth: false },
        component: () => import('pages/Service/index.vue')
      },
      {
        name: '服务商推广提交',
        path: '/merchantpromotion',
        meta: { QueryAuth: false },
        component: () => import('pages/Media/Merchant/promotion.vue')
      },
      {
        name: '发布分享广告',
        path: '/releasetask',
        meta: { QueryAuth: false },
        component: () => import('pages/Release/release-task.vue')
      },
      {
        name: '发布小任务',
        path: '/releasetaskmini',
        meta: { QueryAuth: false },
        component: () => import('pages/Release/release-task-mini.vue')
      },
      {
        name: '扫一扫',
        path: '/sweepcode',
        meta: { QueryAuth: false },
        component: () => import('pages/QRCode/sweep-code.vue')
      },
      {
        name: '我的二维码',
        path: '/usercode',
        meta: { QueryAuth: false },
        component: () => import('pages/QRCode/user-code.vue')
      }
    ]
  },
  {
    name: '热文推',
    path: '/taskmain',
    meta: { QueryAuth: false },
    component: () => import('pages/Release/HotText/text-main.vue')
  },
  {
    name: 'task-detail',
    path: '/',
    meta: { QueryAuth: false },
    component: () => import('src/pages/Layout-header.vue'),
    children: [
      {
        name: '任务详情',
        path: '/taskdetail',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/TaskHall/Detail/task-detail.vue')
      },
      {
        name: '小任务详情',
        path: '/taskdetailmini',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/TaskHall/Detail/task-detail-mini.vue')
      },
      {
        name: '小任务提交审核',
        path: '/tasksubmit',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/TaskHall/Detail/task-submit.vue')
      },
      {
        name: '小任务审核详情',
        path: '/submitdetail',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/TaskHall/Detail/submit-detail.vue')
      },
      {
        name: '发布广告详情',
        path: '/releasetaskdetail',
        component: () => import('pages/UserCenter/Release/task/Detail/release-task-detail.vue')
      },
      {
        name: '发布小任务详情',
        path: '/releaseminidetail',
        component: () => import('pages/UserCenter/Release/mini/Detail/release-mini-detail.vue')
      },
      {
        name: '发布任务审核详情',
        path: '/review-detail',
        component: () => import('pages/UserCenter/Release/mini/Review/review-detail.vue')
      },
      {
        name: '发布任务审核',
        path: '/review',
        component: () => import('pages/UserCenter/Release/mini/Review/review.vue')
      },
      {
        name: '热文详情',
        path: '/taskpreview',
        meta: { QueryAuth: false },
        component: () => import('pages/Release/HotText/text-preview.vue')
      },
      {
        name: '广告模板',
        path: '/admould',
        meta: { QueryAuth: false },
        component: () => import('pages/Release/HotText/ad-mould.vue')
      },
      {
        name: '我的热文',
        path: '/myhot',
        meta: { QueryAuth: false },
        component: () => import('src/pages/UserCenter/my-hot.vue')
      },
      {
        name: '零钱',
        path: '/wallet',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Wallet/index.vue')
      },
      {
        name: '提现',
        path: '/cash-out',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Wallet/cash-out.vue')
      },
      {
        name: '收支明细',
        path: '/budget-detailed',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Wallet/budget-detailed.vue')
      },
      {
        name: '收益排行榜',
        path: '/revenue-list',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Wallet/revenue-list.vue')
      },
      {
        name: '账单详情',
        path: '/bill-detail',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/bill/bill-detail.vue')
      }
    ]
  },
  {
    name: '我的任务',
    path: '/',
    meta: { QueryAuth: false },
    component: () => import('pages/Task/TaskHall/MyTask/task-bar.vue'),
    children: [
      {
        name: '分享广告',
        path: 'sharetask',
        redirect: '/sharetask/task-all',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/TaskHall/MyTask/share-task.vue'),
        children: [
          {
            name: '全部',
            path: 'task-all',
            meta: { QueryAuth: false },
            component: () => import('pages/Task/TaskHall/MyTask/task/task-all.vue')
          },
          {
            name: '进行中',
            path: 'task-ing',
            meta: { QueryAuth: false },
            component: () => import('pages/Task/TaskHall/MyTask/task/task-ing.vue')
          },
          {
            name: '已完成',
            path: 'task-finish',
            meta: { QueryAuth: false },
            component: () => import('pages/Task/TaskHall/MyTask/task/task-finish.vue')
          }
        ]
      },
      {
        name: '小任务',
        path: 'minitask',
        redirect: '/minitask/mini-all',
        meta: { QueryAuth: false },
        component: () => import('pages/Task/TaskHall/MyTask/mini-task.vue'),
        children: [
          {
            name: '全部',
            path: 'mini-all',
            component: () => import('pages/Task/TaskHall/MyTask/mini/mini-all.vue')
          },
          {
            name: '待提交',
            path: 'mini-dtj',
            component: () => import('pages/Task/TaskHall/MyTask/mini/mini-dtj.vue')
          },
          {
            name: '待审核',
            path: 'mini-dsh',
            component: () => import('pages/Task/TaskHall/MyTask/mini/mini-dsh.vue')
          },
          {
            name: '已完成',
            path: 'mini-ywc',
            component: () => import('pages/Task/TaskHall/MyTask/mini/mini-ywc.vue')
          },
          {
            name: '不通过',
            path: 'mini-btg',
            component: () => import('pages/Task/TaskHall/MyTask/mini/mini-btg.vue')
          }
        ]
      }
    ]
  },
  {
    name: '发布热文',
    path: '/',
    meta: { QueryAuth: false },
    component: () => import('pages/Release/HotText/text-bar.vue'),
    children: [
      {
        name: '推荐热文',
        path: 'textrecommend',
        redirect: '/textrecommend/text-hot',
        meta: { QueryAuth: false },
        component: () => import('src/pages/Release/HotText/text-recommend.vue'),
        children: [
          {
            name: '全部',
            path: 'text-hot/:category?',
            meta: { QueryAuth: false },
            component: () => import('src/pages/Release/HotText/recommend/text-hot.vue')
          }
        ]
      },
      {
        name: '自选热文',
        path: 'textoptional',
        redirect: '/textoptional/text-hot',
        meta: { QueryAuth: false },
        component: () => import('src/pages/Release/HotText/text-optional.vue'),
        children: [
          {
            name: '全部',
            path: 'text-hot',
            component: () => import('pages/Release/HotText/recommend/text-hot.vue')
          }
        ]
      }
    ]
  },
  {
    name: '通知',
    path: '/',
    meta: { QueryAuth: false },
    component: () => import('pages/Notice/index/notice-bar.vue'),
    children: [
      {
        name: '任务通知',
        path: 'task-notice',
        meta: { QueryAuth: false },
        component: () => import('pages/Notice/index/task-notice.vue')
      },
      {
        name: '审核通知',
        path: 'review-notice',
        meta: { QueryAuth: false },
        component: () => import('pages/Notice/index/review-notice.vue')
      }
    ]
  },
  {
    name: '我的发布',
    path: '/',
    component: () => import('pages/UserCenter/Release/task-bar.vue'),
    children: [
      {
        name: '分享广告',
        path: 'userreleasetask',
        redirect: '/userreleasetask/task-all',
        component: () => import('pages/UserCenter/Release/share-task.vue'),
        children: [
          {
            name: '全部',
            path: 'task-all',
            component: () => import('pages/UserCenter/Release/task/task-all.vue')
          },
          {
            name: '待支付',
            path: 'task-dzf',
            component: () => import('pages/UserCenter/Release/task/task-dzf.vue')
          },
          {
            name: '未开始',
            path: 'task-wks',
            component: () => import('pages/UserCenter/Release/task/task-wks.vue')
          },
          {
            name: '进行中',
            path: 'task-ing',
            component: () => import('pages/UserCenter/Release/task/task-ing.vue')
          },
          {
            name: '已完成',
            path: 'task-ywc',
            component: () => import('pages/UserCenter/Release/task/task-ywc.vue')
          },
          {
            name: '已取消',
            path: 'task-yqx',
            component: () => import('pages/UserCenter/Release/task/task-yqx.vue')
          },
          {
            name: '不通过',
            path: 'task-btg',
            component: () => import('pages/UserCenter/Release/task/task-btg.vue')
          }
        ]
      },
      {
        name: '小任务',
        path: 'userreleaseminitask',
        redirect: '/userreleaseminitask/mini-all',
        component: () => import('pages/UserCenter/Release/mini-task.vue'),
        children: [
          {
            name: '全部',
            path: 'mini-all',
            component: () => import('pages/UserCenter/Release/mini/mini-all.vue')
          }, {
            name: '待支付',
            path: 'mini-dzf',
            component: () => import('pages/UserCenter/Release/mini/mini-dzf.vue')
          }, {
            name: '未开始',
            path: 'mini-wks',
            component: () => import('pages/UserCenter/Release/mini/mini-wks.vue')
          }, {
            name: '进行中',
            path: 'mini-ing',
            component: () => import('pages/UserCenter/Release/mini/mini-ing.vue')
          }, {
            name: '已完成',
            path: 'mini-ywc',
            component: () => import('pages/UserCenter/Release/mini/mini-ywc.vue')
          }, {
            name: '已取消',
            path: 'mini-yqx',
            component: () => import('pages/UserCenter/Release/mini/mini-yqx.vue')
          }, {
            name: '不通过',
            path: 'mini-btg',
            component: () => import('pages/UserCenter/Release/mini/mini-btg.vue')
          }
        ]
      }
    ]
  },
  {
    name: '账单',
    path: '/',
    component: () => import('pages/UserCenter/bill/bill-bar.vue'),
    children: [
      {
        name: '任务',
        path: 'bill-task',
        redirect: '/bill-task/task-all',
        component: () => import('pages/UserCenter/bill/bill-task.vue'),
        children: [
          {
            name: '全部',
            path: 'task-all',
            component: () => import('pages/UserCenter/bill/task/task-all.vue')
          },
          {
            name: '待支付',
            path: 'task-dzf',
            component: () => import('pages/UserCenter/bill/task/task-dzf.vue')
          },
          {
            name: '已支付',
            path: 'task-yzf',
            component: () => import('pages/UserCenter/bill/task/task-yzf.vue')
          },
          {
            name: '已取消',
            path: 'task-yqx',
            component: () => import('pages/UserCenter/bill/task/task-yqx.vue')
          }
        ]
      },
      {
        name: '热文推',
        path: 'bill-hot',
        redirect: '/bill-hot/hot-all',
        component: () => import('src/pages/UserCenter/bill/bill-hot.vue'),
        children: [
          {
            name: '全部',
            path: 'hot-all',
            component: () => import('src/pages/UserCenter/bill/hot/hot-all.vue')
          }, {
            name: '待支付',
            path: 'hot-dzf',
            component: () => import('src/pages/UserCenter/bill/hot/hot-dzf.vue')
          }, {
            name: '已支付',
            path: 'hot-yzf',
            component: () => import('src/pages/UserCenter/bill/hot/hot-yzf.vue')
          }, {
            name: '已取消',
            path: 'hot-yqx',
            component: () => import('src/pages/UserCenter/bill/hot/hot-yqx.vue')
          }
        ]
      }
    ]
  },
  {
    name: '认证',
    path: '/Attestation',
    component: () => import('pages/Layout-header.vue'),
    children: [
      {
        name: '认证中心',
        path: 'index',
        component: () => import('pages/UserCenter/Attestation/index.vue')
      },
      {
        name: '个人认证',
        path: 'personal',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Attestation/personal.vue')
      },
      {
        name: '企业认证',
        path: 'enterprise',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Attestation/enterprise.vue')
      },
      {
        name: '认证审核',
        path: 'examine',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Attestation/examine.vue')
      },
      {
        name: '金币商城',
        path: '/Goldmall',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/index.vue')
      },
      {
        name: '新手指南',
        path: '/Goldmall/guide',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/guide.vue')
      },
      {
        name: '新手指南详情',
        path: '/Goldmall/guide_detail',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/guide_detail.vue')
      },
      {
        name: '签到',
        path: '/Goldmall/signin',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/signin.vue')
      },
      {
        name: '商品详情',
        path: '/Goldmall/details',
        meta: { QueryAuth: true },
        component: () => import('pages/Goldmall/details.vue')
      },
      {
        name: '奖品详情',
        path: '/Goldmall/prize',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/prize_details.vue')
      },
      {
        name: '确认支付',
        path: '/Goldmall/order',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/order.vue')
      },
      {
        name: '参与抽奖人列表',
        path: '/Goldmall/partlist',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/partlist.vue')
      },
      {
        name: '金币收支明细',
        path: '/Goldmall/gold',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/gold_details.vue')
      },
      {
        name: '兑换订单详情',
        path: '/Goldmall/dhdeta',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/dhorderdetail.vue')
      },
      {
        name: '抽奖订单详情',
        path: '/Goldmall/cjdeta',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/cjorderdetail.vue')
      },
      {
        name: '我的佣金券',
        path: '/Ticket',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Ticket/index.vue')
      },
      {
        name: '领券中心',
        path: '/Ticket/neckline',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Ticket/neckline.vue')
      },
      {
        name: '邀请有礼',
        path: '/Invit',
        meta: { QueryAuth: false },
        component: () => import('pages/Invit/index.vue')
      },
      {
        name: '邀请收益',
        path: '/Invit/income',
        meta: { QueryAuth: false },
        component: () => import('pages/Invit/income.vue')
      },
      {
        name: '邀请二维码',
        path: '/Invit/qrcode',
        meta: { QueryAuth: false },
        component: () => import('pages/Invit/qrcode.vue')
      },
      {
        name: '商家号配置详情',
        path: '/shoppingcart/detail',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Shoppingcart/detail.vue')
      },
      {
        name: '商家号粉丝详情',
        path: '/Shoppingcart/fan',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Shoppingcart/fan.vue')
      },
      {
        name: '商家号访客详情',
        path: '/Shoppingcart/visitors',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Shoppingcart/visitors.vue')
      },
      {
        name: '商家号详情',
        path: '/businessaccount/detailtask',
        meta: { QueryAuth: false },
        component: () => import('pages/BusinessAccount/Business/detail-bar.vue'),
        children: [
          {
            name: '分享广告',
            path: '/businessaccount/detailtask',
            meta: { QueryAuth: false },
            component: () => import('pages/BusinessAccount/Business/detail-task.vue')
          },
          {
            name: '小任务',
            path: '/businessaccount/detailmini',
            meta: { QueryAuth: false },
            component: () => import('pages/BusinessAccount/Business/detail-mini.vue')
          },
          {
            name: '小任务',
            path: '/businessaccount/detailteam',
            meta: { QueryAuth: false },
            component: () => import('pages/BusinessAccount/Business/detail-team.vue')
          }
        ]
      },
      {
        name: '我的关注',
        path: '/myattention/index',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Myattention/index.vue')
      }
    ]
  },
  {
    name: '抽奖兑换列表导航',
    path: '/Goldmall/luckDraw',
    redirect: '/Goldmall/luckDraw',
    component: () => import('pages/Goldmall/GoldListBar.vue'),
    children: [
      {
        name: '抽奖订单列表',
        path: '/Goldmall/luckDraw',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/cjorderlist.vue')
      },
      {
        name: '兑换订单列表',
        path: '/Goldmall/exchange',
        meta: { QueryAuth: false },
        component: () => import('pages/Goldmall/dhorderlist.vue')
      }
    ]
  },
  {
    name: 'layout-user',
    path: '/user',
    component: () => import('pages/Layout-header.vue'),
    children: [
      {
        name: 'user-setting',
        path: 'info/setting',
        component: () => import('pages/UserCenter/Info/setting.vue')
      },
      {
        name: 'user-info',
        path: 'info',
        component: () => import('pages/UserCenter/Info/index.vue')
      },
      {
        name: 'user-bind',
        path: 'info/first/:bind_type?/:bind_id?',
        meta: { QueryAuth: false },
        component: () => import('pages/UserCenter/Info/first-update.vue')
      }
    ]
  },
  {
    name: '搜索',
    path: '/search',
    component: () => import('pages/Search/search-bar.vue'),
    children: [
      {
        name: '任务',
        path: 'search-task',
        component: () => import('pages/Search/search-task.vue')
      },
      {
        name: '商家号',
        path: 'search-business',
        component: () => import('pages/Search/search-busins.vue')
      }
    ]
  },
  {
    name: '关于我们',
    path: '/about',
    component: () => import('pages/Layout-header.vue'),
    children: [
      {
        name: '关于我们',
        path: '/about',
        component: () => import('pages/about.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: 'error-404',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
