module.exports = {
    entry: ["./js/webpack_set.js","./js/control.js"],
    output: {
        path: "./production",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};