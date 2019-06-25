//index.js
//获取应用实例
const app = getApp()
const server = require('../../services/server.js')
const util = require('../../utils/util.js')

Page({
  data: {
    tabbar: {},
    currentTab: 0,
    top_images: [],
    top_iamges_size: 3,
    show_list_left: [],
    show_list_right: [],
    isLoading: false,
    noMore: false,
    currentPage: 1,
    pageSize: 8,
    // 是否显示公告图片
    showImg: false
  },
  onLoad: async function() {
    app.editTabbar();
    this.loadTaskList(1);
    const res = await server.request('GET', 'article',{
      page: 1,
      size: 3
    })
    if(res.statusCode === 200){
      if(res.data.data.length === 0){
        this.setData({ showImg: false })  
      } else{
        var index = 0
        for(var val of res.data.data){
          var tmp = {
            index: index,
            url:val.images[0].url
          }
          index = index + 1
          top_images.push(tmp)
        }
        this.setData({
          top_images: this.data.top_images,
          showImg: true
        })
      }

    }else{
      this.setData({showImg: false})
    }
  },
  // 加载任务列表 
  loadTaskList: async function(page, type = 'all') {
    this.setData({
      isLoading: true,
      noMore: false,
    });
    if (page !== undefined) {
      this.data.currentPage = page
      this.setData({
        show_list_left: [],
        show_list_right: []
      });
    } else {
      this.data.currentPage++
    }
    let res = await server.request('GET', 'tasks', {
      page: this.data.currentPage,
      size: this.data.pageSize,
      type: type
    })
    let isLeft = true
    for (let task of res.data.tasks) {
      // 添加默认图片
      if (task.images.length == 0) {
        task.images.push({
          id: 0,
          url: '/images/icon.png'
        })
      }
      if (isLeft) {
        this.data.show_list_left.push(task)
      } else {
        this.data.show_list_right.push(task)
      }
      isLeft = !isLeft
    }
    this.setData({
      show_list_left: this.data.show_list_left,
      show_list_right: this.data.show_list_right,
      isLoading: false,
      noMore: res.data.pagination.total <= this.data.currentPage * this.data.pageSize
    });
  },
  // 点击搜索栏跳转
  navigateToResult: function(e) {
    wx.navigateTo({
      url: '/pages/SearchResult/SearchResult',
    })
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  // 点击tab切换
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      switch (e.target.dataset.current) {
        case '0':
          this.loadTaskList(1);
          break;
        case '1':
          this.loadTaskList(1, 'run');
          break;
        case '2':
          this.loadTaskList(1, 'info');
          break;
        case '3':
          this.loadTaskList(1, 'questionnaire');
          break;
      }
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onReachBottom() {
    if (this.data.isLoading == false && this.data.noMore === false) {
      this.loadTaskList()
    }
  },
  navigateToDetail: function(e) {
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + e.currentTarget.dataset.item,
    })
  }
})