// pages/Message/Message.js
const app = getApp()
const moment = require('moment')
const server = require('../../services/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSystemInfo: false,
    testMessage: {
      data: []
    },
    systemMessage: [],
    chatMessage: [],
    isLoading: false,
    noMore: false,
    //判断是否登录
    hasUserInfo: false
  },

  loadMessage: async function() {
    const res = await server.request('GET', 'messages')
    for (let i in res.data.data) {
      res.data.data[i].string_last_time =
        moment(res.data.data[i].last_message.time * 1000).format('L');
      if (res.data.data[i].type === 'chat') {
        this.data.chatMessage.push(res.data.data[i])
      } else {
        res.data.data[i].target_user.avatar = '/images/icon.png'
        res.data.data[i].target_user.nickname = '系统'
        this.data.systemMessage.push(res.data.data[i])
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    await this.loadMessage()
    moment.locale('en', {
      longDateFormat: {
        l: "YYYY-MM-DD",
        L: "YYYY-MM-DD HH:mm"
      }
    });
    this.setData({
      testMessage: {
        data: this.data.chatMessage
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo
    })
    //登录判断
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '您未登录~',
        image: '/images/icons/error.png'
      })
      setTimeout(function() {
        // 返回
        wx.switchTab({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }, 1000);

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /*选择个人或者系统信息*/
  chooceSystemInfo: function(e) {
    this.setData({
      testMessage: {
        data: this.data.systemMessage
      },
      showSystemInfo: true
    })
    
  },
  choocePersonalInfo: function(e) {
    this.setData({
      testMessage: {
        data: this.data.chatMessage
      },
      showSystemInfo: false
    });
  },
  // 跳转详情
  navigateToMessageDetail: function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/MessageDetail/MessageDetail?id=' + id,
    })
  },
  // 到达底部刷新
  onReachBottom() {
    // TODO: 刷新内容
    this.setData({
      isLoading: true
    });
  },
})
