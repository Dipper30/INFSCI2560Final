const { RequestNotFoundException } =  require('../exception')

module.exports = function (req, res, next) {
  next(new RequestNotFoundException())
}