module.exports = {
  // This is the "main" file which should include all other modules
  entry: {
    "vue-keyframes" : './src/bundle.js',
  },
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: __dirname + "/dist/",
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    // Special compilation rules
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel-loader',
        exclude: /node_modules/
        // don't transform node_modules folder (which don't need to be compiled)
      }
    ]
  },
}