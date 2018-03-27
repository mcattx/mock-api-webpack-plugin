# mock-api-webpack-plugin

A webpack plugin for mock data

[中文](./README-zh.md)

## Install

```
npm install --save-dev mock-api-webpack-plugin
```

## Config in webpack.config.js

create a file named `mock.config.js` and write the following code:

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

`Mock`  supports two modes, the first mode is defining the data rules by yourself: 

```
{
    "goodsList": [
        {
            "id": 9956,
            "skuId": 36,
            "name": "Peach"
        },
        {
            "id": 9955,
            "skuId": 36,
            "name": "watermelon"
        },
        {
            "id": 9954,
            "skuId": 36,
            "name": "pineapple"
        }
    ],
    "skuId": 36,
    "isSoldOut": true,
}
```

The second mode is to generate data in a specified rule randomly. You must add `"randomMock": true` to JSON file to take effect. For example: 

```
{
  "randomMock": true,
  "code": 0,
  "result|5": [
    {
      "uid|+1": 1,
      "name": "@name",
      "email": "@email"
    }
  ]
}
```

Learn rules refter to [mockjs wiki](https://github.com/nuysoft/Mock/wiki)

After above, include `mock.config.js` in your `webpack.config.js` and config MockWebpackPlugin.

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

## License

MIT

## Thanks

The project is inspired by [mock-webpack-plugin](https://github.com/MarxJiao/mock-webpack-plugin) & [mock](https://github.com/nuysoft/Mock)
