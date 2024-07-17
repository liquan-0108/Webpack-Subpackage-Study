# Webpack默认分包：将 *动态导入的模块* 中所引入的三方依赖进行分包

    main.js：
    
        console.log('main.js');
        // 动态导入c
        import('../c')
---

    c.js：
        // 引入三方依赖
        import axios from 'axios'

        function getUserAccount() {
            return axios.get('/user/12345');
        }
        getUserAccount()

---
    build结果

        dist/
            ├── 463.js  // 此文件就是 三方依赖axios 的分包
            ├── 32.js  // 此文件就是动态导入的 c.js 模块
            ├── main.js