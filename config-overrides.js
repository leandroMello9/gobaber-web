const {addBabelPlugin, override} = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    //Nome do plugin do babel
    'babel-plugin-root-import',
    {
      //Nome da pasta onde esta a maioria do codigo da aplicação
      rootPathSuffix: 'src',
      
    }
  ])
)