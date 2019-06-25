// pages/AddedItems/AddedItems.js
const server = require('../../services/server.js')
const app = getApp()
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
    task_type: ['所有', '跑腿任务', '问卷任务', '信息任务'],
    task_status: ['所有', '草稿', '执行中', '等待接受', '已关闭', '已完成', '已过期'],
    task_reward: ['所有', '闲钱币', '人民币', '实物'],
    chosed_type: "请选择",
    chosed_status: "请选择",
    chosed_reward: "请选择",
    // 筛选条件
    type: "",
    status: "",
    reward: "",
    // 加载动画
    isLoading: false,
    noMore: true,
    // 询问是否删除
    isDelete: false,
    delete_id: "",
    // 测试列表
    currentPage: 1,
    pageSize: 10,
    testList: {
      data: []
    },
    // draft
    draft: false,
    deleteType: 'draft',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 减少标题内容字数
   
    this.data.draft = options.status === 'draft' ? true : false
    this.loadTasks(1, options.status === 'draft' ? 'draft': '')
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
    if(!this.data.noMore){
      this.loadTasks(null, 'draft')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  loadTasks: async function(page, status) {
    if (status !== 'draft') {
      status = 'all'
    }
    this.setData({
      isLoading: true,
      noMore: false
    })
    if (page) {
      this.data.currentPage = page
      this.data.testList.data = []
    } else {
      this.data.currentPage++
    }
    const res = await server.request('GET', 'tasks', {
      page: this.data.currentPage,
      size: this.data.pageSize,
      user: 'me',
      status: status
    })
    // 无法正常获取
    errTitle = ""
    if (res.statusCode === 401) {
      errTitle = "您未登录~"
    }else if (res.statusCode != 200){
      errTitle = "网络链接失败~"
    }
    if(errTitle === ""){

    }else{
      this.setData({
        failToGetDetail: true
      })
      wx.showToast({
        title: errTitle,
        image: '/images/icons/error.png'
      })
      setTimeout(function () {
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
    this.setData({
      testList: {
        data: [...this.data.testList.data, ...res.data.tasks],
        currentPage: this.data.currentPage
      },
      noMore: this.data.currentPage * this.data.pageSize >= res.data.pagination.total,
      isLoading: false,
    })
    this.reduce()
  },

  sort_type0: function(e) {
    this.setData({
      btn_state0: true
    });
    this.setData({
      btn_state1: false
    });

    this.logicalJudge();
    // TODO: 获取热门任务
  },
  sort_type1: function(e) {
    this.setData({
      btn_state1: true
    });
    this.setData({
      btn_state0: false
    });

    this.logicalJudge();
    // TODO: 获取最新任务
  },
  // 缩减字数
  reduce: async function() {
    var arr = [];
    for (var value of this.data.testList.data) {
      if (value.title.length >= 10) {
        value.title = value.title.substring(0, 10);
        value.title = value.title + "...";
      }
      if (value.content.length > 12) {
        value.content = value.content.substring(0, 12);
        value.content = value.content + "...";
      }
      arr.push(value);
    }
    this.data.testList.data = arr;
    this.setData({
      testList: this.data.testList
    });
  },
  // 跳转
  navigateToDetail: function(e) {
    this.cleaning();
    if (this.data.draft){
      app.globalData.status = 'draft'
      app.globalData.taskID = e.currentTarget.dataset.id
      wx.switchTab({
        url: '/pages/AddItem/AddItem'
      })
      wx.switchTab({ url: '/pages/AddItem/AddItem' })
    }else{
      wx.navigateTo({
        url: '/pages/Detail/Detail?id=' + e.currentTarget.dataset.id + '&isMine=' + 'true',
      })
    }
  },
  // 检测用户输入
  typing: function(e) {
    this.setData({
      typing_content: e.detail.value
    });
    this.setData({
      isFocus: true
    });
  },
  // 用户点击回车键进行搜索
  searchResult: function(e) {
    this.cleaning();

    this.logicalJudge();
    // TODO: 任务搜索
  },
  cleaning: function(e) {
    this.setData({
      typing_content: ""
    });
    this.setData({
      isFocus: false
    });
  },
  change_type: function(e) {
    this.setData({
      chosed_type: this.data.task_type[e.detail.value]
    });
  },
  change_status: function(e) {
    this.setData({
      chosed_status: this.data.task_status[e.detail.value]
    });
  },
  change_reward: function(e) {
    this.setData({
      chosed_reward: this.data.task_reward[e.detail.value]
    });
  },
  // 搜索前进行逻辑判断
  logicalJudge: function() {
    if (this.data.chosed_type == '所有') {
      this.data.type = 'all';
    } else if (this.data.chosed_type == '跑腿任务') {
      this.data.type = 'run';
    } else if (this.data.chosed_type == '问卷任务') {
      this.data.type = 'questionnaire';
    } else if (this.data.chosed_type == '信息任务') {
      this.data.type = 'info';
    } else {
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

  },
  // 删除或者置顶
  top_delete: function(e) {
    const id = e.currentTarget.dataset.id
    const status = e.currentTarget.dataset.status
    this.setData({
      isDelete: true,
      deleteType: status,
      delete_id: id,
    });
  },
  confirm_delete: async function(e) {
    if (this.data.deleteType === 'draft') {
      const res = await server.request('DELETE', 'tasks/' + this.data.delete_id)
      if (res.statusCode == 200) {
        this.setData({
          isDelete: false
        });
        wx.showToast({
          title: '删除成功',
        })
      } else {
        wx.showToast({
          title: '删除失败'
        })
      }
    } else if (this.data.deleteType === 'wait') {
      const res = await server.request('PUT', 'tasks/' + this.data.delete_id, {
        status: 'close'
      })
      if (res.statusCode == 200) {
        this.setData({
          isDelete: false
        });
        wx.showToast({
          title: '关闭成功',
        })
      } else {
        wx.showToast({
          title: '关闭失败'
        })
      }
    }
    this.loadTasks(1)
  },
  cancel_delete: function(e) {
    this.setData({
      isDelete: false
    });
  }
})