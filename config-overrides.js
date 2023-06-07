
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "assert": require.resolve("assert"),
        "crypto": require.resolve("crypto-browserify"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url"),
        "tls": false,
        "fs": false,
        "path": require.resolve("path-browserify")
    })
    config.resolve.fallback = fallback;

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.plugins.push(new NodePolyfillPlugin())
    return {
        ...config,
        ignoreWarnings: [
            {
                module: /node_modules\/stylis-plugin-rtl/,
            },
        ],
    }
 }
