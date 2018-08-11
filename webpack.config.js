module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
        
      },
      {
        test: /\.css$/,
        loader:"css-loader"
        
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};