# 设置 optimization.splitChunks.chunks 为 'initial'

仅对 *同步chunk* 进行优化


    main.js

        import './a'
        import './b'
        import('./c')
        console.log('main.js');
---

    a.js

        import './20kb+'
        ...
---

    b.js

        import './20kb+'
        console.log('b.js');

---

    c.js

        import './30kb+.js'
        console.log('c.js');

---
    build结果

        dist/
            ├── 897.default.js  // 此文件就是从同步chunk  分出的包
            ├── 964.js // 此文件为动态导入的 c.js 的 chunk（initial 模式下，不会对该chunk进行分包）
            |__ main.js   // 此文件为符合分包规则的 同步代码 的chunk