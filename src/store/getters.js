const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  userToken: (state) => state.user.userToken,
  userName: (state) => state.user.userInfo.username
  // avatar: state => state.user.avatar,
}
export default getters
