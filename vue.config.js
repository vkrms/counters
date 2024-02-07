const { defineConfig } = require('@vue/cli-service')



module.exports = defineConfig({
  css: {
    sourceMap: true,
  },
  pwa: {
    name: "My PWA name",
    themeColor: "hotpink",
    icons: {
      favicon32: 'img/icons/32.png',
      favicon16: 'img/icons/16.png',
      appleTouchIcon: 'img/icons/StoreLogo.scale-150.png',
    //   maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/144.png'
    }    
  }
})


