const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')   //单独打包css  webpack4不能用了 可npm install --save-dev extract-text-webpack-plugin@next
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins =  [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

const devServer ={
  port: 3000,
  host: '127.0.0.1',   //0.0.0.0  http://localhost:8080/
  overlay: {
    error: true,
  },
  hot: true
}

let config

if (isDev) {     //开发环境（run dev)
  config = merge(baseConfig,{
    devtool : '#cheap-module-eval-source-map',  //调试器
    module:{
      rules:[
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins:defaultPluins.concat([    //对应上面hot,局部更新组建，不刷新网页
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		])
  })
} else {    //正式环境(run build)
  config = merge(baseConfig,{
    entry : {           //分离JS文件
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output:{
      filename:'[name].[chunkhash:8].js'
    },
    module:{
      rules:[
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins:defaultPluins.concat([
      new ExtractPlugin('styles.[chunkhash:8].css'),    //contentHsah会报错
      // 将类库文件单独打包出来
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
      }),
      // webpack相关的代码单独打包
      new webpack.optimize.CommonsChunkPlugin({
          name: 'runtime'
      })
    ])
  })
	// config.optimization = {
	// 	splitChunks: {
	// 		cacheGroups: {                  // 这里开始设置缓存的 chunks
	// 			commons: {
	// 				chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
	// 				minSize: 0,             // 最小尺寸，默认0,
	// 				minChunks: 2,           // 最小 chunk ，默认1
	// 				maxInitialRequests: 5   // 最大初始化请求书，默认1
	// 			},
	// 			vendor: {
	// 				test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
	// 				chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
	// 				name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
	// 				priority: 10,           // 缓存组优先级
	// 				enforce: true
	// 			}
	// 		}
	// 	},
	// 	runtimeChunk: true
	// }
}


module.exports = config;