// pages/Message/Message.js
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
          "last_time": "2019-06-01 12:00"
        },
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  },
  choocePersonalInfo: function(e){
    this.setData({showSystemInfo: false});
  }
})