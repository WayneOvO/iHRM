import Cookies from 'js-cookie'

const iHRM_USER_TOKEN = 'iHRM_USER_TOKEN'
const iHRM_USER_TOKEN_TIMESTAMP = 'iHRM_USER_TOKEN_TIMESTAMP'

export function getUserToken() {
  return Cookies.get(iHRM_USER_TOKEN)
}

export function setUserToken(token) {
  return Cookies.set(iHRM_USER_TOKEN, token)
}

export function removeUserToken() {
  return Cookies.remove(iHRM_USER_TOKEN)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(iHRM_USER_TOKEN_TIMESTAMP)
}

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(iHRM_USER_TOKEN_TIMESTAMP, Date.now())
}
