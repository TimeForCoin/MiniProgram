//index.js
//获取应用实例
const app = getApp()
const server = require('../../services/server.js')

Page({
  data: {
    userInfo: {},
    tabbar: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    app.editTabbar();
    server.request('GET', 'users/info/me').then(res => {
      this.setData({
        userInfo: res.data
      })
    })
  },
  setUserInfo: async (e) => {
    console.log(e)
    await server.request('PUT', 'users/info', {
      nickname: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl,
      location: e.detail.userInfo.country
    })
  }
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
 
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
