// pages/CollectList/CollectList.js
const server = require('../../services/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_state0: true,
    btn_state1: false,
    // 搜索内容
    typing_content: "",
    isFocus: false,
    // 供给选择器
    task_type:['所有', '跑腿任务', '问卷任务', '信息任务'],
    task_status: ['所有', '执行中', '等待接受', '已关闭','已完成','已过期'],
    task_reward: ['所有','闲钱币','人民币','实物'],
    chosed_type: "请选择",
    chosed_status: "请选择",
    chosed_reward: "请选择",
    // 筛选条件
    type: "all",
    status: "all",
    reward: "all",
    sort: 'new',
    // 加载动画
    isLoading: false,
    noMore: true,
    // 询问是否删除
    isDelete: false,
    delete_id: "",
    // 测试列表
    testList: {
      data: []
    },
    currentPage: 1,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 减少标题内容字数
    this.reduce()
    this.loadTask(1)
  },

  loadTask: async function(page) {
    this.setData({
      isLoading: true,
      noMore: false
    })
    if (page) {
      this.data.currentPage = page
      this.setData({
        testList: {
          data: []
        }
      })
    } else {
      this.data.currentPage++
    }
    const res = await server.request('GET', 'users/collect/me', {
      page: this.data.currentPage,
      size: this.data.pageSize,
      sort: this.data.sort,
      type: this.data.type,
      status: this.data.status,
      reward: this.data.reward
    })
    for (let i in res.data.tasks) {
      if (res.data.tasks[i].images.length == 0) {
        res.data.tasks[i].images = [{
          id: 0,
          url: '/images/icon.png'
        }]
      }
    }
    this.setData({
      testList: {
        data: [...this.data.testList.data, ...res.data.tasks],
        currentPage: this.data.currentPage
      },
      noMore: this.data.currentPage * this.data.pageSize >= res.data.pagination.total,
      isLoading: false,
    })
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
    if (this.data.btn_state1 === true) {
      this.setData({ btn_state0: true, btn_state1: false });
      this.logicalJudge();
    }
  },
  sort_type1: function (e) {
    if (this.data.btn_state0 === true) {
      this.setData({ btn_state0: false, btn_state1: true });
      this.logicalJudge();
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
  // 用户点击回车键进行搜索
  searchResult: function(e){
    this.cleaning();
    this.logicalJudge();
  },
  cleaning: function(e){
    this.setData({ typing_content: "" });
    this.setData({ isFocus: false });
  },
  change_type: function(e){
    if (this.data.chosed_type !== this.data.task_type[e.detail.value]) {
      this.setData({ chosed_type: this.data.task_type[e.detail.value] });
      this.logicalJudge();
    }
  },
  change_status: function (e) {
    this.setData({ chosed_status: this.data.task_status[e.detail.value] });
    this.logicalJudge();
  },
  change_reward: function (e) {
    this.setData({ chosed_reward: this.data.task_reward[e.detail.value] });
    this.logicalJudge();
  },
  // 搜索前进行逻辑判断
  logicalJudge: function(){
    if (this.data.chosed_type == '所有'){
      this.data.type = 'all';
    } else if (this.data.chosed_type == '跑腿任务'){
      this.data.type = 'run';
    } else if (this.data.chosed_type == '问卷任务'){
      this.data.type = 'questionnaire';
    } else if (this.data.chosed_type == '信息任务') {
      this.data.type = 'info';
    } else{
      this.data.type = 'all';
    }

    if (this.data.chosed_status == '所有') {
      this.data.status = 'all';
    } else if (this.data.chosed_status == '草稿') {
      this.data.status = 'draft';
    } else if (this.data.chosed_status == '执行中') {
      this.data.status = 'run';
    } else if (this.data.chosed_status == '等待接受') {
      this.data.status = 'wait';
    } else if (this.data.chosed_status == '已关闭') {
      this.data.status = 'close';
    } else if (this.data.chosed_status == '已完成') {
      this.data.status = 'finish';
    } else if (this.data.chosed_status == '已过期') {
      this.data.status = 'overdue';
    } else {
      this.data.status = 'all';
    }

    if (this.data.chosed_reward == '所有') {
      this.data.reward = 'all';
    } else if (this.data.chosed_reward == '闲钱币') {
      this.data.reward = 'money';
    } else if (this.data.chosed_reward == '人民币') {
      this.data.reward = 'rmb';
    } else if (this.data.chosed_reward == '实物') {
      this.data.reward = 'object';
    } else {
      this.data.reward = 'all';
    }

    this.data.sort = this.data.btn_state0 === true ? 'new':'hot'

    this.loadTask(1)
  },
  // 删除或者置顶
  delete: function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    console.log(e.currentTarget.dataset.status)
    this.setData({ isDelete: true });
    this.data.delete_id = id;
  },
  confirm_delete:function(e){
    console.log(this.data.delete_id);
    this.setData({ isDelete: false });
    wx.showToast({
      title: '删除成功',
    })
     // TODO: 删除对应项
  },
  cancel_delete: function(e) {
    this.setData({isDelete: false});
  }
})