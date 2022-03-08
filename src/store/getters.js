const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  userToken: (state) => state.user.userToken
  // avatar: state => state.user.avatar,
  // name: state => state.user.name
}
export default getters
