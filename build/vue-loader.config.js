module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    cssModules:{
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      cameCase: true
    },
    // hotReload: false, //根具环境变量生成
  }
}