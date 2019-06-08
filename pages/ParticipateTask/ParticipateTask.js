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
          "task": "5c9ecbbba4a3f52e3195fa68",
          "owner": "5c9ecbbba4a3f52e3195fa68",
          "status": "running",
          "note": "我要加入",
          "degree": 100,
          "remark": "很好",
          "score": 100,
          "feedback": "我觉得还行"
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

  }
})