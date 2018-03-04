# html-anywhere-webpack-plugin

通过设置标记，可以将webpack打包生成的js&css文件，插入到html文件的任何一个地方

`html-webpack-plugin` inject 属性只支持在`head` 和 `body`插入js 和 css 标签。有时候我们更想在我们规定的地方插入对应的标签。`html-anywhere-webpack-plugin`就是帮你解决这个问题的，简单方便。

## 标记
类型 | 标记
---- | ----
js | `<!--{JS_INJECT_POSITION}-->`
css | `<!--{CSS_INJECT_POSITION}-->`

## 使用
`npm install html-anywhere-webpack-plugin --save-dev`

在配置文件中引入

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlAnywhereWebpackPlugin = require('html-anywhere-webpack-plugin')

...
  plugins:[
    ...
    new HtmlWebpackPlugin({
      ...
      inject: false
    }),
    new HtmlAnywhereWebpackPlugin()
  ]
```

然后就可以在html文件的任何一个地方添加标记了，例如：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>title</title>
  <!-- 需要添加这段代码，将打包的css渲染到此处 -->
  <!--{CSS_INJECT_POSITION}-->
</head>
<body>
  <h1>hello single page</h1>
  <!-- 需要添加这段代码，将打包的js渲染到此处 -->
  <!--{JS_INJECT_POSITION}-->
</body>
</html>
```
