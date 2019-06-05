//index.js
//获取应用实例
const app = getApp()
const server = require('../../services/server.js')

Page({
  data: {
    userInfo: {},
    tabbar: {},
    hasUserInfo: false,
    currentTab: 0,
    list_a: [],
    list_b: [],
    Loading: false,
   // canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  },
  // onReady: function () {
  //   var that = this;
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       that.setData({
  //         winWidth: res.windowWidth,
  //         winHeight: res.windowHeight
  //       });
  //     }
  //   });
  // },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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
