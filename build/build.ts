import path from "path";
import purgecss from "@fullhuman/postcss-purgecss";
import webpack from "webpack";

const config: webpack.Configuration = {
  mode: "production",
  entry: path.join(import.meta.dirname, "../src/index.ts"),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  // Type of purgecss is incorrect here. It can be worked around with:
                  //   (purgecss as unknown as typeof purgecss.default)({...})
                  purgecss({
                    content: ["src/index.ts"],
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(import.meta.dirname, "../dist"),
    filename: "index.js",
  },
};

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err || !stats || stats.hasErrors())
    console.error(err || stats?.compilation.errors);
});
