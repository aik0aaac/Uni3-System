module.exports = {
  entry: {
    index: [
      __dirname + "/src/common.js",
      __dirname + "/src/index.js"
    ],
    flow: [
      __dirname + "/src/common.js",
      __dirname + "/src/flow.js"
    ],
    form1: [
      __dirname + "/src/common.js",
      __dirname + "/src/form1.js"
    ],
    form2: [
      __dirname + "/src/common.js",
      __dirname + "/src/form2.js"
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  }
};
