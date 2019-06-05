// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    hasUserInfo:false,
    nav_a: [{
      id: 1,
      name: "我发布的"
    }, {
      id: 2,
      name: "我卖出的"
    }, {
      id: 3,
      name: "我买到的"
    }],

    nav_b: [{
      id: 1,
      name: "客服妹妹"
    }, {
      id: 2,
      name: "安全中心"
    }, {
      id: 3,
      name: "我的设置"
    }],
    showModal: true
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

  }
})