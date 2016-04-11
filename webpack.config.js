module.exports = {
    entry: ["./js/control.js"],
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