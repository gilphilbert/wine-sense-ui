module.exports = {
  devServer: {
    port: "8080",
    host: "0.0.0.0",
    //https: true,
    before: function (app) {
      const api = require('./api')(app)
    },
  }
}
