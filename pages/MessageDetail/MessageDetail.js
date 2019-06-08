// pages/MessageDetail/MessageDetail.js
const moment = require('moment');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testMessageDetail: {
      "count": 123,
      "data": [
        {
          "time": 12344512,
          "title": "系统通知",
          "content": "你好强啊",
          "about": "5c9ecbbba4a3f52e3195fa68"
        }
      ]
    },
    // 对应物品详情
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
    //物品详情图片
    detailImage: '/images/index_sample.jpg',
    isLoading: false,
    noMore: false,
    // 评论和回复内容
    reply_content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    moment.locale('en', {
      longDateFormat: {
        l: "YYYY-MM-DD HH:mm",
        L: "YYYY-MM-DD HH:mm:ss"
      }
    });
    var arr = [];
    for(var value of this.data.testMessageDetail.data){
      // 整数时间才进行显示
      var time = moment(value.time).format('L');
      // 整点判断
      if(time[time.length - 1] == 0 && time[time.length - 2] == 0){
        value.string_time = moment(value.time).format('l');
        value.showTime = true;
      }
      arr.push(value);
    }
    this.data.testMessageDetail.data = arr;
    this.setData({testMessageDetail: this.data.testMessageDetail});

    // TODO: 会话对应任务的获取，保存为testSample

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
  showToast: function (str, src) {
    if (src == "") {
      wx.showToast({
        title: str,
        icon: 'success',//图标，支持"success"、"loading" 
        //image: src,//自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () { },
        fail: function () { },
        complete: function () { }
      });
    } else {
      wx.showToast({
        title: str,
        //icon: 'loading',//图标，支持"success"、"loading" 
        image: src,//自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () { },
        fail: function () { },
        complete: function () { }
      });
    }
  },
  // 提交回复
  submitRely: function (e) {
    // 消息为空
    if (!/[^\s]+/.test(this.data.reply_content)) {
      this.setData({ reply_content: "" });
      this.showToast("消息为空", "/images/icons/error.png");
      return;
    }
    // TODO: 在线更新该回复
    this.showToast("消息提交", "");
    this.setData({ reply_content: "" });
  },
  // 评论内容刷新
  replyInputChange: function (e) {
    this.setData({ reply_content: e.detail.value });
  },
})