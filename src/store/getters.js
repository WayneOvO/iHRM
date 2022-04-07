const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  userToken: (state) => state.user.userToken,
  userName: (state) => state.user.userInfo.username,
  userId: (state) => state.user.userInfo.userId,
  staffPhoto: (state) => state.user.userInfo.staffPhoto,
  companyId: (state) => state.user.userInfo.companyId
}
export default getters
