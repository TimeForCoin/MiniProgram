// pages/ParticipateTask/ParticipateTask.js
const server = require("../../services/server.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 供给选择器
    task_status: ['所有', '等待加入', '拒绝加入', '已关闭', '进行中', '已完成', '已放弃', '任务失败'],
    chosed_status: "请选择",
    // 筛选条件
    status: 'all',
    // 加载动画
    isLoading: false,
    noMore: true,
    // 测试列表
    testList: {
      data: []
    },
    currentPage: 0,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 减少标题内容字数
    this.reduce();
    this.loadTasks(1)
  },

  loadTasks: async function(page) {
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
    const res = await server.request('GET', 'users/task/me', {
      page: this.data.currentPage,
      size: this.data.pageSize,
      status: this.data.status
    })
    let errTitle = ''
    if (res.statusCode === 401) {
      errTitle = "您未登录~"
    } else if (res.statusCode != 200) {
      errTitle = "网络链接失败~"
    }
    if (errTitle === "") {

    } else {
      this.setData({
        failToGetDetail: true
      })
      wx.showToast({
        title: errTitle,
        image: '/images/icons/error.png'
      })
      setTimeout(function() {
        // 返回
        wx.navigateBack({

        })
      }, 1000);
    }
    for (let i in res.data.tasks) {
      if (res.data.tasks[i].images.length == 0) {
        res.data.tasks[i].images = [{
          id: 0,
          url: '/images/icon.png'
        }]
      }
    }
    console.log(res.data.data)
    this.setData({
      testList: {
        data: [...this.data.testList.data, ...res.data.data],
        currentPage: this.data.currentPage
      },
      noMore: this.data.currentPage * this.data.pageSize >= res.data.pagination.total,
      isLoading: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 缩减字数
  reduce: function() {
    var arr = [];
    for (var value of this.data.testList.data) {
      if (value.task.title.length >= 10) {
        value.task.title = value.task.title.substring(0, 10);
        value.task.title = value.task.title + "...";
      }
      if (value.task.content.length > 12) {
        value.task.content = value.task.content.substring(0, 12);
        value.task.content = value.task.content + "...";
      }
      console.log(value.task.title);
      arr.push(value);
    }
    this.data.testList.data = arr;
    this.setData({
      testList: this.data.testList
    });
  },
  // 跳转
  navigateToDetail: function(e) {
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + e.currentTarget.dataset.id,
    })
  },
  change_status: function(e) {
    this.setData({
      chosed_status: this.data.task_status[e.detail.value]
    });
    this.logicalJudge()
  },
  // 搜索前进行逻辑判断
  logicalJudge: function() {
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
    } else if (this.data.chosed_status == '已完成'){
      this.data.status = 'finish'
    }else if (this.data.chosed_status == '已放弃') {
      this.data.status = 'give_up';
    } else if (this.data.chosed_status == '已失败') {
      this.data.status = 'failure';
    } else {
      this.data.status = 'all';
    }
    this.loadTasks(1)

  },
  // 跳转评论
  commentTask: function(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/Comment/Comment?feedback=' + 'true&id=' + e.currentTarget.dataset.id,
    })
  }
})