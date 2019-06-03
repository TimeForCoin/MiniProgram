//app.js
App({
  onLaunch: function () {
    // wx.hideTabBar();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  //自定义tabbar组件
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
  },

  globalData: {
    userInfo: null,
    tabBar: {
      "list": [{
        "text": "首页",
        "iconPath": "images/icons/home.png",
        "selectedIconPath": "images/icons/home_selected.png",
        "pagePath": "pages/index/index"
      },
      {
        "text": "我的",
        "iconPath": "images/icons/user.png",
        "selectedIconPath": "images/icons/user_selected.png",
        "pagePath": "pages/index/index"

      }],
      "backgroundColor": "#fff",
      "color": "#404969"
    },
  }
})