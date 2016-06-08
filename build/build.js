{
  appDir: '../',
  // baseUrl: '../static/js',
  mainConfigFile: '../static/js/config.js',
  dir: '../../xuehaidaohang_dist',
  optimize: 'uglify',
  // optimizeCss: 'standard.keepLines',
  // removeCombined: true,
  fileExclusionRegExp: /^\./,
  modules: [
    {
      name: './config',
      include:['jquery','bootstrap']
    },
    {
      name: './personal-account',
      include:['./app/personal-account-main'],
      exclude:['./config']
    }
  ]
}
