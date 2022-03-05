const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "owl.js",
    path: path.resolve(__dirname, "./"),
  },
};