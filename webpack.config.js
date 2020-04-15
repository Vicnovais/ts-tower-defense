module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './src/tower.ts',

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