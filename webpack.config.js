module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './src/scene.ts',

    resolve: {
        extensions: [".ts"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};