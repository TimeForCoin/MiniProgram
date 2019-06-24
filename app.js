//app.js
const server = require('./services/server.js')
const util = require('./utils/util.js')

App({
  onLaunch: function () {
    this.login()
  },

  login: async function () {
    try {
      const resStatus = await server.request('GET', 'session/status')
      const loginStatus = resStatus.data.status
      if (loginStatus == 'wechat') {
        // 已通过微信登陆
        this.getUserInfo()
      } else if (loginStatus == 'wechat_new') {
        // 微信新用户，未设置信息
      } else {
        // 未登录，立刻登陆
        const res = await util.as(wx.login)
        // console.log(res.code)
        // return
        const resLogin = await server.request('POST', 'session/wechat', {
          code: res.code
        })
        if (resLogin.statusCode == 200 && resLogin.data.new == false) {
          this.getUserInfo()
        }
      }
    } catch (err) {
      console.log('登陆失败', err)
    }
  },

  getUserInfo: async function () {
    const resInfo = await server.request('GET', 'users/info/me')
    this.globalData.userInfo = resInfo.data
    this.globalData.hasUserInfo = true
    return resInfo.data
  },

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
    userInfo: {},
    hasUserInfo: false,
    tabBar: {
      "list": [
        {
          "text": "首页",
          "iconPath": "images/icons/home.png",
          "selectedIconPath": "images/icons/home_selected.png",
          "pagePath": "pages/index/index"
        },
        {
          "text": "发布",
          "iconPath": "images/icons/add.png",
          "selectedIconPath": "images/icons/add_selected.png",
          "pagePath": "pages/AddItem/AddItem"
        },
        {
          "text": "消息",
          "iconPath": "images/icons/message.png",
          "selectedIconPath": "images/icons/message_selected.png",
          "pagePath": "pages/Message/Message"
        },
        {
          "text": "我的",
          "iconPath": "images/icons/user.png",
          "selectedIconPath": "images/icons/user_selected.png",
          "pagePath": "pages/userInfo/userInfo"
        }
      ],
      "backgroundColor": "#fff",
      "color": "#404969",
      "selectedColor": "#ff7e67"
    },
    // 用于跳转草稿
    status:'none',
    taskID:''
  }
})