// pages/Message/Message.js
const app = getApp()
const moment = require('moment');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSystemInfo: false,
    testMessage: {
      "count": 123,
      "data": [
        {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "type": "chat",
          "user": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/index_sample.jpg",
            "gender": "man",
            "type": "normal",
          },
          "last_message": "测试消息",
          "unread": 0,
          "last_time": 123214124,
        },
      ]
    },
    isLoading: false,
    noMore: false,
    //判断是否登录
    hasUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    moment.locale('en', {
      longDateFormat: {
        l: "YYYY-MM-DD",
        L: "YYYY-MM-DD HH:mm"
      }
    });
    // 对所有消息进行处理，加上时间
    var tmp = [];
    for (var value of this.data.testMessage.data){
      value.string_last_time = moment(value.last_time).format('L');
      tmp.push(value);
    }
    this.data.testMessage.data = tmp;
    this.setData({testMessage : this.data.testMessage});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ hasUserInfo: app.globalData.hasUserInfo })
    //登录判断
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '您未登录~',
        image: '/images/icons/error.png'
      })
      setTimeout(function () {
        // 返回
        wx.switchTab({
          url: '/pages/index/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }, 1000);

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*选择个人或者系统信息*/
  chooceSystemInfo: function(e){
    this.setData({ showSystemInfo: true });
    // TODO:在线获取数据并添加时间 string_last_time 可以参照onLoad函数
  },
  choocePersonalInfo: function(e){
    this.setData({showSystemInfo: false});
     // TODO:在线获取数据并添加时间 string_last_time 可以参照onLoad函数
  },
  // 跳转详情
  navigateToMessageDetail: function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;   
    wx.navigateTo({
      url: '/pages/MessageDetail/MessageDetail?id=' + id,
    }) 
  }, 
  // 到达底部刷新
  onReachBottom() {
    // TODO: 刷新内容
    this.setData({ isLoading: true });
  },
})