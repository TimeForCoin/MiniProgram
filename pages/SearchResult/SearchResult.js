// pages/SearchResult/SearchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url0: "/images/icons/top.png",
    btn_state0: 0,
    imageurl2: "/images/icons/down.png",
    btn_state1: 0
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

  sort_type0: function (e) {
    if (this.data.btn_state0 == 0) {
      this.setData({
        imageurl1: "../../img/sort-tip_03.png",
        btn_state0: 1
      })
    } else {
      this.setData({
        imageurl1: "../../img/sort-tip_05.png",
        btn_state0: 0
      })
    }

  },
  sort_type1: function (e) {
    if (this.data.btn_state1 == 0) {
      this.setData({
        imageurl2: "../../img/sort-tip_03.png",
        btn_state1: 1
      })
    } else {
      this.setData({
        imageurl2: "../../img/sort-tip_05.png",
        btn_state1: 0
      })
    }
  }
  
})