import Cookies from 'js-cookie'

const iHRM_USER_TOKEN = 'iHRM_USER_TOKEN'

export function getUserToken() {
  return Cookies.get(iHRM_USER_TOKEN)
}

export function setUserToken(token) {
  return Cookies.set(iHRM_USER_TOKEN, token)
}

export function removeUserToken() {
  return Cookies.remove(iHRM_USER_TOKEN)
}
