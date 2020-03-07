require('egg').startCluster({
    baseDir: __dirname,
    workers: process.env.WORKERS,
    port: process.env.NODE_ENV === 'production' ? 80 : 7001
})