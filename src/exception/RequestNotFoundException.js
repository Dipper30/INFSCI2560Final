const { ERROR_CODE } = require('../constants')
const BaseException = require('./BaseException')

class RequestNotFoundException extends BaseException {

  constructor (code, message) {
    super(code ?? ERROR_CODE.REQUEST_NOT_FOUND, message)
  }

}

module.exports = RequestNotFoundException