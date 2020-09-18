module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/scss/styles.scss";
                `,
            },
        },
    },
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            customFileProtocol: 'chapper://./',
        },
    },
}
