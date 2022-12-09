const ERROR_CODE = {

  SERVER_ERROR: 500, // 服务器内部错误

  // common error code
  TOKEN_ERROR: 1000, // token默认错误
  PARAMETER_ERROR: 1005, // 参数错误
  DATABASE_ERROR: 1006,

  USER_ERROR: 2000, // 权限默认错误
  AUTH_ERROR: 2020, // 权限错误
  ROLE_ERROR: 2030, // 角色错误

  REQUEST_NOT_FOUND: 4004, // 请求未被正确路由接收
}

const ERROR_TEXT = {
  [ERROR_CODE.SERVER_ERROR]: 'Server Error',
  [ERROR_CODE.TOKEN_ERROR]: 'Token Error',
  [ERROR_CODE.PARAMETER_ERROR]: 'Parameter Error',
  [ERROR_CODE.DATABASE_ERROR]: 'Database Error',

  [ERROR_CODE.USER_ERROR]: 'User Error',
  [ERROR_CODE.USER_EXSITS]: 'User Already Exists',
  [ERROR_CODE.USER_NOT_FOUND]: 'User Not Found',
  [ERROR_CODE.AUTH_ERROR]: 'Auth Error',
  [ERROR_CODE.ROLE_ERROR]: 'Role Error',

  [ERROR_CODE.EMAIL_ERROR]: 'Email Error',
  [ERROR_CODE.REQUEST_NOT_FOUND]: 'Request Not Responding',
}

module.exports = {
  ERROR_CODE,
  ERROR_TEXT
}