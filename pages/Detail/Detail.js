// pages/Detail/Detail.js
const moment = require('moment');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testSample: {
      "data": {
        "id": "5c9ecbbba4a3f52e3195fa68",
        "publisher": {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "nickname": "tp",
          "avatar": "/images/index_sample.jpg",
        },
        "title": "帮我洗澡",
        "content": "过来至二634洗澡澡",
        "location": [
          "中山大学", "中山大学", "中山大学"
        ],
        "tags": [
          "打游戏", "打游戏", "打游戏"
        ],
        "top_time": 1244123123,
        "status": "overdue",
        "type": "info",
        "attachment": [
          {
            "id": "/images/index_sample.jpg",
            "type": "image",
            "name": "秀秀照片",
            "description": "洗澡",
            "size": 147872,
            "time": 123214124,
            "public": false
          },
          {
            "id": "/images/touxiang.jpg",
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
        "auto_accept": true,
        "comment_count": 30,
        "view_count": 30,
        "collect_count": 30,
        "like_count": 30,
        "like": false
      }
    },

    testComment:{
    "pagination": {
      "page": 1,
      "size": 3,
      "total": 10
    },
    "data": [
      {
        "id": "5c9ecbbba4a3f52e3195fa68",
        "content_id": "5c9ecbbba4a3f52e3195fa68",
        "content_own": {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "nickname": "tp",
          "avatar": "/images/index_sample.jpg"
        },
        "content": "你好骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚骚啊",
        "user_id": {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "nickname": "tp",
          "avatar": "/images/index_sample.jpg"
        },
        "reply_count": 1,
        "like": false,
        "like_count": 43,
        "time": 12414324234
      }
    ]
  },
    // 日期解析结果
    publishDate:"",
    startDate: "",
    endDate: "",
    // 决定是否显示按钮
    showButtons: false,
    isLove: false,
    isCollected: false,
    isReplying: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var util = require("/util/moment.js");
    // let timestamp = '1546841820000';//时间戳或者别的格式的时间皆可
    // let time = util.timestampToString(timestamp, 'L');
    this.setData({isLove : this.data.testSample.data.like});
    //this.setData({isCollected : this.data.testSample.data.collect});

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
  // 是否显示其他按钮
  clickMore: function (e) {
    if (this.data.showButtons == false){
      this.setData({showButtons : true});
    } else{
      this.setData({showButtons : false});
    }
  },

  // 是否喜欢
  clickLove: function(e) {
    if (this.data.isLove == true){
      this.setData({isLove : false});
    } else{
      this.setData({isLove : true});
    }
  },
  // 是否收藏
  clickCollect: function(e) {
    if (this.data.isCollected == true){
      this.setData({isCollected : false});
    } else{
      this.setData({isCollected : true});
    }
  }
})