module.exports = {
    entry: './main',
    output:{
        clean:true
    },
    optimization:{
        splitChunks:{
            chunks: 'all', // 可处理同步、异步代码
            minChunks: 1, // 一个模块至少被两个不同的chunk引用才会分包
            minSize:20000, // 引入模块的体积至少为20kb才会被分包（符合四舍五入规则，19.5kb的也会被分包）
            maxSize:500000, // 大于该体积的chunk将进行分割，会增加打包的数量，需要大于minSize
            cacheGroups:{
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,   
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    filename:'[name].default.js',
                    // reuseExistingChunk: true,// 若chunk中已存在某个模块，则直接重用，而不是生成新的模块
                },
            }
        }
    }
}