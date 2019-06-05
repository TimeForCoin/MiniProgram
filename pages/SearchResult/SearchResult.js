// pages/SearchResult/SearchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl1: "/images/icons/top.png",
    daindex1: 0,
    imageurl2: "/images/icons/down.png",
    daindex2: 0
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

  choosesort1: function (e) {
    if (this.data.daindex1 == 0) {
      this.setData({
        imageurl1: "../../img/sort-tip_03.png",
        daindex1: 1
      })
    } else {
      this.setData({
        imageurl1: "../../img/sort-tip_05.png",
        daindex1: 0
      })
    }

  },
  choosesort2: function (e) {
    if (this.data.daindex2 == 0) {
      this.setData({
        imageurl2: "../../img/sort-tip_03.png",
        daindex2: 1
      })
    } else {
      this.setData({
        imageurl2: "../../img/sort-tip_05.png",
        daindex2: 0
      })
    }

  }
})