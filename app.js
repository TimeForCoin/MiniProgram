//app.js
const server = require('./services/server.js')

App({
  onLaunch: function () {
    // wx.hideTabBar();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.login()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // this.getUserInfo() 
        }
      }
    })
  },

  login: async () => {
    // await server.request('DELETE', 'session')
    const resStatus = await server.request('GET', 'session/status')
    if (resStatus.data.status != 'wechat') {
      // 登录
      wx.login({
        success: async (res) => {
          if (res.code) {
            const resLogin = await server.request('GET', 'session/wechat', {
              code: res.code
            })
            if (resLogin.statusCode == 200) {
              if (resLogin.data.new == true) {
                console.log('新用户')
              }
            }
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
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
    hasUserInfo: false,
    sessionId: null,
    major: ["数计院", "管理学院", "岭南学院", "工学院", "微电子学院", "其他"],
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