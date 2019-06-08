// pages/SearchResult/SearchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_state0: true,
    btn_state1: false,
    // 搜索内容
    typing_content: "",
    isFocus: true,

    // 测试列表
    testList: {
      "pagination": {
        "page": 1,
        "size": 3,
        "total": 10
      },
      "data": [
        {
          "id": "5c9ecbbba4a13f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗帮我洗帮我洗帮我洗帮我洗帮洗帮我洗帮我洗帮我洗帮我洗帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "money",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        },
        {
          "id": "5c9ecbbba24a3f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "vtp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗澡",
          "content": "过来至二不来不来不来爱的啊澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
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
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        },
        {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗帮我洗帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "physical",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        }
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 减少标题内容字数
    this.reduce();
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
    if(this.data.btn_state1 == true){
      this.setData({btn_state0: true});
      this.setData({ btn_state1: false });
      // TODO: 获取热门任务
    }
  },
  sort_type1: function (e) {
    if (this.data.btn_state0 == true) {
      this.setData({ btn_state1: true });
      this.setData({ btn_state0: false });
      // TODO: 获取最新任务
    }
  },
  // 缩减字数
  reduce: function(){
    var arr = [];
    for(var value of this.data.testList.data){
      if(value.title.length >= 10){
        value.title = value.title.substring(0, 10);
        value.title = value.title + "...";
      }
      if(value.content.length > 12){
        value.content = value.content.substring(0, 12);
        value.content = value.content + "...";
      }
      console.log(value.title);
      arr.push(value);
    }
    this.data.testList.data = arr;
    this.setData({testList: this.data.testList});
  },
  // 跳转
  navigateToDetail: function(e){
    this.cleaning();
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 检测用户输入
  typing: function(e){
    this.setData({typing_content: e.detail.value});
    this.setData({isFocus: true});
  },
  searchResult: function(e){
    this.cleaning();
  },
  cleaning: function(e){
    this.setData({ typing_content: "" });
    this.setData({ isFocus: false });
  }
})