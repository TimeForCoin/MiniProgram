// pages/ParticipateTask/ParticipateTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 供给选择器
    task_status: ['所有', '等待加入', '拒绝加入','已关闭','进行中', '已完成', '已放弃' , '任务失败'],
    chosed_status: "请选择",
    // 筛选条件
    status: "",
    // 加载动画
    isLoading: false,
    noMore: true,
    // 测试列表
    testList: {
      "pagination": {
        "page": 1,
        "size": 3,
        "total": 10
      },
      "data": [
        {
          "status": {
            "task": "5c9ecbbba4a3f52e3195fa68",
            "player": {
              "id": "5c9ecbbba4a3f52e3195fa68",
              "nickname": "tp",
              "avatar": "https://xxx.png",
              "gender": "man",
              "type": "normal",
              "status": "finish",
            },
            
            "note": "我要加入",
            "degree": 100,
            "remark": "很好",
            "score": 100,
            "feedback": "我觉得还行"
          },
          "task": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "publisher": {
              "id": "5c9ecbbba4a3f52e3195fa68",
              "nickname": "tp",
              "avatar": "https://xxx.png",
              "gender": "man",
              "type": "normal"
            },
            "title": "帮我洗澡",
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
            "images": [
              {
                "id": "5c9ecbbba4a3f52e3195fa68",
                "url": "/images/index_sample.jpg"
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
            "comment_count": 30,
            "view_count": 30,
            "collect_count": 30,
            "like_count": 30
          }
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
  // 缩减字数
  reduce: function(){
    var arr = [];
    for(var value of this.data.testList.data){
      if(value.task.title.length >= 10){
        value.task.title = value.task.title.substring(0, 10);
        value.task.title = value.task.title + "...";
      }
      if (value.task.content.length > 12){
        value.task.content = value.task.content.substring(0, 12);
        value.task.content = value.task.content + "...";
      }
      console.log(value.task.title);
      arr.push(value);
    }
    this.data.testList.data = arr;
    this.setData({testList: this.data.testList});
  },
  // 跳转
  navigateToDetail: function(e){
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + e.currentTarget.dataset.id,
    })
  },
  change_status: function (e) {
    this.setData({ chosed_status: this.data.task_status[e.detail.value] });
    console.log(this.data.chosed_status);
    // TODO: 根据列表条件获取
  },
  // 搜索前进行逻辑判断
  logicalJudge: function(){
    if (this.data.chosed_status == '所有') {
      this.data.status = 'all';
    } else if (this.data.chosed_status == '等待加入') {
      this.data.status = 'wait';
    } else if (this.data.chosed_status == '拒绝加入') {
      this.data.status = 'refuse';
    } else if (this.data.chosed_status == '已关闭') {
      this.data.status = 'close';
    } else if (this.data.chosed_status == '进行中') {
      this.data.status = 'running';
    } else if (this.data.chosed_status == '已放弃') {
      this.data.status = 'give_up';
    } else if (this.data.chosed_status == '已失败') {
      this.data.status = 'failure';
    } else {
      this.data.status = 'all';
    }
    console.log(this.data.status);

  },
  // 跳转评论
  commentTask: function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/Comment/Comment?feedback=' + 'true&id=' + e.currentTarget.dataset.id,
    })
  }
})