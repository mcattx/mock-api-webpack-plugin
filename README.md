# mock-api-webpack-plugin
A webpack plugin for mock data

[中文](./README-zh.md)

## Install

```
npm install -S mock-api-webpack-plugin

```


## Config in webpack.config.js

create a file named `mock.config.js`

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

After above, include `mock.config.js` in your `webpack.config.js` .

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
		// proxy to the mock server
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

- `options.config`: mock config file
- `options.port`: port of mock server

## Thanks

The project is inspired by [mock-webpack-plugin](https://github.com/MarxJiao/mock-webpack-plugin) & [mockjs-webpack-plugin](https://github.com/soon08/mockjs-webpack-plugin)
