module.exports = {
  entry: {
    index: [
      __dirname + "/src/index.js"
    ],
    flow: [
      __dirname + "/src/flow.js"
    ],
    form1: [
      __dirname + "/src/form1.js"
    ],
    form2: [
      __dirname + "/src/form2.js"
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
  module: {
    rules: [{
      // 拡張子 .ts の場合
      test: /\.ts$/,
      // TypeScript をコンパイルする
      use: "ts-loader"
    }]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts"]
  }
};
