const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = dir => path.join(__dirname, '..', dir)
const utils = require('./utils')

const env = process.env.NODE_ENV === 'testing'
  ? { NODE_ENV: '"testing"' }
  : { NODE_ENV: '"production"' }

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint').CLIEngine.getFormatter('stylish')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: false,
            extract: true
          }),
          cssSourceMap: false,
          cacheBusting: true,
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }, {
        test: /\.css$/,
        // use: ['css-loader', 'autoprefixer-loader']
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.styl/,
        use: ['style-loader', 'css-loader', {
          loader: 'stylus-loader',
          options: {
            import: [path.join(__dirname, '../src/css/quasar.variables.styl')]
          }
        }]
      }, {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {}
        }]
      }, {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }, {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new VueLoaderPlugin()
  ]
}
