const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,          // Handle .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',     // Use Babel to transpile JS/JSX
        },
      },
      {
        test: /\.css$/,               // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,  // Handle image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Allow importing without file extensions
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    hot: true,  // Enable Hot Module Replacement (HMR)
    liveReload: true, // Live reload when non-HMR files are changed
    static: {
      directory: path.join(__dirname, 'dist'),  // Serve static files from 'dist'
    },
    compress: true,
    port: 3000,
    client: {
      overlay: true,  // Display errors as an overlay in the browser
    },
    watchFiles: ['src/**/*.css'],  // Ensure Webpack watches CSS files for changes
  },
  mode: 'development',
};
