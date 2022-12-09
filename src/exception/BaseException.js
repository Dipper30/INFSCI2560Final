const { ERROR_TEXT } = require('../constants')

class BaseException extends Error {

  code
  msg

  constructor (code, message) {
    super()
    this.code = code ?? 500
    this.msg = message ?? ERROR_TEXT[this.code]
  }

}

module.exports = BaseException