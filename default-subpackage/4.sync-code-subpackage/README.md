# Webpack默认分包：将多个 *动态导入的模块* 中所引入的同一个 *模块* 进行分包

   注意：cacheGroups会 *继承* 来自 splitChunks.* 的任何选项

   受到 *cacheGroups.default.minChunks*、*cacheGroups.default.minSize* 的控制。不满足条件时不会分包。minChunks默认2、minSize默认20kb

---

    main.js：
    
        // 动态导入async1、async1
        import('./async1')
        import('./async2')
---

    async1.js：

        // 引入a.js(20kb大小)
        import './a'
        console.log('async1.js');

---

    async2.js：

        // 也引入a.js(20kb大小)
        import './a'
        console.log('async2.js');

---
    a.js

        console.log('a.js');

---
    build结果

        dist/
            ├── 18.js  // 此文件就是 async1 的分包
            ├── 471.js  // 此文件就是 async2 的分包
            ├── 670.js // 此文件就是 两个chunk都引入的 a.js 的分包
            ├── main.js