'use strict'

var trash = require('trash')

module.exports = {
  webpack: function webpack (config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]'
          }
        },
        {
          loader: 'skeleton-loader',
          options: {
            procedure: function procedure (content) {
              var fileName = this._module.userRequest + '.json'
              var classNames = JSON.stringify(require(fileName))

              trash(fileName)

              return [
                'module.exports = {',
                'classNames: ' + classNames + ',',
                'stylesheet: `' + content + '`',
                '}'
              ].join('')
            }
          }
        },
        'postcss-loader'
      ]
    })

    return config
  }
}
