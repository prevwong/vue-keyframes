module.exports = {
  // This is the "main" file which should include all other modules
  entry: {
    "app" : './app.js',
  },
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: __dirname + "/build",
    filename: "[name].js"
  },
  module: {
    // Special compilation rules
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel-loader',
        // don't transform node_modules folder (which don't need to be compiled)
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

}