// I Comment out publicPath and outputDir because I get an error with linter
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"]
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/pepe-forum/app/'
  //   : '/',
  // outputDir: 'app'
};
