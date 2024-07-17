# 动态导入的情况

 webpack 默认会将**动态导入的module**进行分包处理,然后得到动态导入的chunk,最后生成单独的bundle文件

    本案例中，动态导入b.js文件 `import('../b')`,然后在dist中输出了 `471.js` 文件
---
    main.js：
    
        console.log('main.js');
        import "../a";

        // 动态导入b
        import('../b')


---

    a.js：

        console.log('a.js');

---

    b.js：

        console.log('b.js');

 ---

 结果生成

    dist/
        ├── 471.js  // 此文件就是动态导入的 b.js 模块
        ├── main.js


## 什么是bundle（最终输出文件）
    bundle是最终输出的文件或文件集合，即dist中的文件，一个bundle是由一个或者多个chunk合并而成

## 什么是chunk（中间产物）
    chunk是构建时生成的中间产物，一个chunk包含一个或多个模块(module)的文件

## 什么是module（源文件）
    module是webpack处理的单个文件，可以是 `js/css/图片/json` 文件。每个模块可以通过 import 或 require 引用其他模块，形成依赖关系。
---
## 三者之间的关系
    (多个)module ——生成——> (多个)chunk(多个)  ——生成——> (多个)bundle

