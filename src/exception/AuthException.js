const { ERROR_CODE } = require('../constants')
const BaseException = require('./BaseException')

class AuthException extends BaseException {

  constructor (code, message) {
    super(code ?? ERROR_CODE.AUTH_ERROR, message)
  }

}

module.exports = AuthException