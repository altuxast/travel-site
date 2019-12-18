const path = require('path');
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app') // returns absolute path
    },
    devServer: {
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0',
        before: function (app, server) {
            server._watch('./app/**/*.html')
        },
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,        // Run if filename ends in css
                use: ['style-loader','css-loader?url=false',{loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
            }
        ]
    }
}