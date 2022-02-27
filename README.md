# simple-micro-app

玩具微前端轮子实现

- vue3 主应用
- vue2 子应用 1
- react 子应用 2

- https://juejin.cn/post/6992041506919940109

## 流程

主要使用沙雕 dom 来进行隔离

1.拿到子应用的静态资源。发起请求 这个跟乾坤有点像。都是需要这样。乾坤有一个 html-entry 啥啥的包 专门用来处理 html 的

2.转子应用的标签，将子应用的 head body 等标签正则替换成自定义沙雕 dom

3.处理 js css/ css 直接插入 style

-> 直接通过 HTMLLinkElement HTMLStyleElement HTMLScriptElement 区分类型
-> script 要区分是内部的还是外部的。
-> style 进行样式隔离处理

4. css 直接插入 style 标签 插入自定义 head

5.js 要在应用挂载之后执行

6. css script 都调用 onLoad 。onLoad 内部要识别是第几次。如果是第二次 。说明已经是 script 了

micro-app-head

micro-app-body

这里为什么换成自定义的，暂时没看出为什么。

fetchHtml => formatCss js =>call onLoad => onLoad call mount

## 注意事项

1. 主应用 fetch 子应用的时候会跨域。这里设置允许跨域 。字应用 vue2 是 vue cli 起的。所以有配置。开发环境设置允许，线上部署的时候要注意处理
