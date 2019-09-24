// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const px2remLoader = {
  loader: 'px2rem-loader',
  options: { remUnit: 37.5, remPrecision: 8 }
}
module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'iview',
      'axios',
      'app-sdk',
      'filters',
      'functions',
      'flexible',
      'addressbar-color',
      'swiper',
      'animated',
      'vant',
      'nodata'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      lang: 'zh-hans', // Quasar language
      i18n: 'zh-hans',
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QBtnGroup',
        'QBtnToggle',
        'QToggle',
        'QBtnDropdown',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QFooter',
        'QRouteTab',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QAvatar',
        'QForm',
        'QField',
        'QInput',
        'QSeparator',
        'QPullToRefresh',
        'QInfiniteScroll',
        'QSpinner',
        'QSpinnerIos',
        'QSpinnerDots',
        'QSpinnerTail',
        'QSpinnerGears',
        'QSpinnerComment',
        'QSpinnerHourglass',
        'QChatMessage',
        'QSelect',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QDialog',
        'QRadio',
        'QUploader',
        'QImg',
        'QFab',
        'QFabAction',
        'QPopupProxy',
        'QDate',
        'QTime',
        'QBadge',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QScrollArea',
        'QCheckbox',
        'QOptionGroup',
        'QSpace',
        'QMenu',
        'QTabPanels',
        'QTabPanel',
        'QChip',
        'QTabPanel',
        'QPageScroller',
        'QEditor',
        'QLinearProgress',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QMarkupTable'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog',
        'BottomSheet',
        'LocalStorage',
        'SessionStorage',
        'AddressbarColor'
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        // 加载 px2rem-loader
        cfg.module.rules = cfg.module.rules.map(rule => {
          if (['/\\.css$/', '/\\.styl(us)?$/', '/\\.scss$/', '/\\.sass$/', '/\\.less$/'].includes(rule.test.toString())) {
            rule.oneOf = rule.oneOf.map(oneOf => {
              oneOf.use.splice(3, 0, px2remLoader)
              return oneOf
            })
          }
          return rule
        })
        // 加载 eslint
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'advertask',
        // short_name: 'advertask',
        // description: 'advertask',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'advertask',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'advertask'
      }
    }
  }
}
