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
    hasUserInfo: false,
    currentPage: 1,
    touch:{
      x: 0,
      y: 0
    }
  },
  removeText: function(text) {
    text = text.replace(/\ +/g, ""); //去掉空格
    text = text.replace(/[ ]/g, "");    //去掉空格
    text = text.replace(/[\r\n]/g, ""); //去掉回车换行
    return text;
  },
  // 减少字数
  reduce: function(text, len){
    if (text.length > len) {
      text = text.substr(0, len) + '...'
    }
    return text
  },
  loadMessage: async function(page) {
    this.setData({
      isLoading: true
    })
    if(page != null){
      this.data.currentPage = page
      this.data.systemMessage = []
      this.data.chatMessage = []
    } else{
      this.data.currentPage++
    }
    const res = await server.request('GET', 'messages',{
      page: this.data.currentPage,
      size: 10
    })
    this.setData({
      isLoading :false
    })
    if(res.statusCode !== 200){
      this.setData({hasUserInfo: false})
      wx.showToast({
        title: '网络错误',
        icon: '',
        image: '/images/icons/error.png',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      this.setData({
        noMore: true
      })
      return
    }
    if(!res.data.data || res.data.data.length === 0){
      this.setData({noMore: true})
      this.data.currentPage--
      return
    }
    moment.locale('en', {
      longDateFormat: {
        l: "MM-DD",
        L: "MM-DD HH:mm"
      }
    })
    for (let i in res.data.data) {
      res.data.data[i].string_last_time =
        moment(res.data.data[i].last_message.time * 1000).format('L');
      res.data.data[i].last_message.content = this.removeText(res.data.data[i].last_message.content) 
      res.data.data[i].last_message.content = this.reduce(res.data.data[i].last_message.content, 30)
      res.data.data[i].target_user.nickname = this.reduce(res.data.data[i].target_user.nickname, 14)
      if (res.data.data[i].type === 'chat') {
        this.data.chatMessage.push(res.data.data[i])
      } else {
        res.data.data[i].target_user.avatar = '/images/icon.png'
        this.data.systemMessage.push(res.data.data[i])
      }

    }
    if(!this.data.showSystemInfo){
      this.setData({
        testMessage: {
          data: this.data.chatMessage
        }
      })
    } else{
      this.setData({
        testMessage:{
          data: this.data.systemMessage
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
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

    await this.loadMessage(1)
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
  onPullDownRefresh: async function () {
    if(!this.data.isLoading){
      await this.loadMessage(null)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /*选择个人或者系统信息*/
  chooceSystemInfo: async function(e) {
    this.setData({
      showSystemInfo: true
    })
    await this.loadMessage(1)
  },
  choocePersonalInfo: async function(e) {
    this.setData({
      showSystemInfo: false
    })
    await this.loadMessage(1)
  },
  // 跳转详情
  navigateToMessageDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/MessageDetail/MessageDetail?session_id=' + id + '&status=message',
    })
  },
  // 开始监听活动
  touchStart: function (e) {
    this.setData({
      touch: {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    })
  },
  // 结束监听活动
  touchEnd: async function (e) {
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    if (Math.abs(this.data.touch.x - x) > 50) {
      if (x < this.data.touch.x) {
        if(this.data.showSystemInfo){

        }else{
          this.setData({showSystemInfo: true})
          await this.loadMessage(1)
        }
      } else if (this.data.touch.x < x) {
        if (!this.data.showSystemInfo) {

        } else {
          this.setData({ showSystemInfo: false })
          await this.loadMessage(1)
        }
      }
      // 重新加载

    } else { }
    switch (this.data.currentTab) {
      case '0':
        this.loadTaskList(1);
        break;
      case '1':
        this.loadTaskList(1, 'run');
        break;
      case '2':
        this.loadTaskList(1, 'info');
        break;
      case '3':
        this.loadTaskList(1, 'questionnaire');
        break;
    }
  }
})