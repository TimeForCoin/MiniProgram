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
        "status": "wait",
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
        "auto_accept": false,
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
    // 是否点赞
    isLove: false,
    // 是否收藏
    isCollected: false,
    // 是否正在回复
    isReplying: false,
    // 正在回复的评论id
    replyCommentID: "",
    // 正在回复的评论所有者
    replyCommentOwner: "",
    // 评论和回复内容
    comment_content: "",
    reply_content: "",
    // 加载更多评论
    isLoading: false,
    // 没有更多评论内容
    noMoreComment: false,
    // 如果是自己的任务不进行立即加入按钮显示
    isMine: false,
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 进行个人状态判断
    if(options == undefined){

    }else{
      if(options.isMine == undefined){
        this.setData({isMine: false});
      } else{
        if(options.isMine == 'true'){
          this.setData({isMine: true});
        } else{
          this.setData({isMine: false});
        }
      }
    }
    console.log(options.id);
    moment.locale('en', {
      longDateFormat: {
        l: "YYYY-MM-DD",
        L: "YYYY-MM-DD HH:mm"
      }
    });
    this.setData({ publishDate: moment(this.data.testSample.data.publish_date).format('l')});
    this.setData({ startDate: moment(this.data.testSample.data.start_date).format('L') });
    this.setData({ endDate: moment(this.data.testSample.data.end_date).format('L') });
    this.setData({isLove : this.data.testSample.data.like});

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
      // TODO: 在线更新
    }
  },
  // 是否收藏
  clickCollect: function(e) {
    if (this.data.isCollected == true){
      this.setData({isCollected : false});
    } else{
      this.setData({isCollected : true});
      // TODO: 在线更新
    }
  },
  // 评论点赞
  clickCommentLike: function(e) {
    // 记录id
    var id = e.currentTarget.dataset.item;
    var like = e.currentTarget.dataset.like;
    // 重写评论
    var arr = [];
    for(var value of this.data.testComment.data) {
      var item = value;  
      if(item.id == id) {
          if(item.like == true){
            item.like = false;
          } else{
            item.like = true;
          }
        }
        arr.push(item);
    }
    // 重构评论类
    var total = {
      "pagination": {
        "page": this.data.testComment.pagination.page,
        "size": this.data.testComment.pagination.size,
        "total": this.data.testComment.pagination.total
      },
      "data": arr
    };
    this.setData({testComment: total})
    // TODO: 在线更新
  },
  showToast:function(str, src){
    if(src == ""){
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
    }else{
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
  // 回复评论
  clickReply: function(e) {
    this.data.replyCommentID = e.currentTarget.dataset.item;
    this.data.replyCommentOwner = e.currentTarget.dataset.owner;
    console.log(this.data.replyCommentOwner);
    console.log(this.data.replyCommentID);
    this.setData({isReplying: true});
  },
  // 提交回复
  submitRely: function(e) {
    // 评论为空
    if (!/[^\s]+/.test(this.data.reply_content)) {
        this.setData({isReplying: false});
        this.setData({reply_content: ""});
        this.showToast("回复为空", "/images/icons/error.png");
        return;
    }
    var reply = this.data.reply_content;
    reply = "回复@" + this.data.replyCommentOwner + ":" + reply;
    console.log(reply);
    this.setData({isReplying: false});
    // TODO: 在线更新该回复
    this.showToast("回复提交", "");
    this.setData({reply_content: ""});
  },
  // 评论内容刷新
  replyInputChange: function(e) {
    this.setData({reply_content: e.detail.value});
  },
  commentInputChange: function(e) {
    this.setData({comment_content: e.detail.value});
  },
  //提交评论
  submitComment: function(e){
    console.log(this.data.comment_content);
    if (!/[^\s]+/.test(this.data.comment_content)) {
      this.setData({comment_content: ""});
      this.showToast("评论为空", "/images/icons/error.png");
      return;
    }
    // TODO: 在线更新该评论
    console.log(this.data.comment_content);
    this.showToast("评论提交", "");
    this.setData({comment_content: ""});
  },
  // 点击空白取消评论
  cancelReplying: function(e) {
    this.setData({isReplying: false});
    this.setData({reply_content: ""});
  },
  // 拉底刷新内容
  onReachBottom(){
    this.setData({isLoading: true});
  },
  joinin: function(e){
    if(this.data.testSample.data.auto_accept){
      wx.showToast({
        title: '自动加入成功',
      })
      // TODO: 完成加入

    } else{
      wx.navigateTo({
        url: '/pages/Comment/Comment?feedback=' + 'false&id=' + this.data.testSample.data.id,
      })
    }
  }
})