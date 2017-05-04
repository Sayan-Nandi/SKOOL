
var webpack = require('webpack');
var config = {
   entry: './src/index.js',

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
   devServer: {
      historyApiFallback: true,
      inline: true,
      port: 8080,
    contentBase: './' 
  },
	plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV' : JSON.stringify('production')
      }
    })
  ],
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader', 

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

  module.exports = config;
