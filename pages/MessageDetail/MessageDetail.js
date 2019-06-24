// pages/MessageDetail/MessageDetail.js
const app = getApp()
const moment = require('moment')
const server = require('../../services/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionData: {},
    testMessageDetail: {
      data: []
    },
    // 对应物品详情
    testSample: {
      data: {}
    },
    //物品详情图片
    isLoading: false,
    noMore: false,
    // 评论和回复内容
    reply_content: "",
  },

  loadMessage: async function(id) {
    const res = await server.request('GET', 'messages/' + id)
    if (res.statusCode == 200) {
      return res.data
    } else {
      this.showToast("获取信息失败", "")
      return {
        data: []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    moment.locale('en', {
      longDateFormat: {
        l: "YYYY-MM-DD HH:mm",
        L: "YYYY-MM-DD HH:mm:ss"
      }
    });
    const res = await this.loadMessage(options.id)
    for (let i in res.data.messages) {
      // 整数时间才进行显示
      var time = moment(res.data.messages[i].time * 1000).format('L');
      // 整点判断
      res.data.messages[i].string_time = moment(res.data.messages[i].time * 1000).format('l');
      if (time[time.length - 1] == 0 && time[time.length - 2] == 0) {
        res.data.messages[i].showTime = true;
      }
      if (res.data.messages[i].user_id === res.data.target_user.id) {
        res.data.messages[i].target_user = res.data.target_user
        res.data.messages[i].self = false
      } else {
        res.data.messages[i].target_user = {
          nickname: app.globalData.userInfo.info.nickname,
          avatar: app.globalData.userInfo.info.avatar
        }
        res.data.messages[i].self = true
      }
    }
    if (res.data.type === 'task') {
      const taskRes = await server.request('GET', 'tasks/' + res.data.target_user.id, {
        brief: true
      })
      if (taskRes.data.images.length == 0) {
        taskRes.data.images = [{
          id: 0,
          url: '/images/icon.png'
        }]
      }
      this.data.testSample.data = taskRes.data
    }
    this.setData({
      sessionData: res.data,
      testMessageDetail: {
        data: res.data.messages.reverse()
      },
      testSample: this.data.testSample,
    });

  },

  onclickTask: function() {
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + this.data.sessionData.target_user.id,
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
  showToast: function(str, src) {
    if (src == "") {
      wx.showToast({
        title: str,
        icon: 'success', //图标，支持"success"、"loading" 
        //image: src,//自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function() {},
        fail: function() {},
        complete: function() {}
      });
    } else {
      wx.showToast({
        title: str,
        //icon: 'loading',//图标，支持"success"、"loading" 
        image: src, //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function() {},
        fail: function() {},
        complete: function() {}
      });
    }
  },
  // 提交回复
  submitRely: function(e) {
    // 消息为空
    if (!/[^\s]+/.test(this.data.reply_content)) {
      this.setData({
        reply_content: ""
      });
      this.showToast("消息为空", "/images/icons/error.png");
      return;
    }
    // TODO: 在线更新该回复
    this.showToast("消息提交", "");
    this.setData({
      reply_content: ""
    });
  },
  // 评论内容刷新
  replyInputChange: function(e) {
    this.setData({
      reply_content: e.detail.value
    })
  },
})