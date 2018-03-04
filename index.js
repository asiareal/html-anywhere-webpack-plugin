/*
 * @Author: asiareal 
 * @Date: 2018-03-04 16:49:52 
 * @Last Modified by:   asiareal 
 * @Last Modified time: 2018-03-04 16:49:52 
 */


const CSS_INJECT_FLAG = '<!--{CSS_INJECT_POSITION}-->'
const JS_INJECT_FLAG = '<!--{JS_INJECT_POSITION}-->'

function HtmlAnywherePlugin(options = {}){
  this.options = Object.assign({}, {
    // 暂时没有
  }, options)
}

HtmlAnywherePlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin(
      'html-webpack-plugin-before-html-processing',
      (data, cb) => {
        var html = data.html || ''
        var cssRenderText = this.getCssRenderText(html, data.assets.css)
        var jsRenderText = this.getJsRenderText(html, data.assets.js)

        html = this.inject(html, CSS_INJECT_FLAG, cssRenderText)
        html = this.inject(html, JS_INJECT_FLAG, jsRenderText)

        data.html = html
        cb(null, data)
      }
    )
  })
}

HtmlAnywherePlugin.prototype.inject = function(html, flag, content) {
  if (html.indexOf(flag) > -1) { // 有标记
    html = html.replace(flag, content)
  }
  return html
}

HtmlAnywherePlugin.prototype.getCssRenderText = function(html, css = []) {
  var result = ''
  css.forEach((path) => {
    if (html.indexOf(path) === -1) {
      result += `<link href="${path}" rel="stylesheet">\n`
    }
  })
  return result
}

HtmlAnywherePlugin.prototype.getJsRenderText = function(html, js = []) {
  var result = ''
  js.forEach((path) => {
    if (html.indexOf(path) === -1) {
      result += `<script type="text/javascript" src="${path}"></script>\n`
    }
  })
  return result
}

module.exports = HtmlAnywherePlugin
