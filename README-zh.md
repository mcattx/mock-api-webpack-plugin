# mock-api-webpack-plugin

 一个用来 mock 数据的 webpack 插件

[English](./README.md)

## 安装

```
npm install --save-dev mock-api-webpack-plugin
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

`Mock` 数据支持两种模式，第一种是最常见自定义数据

```
{
    "goodsList": [
        {
            "id": 9956,
            "skuId": 36,
            "name": "水蜜桃"
        },
        {
            "id": 9955,
            "skuId": 36,
            "name": "西瓜"
        },
        {
            "id": 9954,
            "skuId": 36,
            "name": "菠萝"
        }
    ],
    "skuId": 36,
    "isSoldOut": true,
}
```

第二种是随机生成指定格式的数据，这种必须在 `JSON` 文件里加一个 `"randomMock": true` 才会生效。

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

具体的随机生成规则可以看[这里](https://github.com/nuysoft/Mock/wiki)

最后，在你的 `webpack.config.js` 引入 `mock.config.js` 

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

## 选项

```
new MockWebpackPlugin(options)
```

- `options.config`: mock 数据的配置文件

- `options.port`: 代理服务器端口，默认是 3000

## 开源许可

MIT

## 致谢

本项目受 [mock-webpack-plugin](https://github.com/MarxJiao/mock-webpack-plugin) & [MockJS](https://github.com/nuysoft/Mock) 启发而来
