# Webpack-Subpackage-Study

## 前言
这个项目的主要目的是帮助开发者理解和使用 Webpack 的分包技术。代码分包（Code Splitting）是一种优化 Web 应用性能的重要技术，它可以显著减少初始加载时间，并提高应用的响应速度。

在这个项目中，你将学到：

- 什么是webpack
- webpack的打包过程
- Webpack的默认分包配置
- 使用 Webpack 的 SplitChunksPlugin 进行高级分包配置

帮助你在实际项目中更好地利用 *分包* 优化你的项目。

希望你能在这个学习过程中获得新的知识，并能在你的项目中应用这些技术！

## Webapck
Webpack 就是个打包机，引入[webpack官网](https://webpack.docschina.org/concepts/)的概念如下:
>本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

## Webapck打包过程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数

2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译

3. 确定入口：根据配置中的 entry 找出所有的入口文件

4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系

6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会

7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统


## 分包
### 目的
1. 减少初始加载时间
2. 按需加载
3. 提高缓存的效率
4. 共享代码降低体积

    ...

### 如何分包
>从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks。
### 默认分包

1. 默认会给 ***入口文件*** 生成 **chunk** (Entry Chunk)，有几个 ***入口文件*** 则生成几个 **chunk**。属于 **splitChunks.chunks** 的 ***'initial'*** 类型
2. 默认会给 ***动态模块*** 生成 **chunk** (Dynamic Module Chunk)，有几个 ***动态模块*** 则生成几个 **chunk**。属于 **splitChunks.chunks** 的 ***'async'*** 类型
3. 给2中生成的 **Dynamic Module Chunk** 在进行分割，即 splitChunks 的默认配置

#### splitChunks 的默认配置如下
>它只会影响到按需加载的 chunks。 即仅对 ***动态模块生成的chunk*** 进行再分割 

```js
// webpack.config.js

    module.exports = {
        //...
        optimization: {
            splitChunks: {  // 切分chunk
                chunks: 'async', // 仅仅对 async 类型chunk的起作用
                minSize: 20000,  // chunk最小体积，超出则会分包。默认为 20kb
                minRemainingSize: 0, // 限制拆分chunk后的所剩余最小体积。非dev环境中，它的默认为minSize的值。（比如说200kb的chunk，拆出了199kb，还剩下1kb。该属性限制的就是这个剩余的体积）
                minChunks: 1, // 一个模块至少被多少个chunk引用，超出这个数量则会分包
                maxAsyncRequests: 30, // 定义该chunk中最多异步请求数量。并行加载超过30个请求时，后边的请求需要等待
                maxInitialRequests: 30, // 定义该chunk中初始请求数量。并行加载超过30个请求时，后边的请求需要等待
                enforceSizeThreshold: 50000, // 大于该体积时，强制进行分包即使不满足其他分包条件
                cacheGroups: { // 定义缓存组
                    defaultVendors: {  // 将所有第三方库从dynamic module chunk中抽离出来
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: { // 抽离符合 minChunks 和 minChunks 的公共部分 (注意：cacheGroups.{cacheGroup}会继承splitChunks.*的属性)
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    };
```

## 拓展
### 什么是bundle（最终输出文件）
    bundle是最终输出的文件或文件集合，即dist中的文件，一个bundle是由一个或者多个chunk合并而成

### 什么是chunk（中间产物）
    chunk是构建时生成的中间产物，一个chunk包含一个或多个模块(module)文件

### 什么是module（源文件）
    module是webpack处理的单个文件，可以是 `js/css/图片/json` 等文件。每个模块可以通过 import 或 require 引用其他模块，从而形成依赖关系。
---
### 三者之间的关系
    module ————> chunk  ————> bundle



# 参考
1. [Webpack中文文档](https://webpack.docschina.org/plugins/split-chunks-plugin/#optimizationsplitchunks)
2. 各前端大佬的文章（这个项目阵线拖太长了，好像找不到出处了:sweat_smile:） 



