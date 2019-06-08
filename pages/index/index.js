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
    top_images:[
    { index: 0, url: "/images/touxiang.jpg"} ,
    { index: 1, url: '/images/index_sample.jpg' },
    { index: 2, url: '/images/index_sample.jpg' },
   ],
   top_iamges_size: 3,
   //-------------------用于显示内容-----------------------------
    testList: {
      "pagination": {
        "page": 1,
        "size": 3,
        "total": 10
      },
      "data": [
        {
          "id": "5c9ecbbba4a13f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗帮我洗帮我洗帮我洗帮我洗帮洗帮我洗帮我洗帮我洗帮我洗帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "money",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        },
        {
          "id": "5c9ecbbba24a3f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "vtp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "rmb",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        },
        {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗帮我洗帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "physical",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        }
      ]
    },
    show_list_left: [],
    isLoading: false,
    noMore:false,
  },
  onLoad: function () {
    app.editTabbar();
    server.request('GET', 'users/info/me').then(res => {
      this.setData({
        userInfo: res.data
      })
    })

    // ---- 获取显示列表-----
    var arr = [];
    for(var value of this.data.testList.data){
      // if (value.title.length > 20){
      //   value.title = value.title.substring(0, 18);
      // }
      // value.title = value.title + "...";
      arr.push(value);
      // TODO: 在线获取
    }
    this.setData({show_list_left: arr});
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
  // 点击搜索栏跳转
  navigateToResult: function(e){
    wx.navigateTo({
      url: '/pages/SearchResult/SearchResult',
    })
  },
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
  },
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
  onReachBottom(){
    // TODO: 刷新内容
    this.setData({isLoading: true});
  },
  navigateToDetail: function(e){
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + e.currentTarget.item,
    });
  }
})
