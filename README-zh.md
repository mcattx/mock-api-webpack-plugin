# mock-api-webpack-plugin
 一个用来 mock 数据的 webpack 插件

[English](./README.md)

## 安装

```
npm install -S mock-api-webpack-plugin

```


## 配置

新建一个文件命名为 `mock.config.js` ，然后写入以下内容：

```
const path = require('path')

const config = {
 	'/mock/api': {
    	data: 'path/to/mock-data.json'
  	},
  	...
}

for (let item in config) {
  	if (config.hasOwnProperty(item)) {
    	config[item].path = path.resolve(__dirname, config[item].data)
  	}
}

module.exports = config
```

接着，在你的 `webpack.config.js` 引入 `mock.config.js` 

```
const MockWebpackPlugin = require('mock-api-webpack-plugin')

const mockConfig = require('./mock.config.js')

module.exports = {
	plugins: [
		new MockWebpackPlugin({
	    	config: mockConfig,
	     	port: 3000
	    })
	],
	devServer: {
		// 把所有请求代理到 http://localhost:3000 服务器上。
		proxy: {
	    	'*': 'http://localhost:3000'
	    }
	}
}
```

## Options

```
new MockWebpackPlugin(options)
```

- `options.config`: mock 数据的配置信息
- `options.port`: 代理服务器端口，默认是 3000

## Thanks

The project is inspired by [mock-webpack-plugin](https://github.com/MarxJiao/mock-webpack-plugin) & [mockjs-webpack-plugin](https://github.com/soon08/mockjs-webpack-plugin)
