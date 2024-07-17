# 设置 optimization.splitChunks.chunks 为 'all'


选择对 *同步chunk和异步chunk* 进行优化

    main.js

        import './a'
        import './b'
        import('./c')
---

    a.js

        import './async-20kb+'
---

    b.js

        import './async-20kb+'
        console.log('b.js');

---

    c.js

        import './b'

---
    async-20kb+.js 

---
    build结果

        dist/
            ├── 611.default.js  // 此文件就是从动态导入的 chunk 分出的包
            ├── 897.default.js  // 此文件就是从同步chunk  分出的包
            ├── 964.js // 此文件为动态导入的 c.js 的 chunk
            |__ main.js   // 此文件为符合分包规则的 同步代码 的chunk
