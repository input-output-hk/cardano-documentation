module.exports = function () {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config) {
      return {
        module: {
          rules: [
            {
              test: /\.riv$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'assets',
                    esModule: false,
                  },
                },
              ],
            },
          ],
        },
      }
    },
  }
}
