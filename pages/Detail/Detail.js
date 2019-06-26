// pages/Detail/Detail.js
const app = getApp()
const moment = require('moment');
const server = require('../../services/server.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskDetail: {},
    playerStatus: {},
    commentData: {
      data: []
    },
    player_list: [],
    // 日期解析结果
    publishDate: "",
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
    give_up: false,
    // 评论和回复内容
    comment_content: "",
    reply_content: "",
    // 加载更多评论
    isLoading: false,
    // 没有更多评论内容
    noMoreComment: false,
    commentPage: 1,
    commentSize: 10,
    // 如果是自己的任务不进行立即加入按钮显示
    isMine: false,
    taskID: '',
    // 无法获取详情
    failToGetDetail: false,
    selectUser: {},
    editPlayer: false,
    closeBtnText: '关闭任务'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 进行个人状态判断
    if (options == undefined) {

    } else {
      if (options.isMine == undefined) {
        this.setData({
          isMine: false
        });
      } else {
        if (options.isMine == 'true') {
          this.setData({
            isMine: true
          });
        } else {
          this.setData({
            isMine: false
          });
        }
      }
    }
    this.data.taskID = options.id
    moment.locale('zh-cn', {
      longDateFormat: {
        l: "YYYY-MM-DD",
        L: "YYYY-MM-DD HH:mm"
      }
    })
  },
  closeTask: async function() {
    const res = await server.request('PUT', 'tasks/'+this.data.taskID, {
      status: this.data.closeBtnText === '完成任务' ? 'finish': 'close'
    })
    if (res.statusCode === 200) {
      wx.showToast({
        title: '关闭成功',
      })
      this.loadTaskData()
    } else {
      wx.showToast({
        title: '关闭失败',
        icon: 'none'
      })
    }
  },

  loadComments: async function(page) {
    this.setData({
      loadComments: true
    })
    if (page) {
      this.data.commentPage = page
      this.data.commentData.data = []
    } else {
      this.data.commentPage++
    }
    const res = await server.request('GET', 'comments/' + this.data.taskID, {
      page: this.data.commentPage,
      size: this.data.commentSize
    })
    var arr = []
    for(let i in res.data.data){
      if (res.data.data[i].user.id === app.globalData.userInfo.id && res.data.data[i].is_delete === false){
        res.data.data[i].canDelete = true
      } else{
        res.data.data[i].canDelete = false
      }
      if (res.data.data[i].is_delete){
        res.data.data[i].content = '该评论已删除'
      }
      res.data.data[i].isReply = false
      arr.push(res.data.data[i])
      if(!res.data.data[i].reply || res.data.data[i].reply.length <= 0){
        continue
      }else{
        // 重构回复格式，并添加
        for(let j in res.data.data[i].reply){
          if (res.data.data[i].reply[j].user.id === app.globalData.userInfo.id && res.data.data[i].reply[j].is_delete === false) {
            res.data.data[i].reply[j].canDelete = true
          } else {
            res.data.data[i].reply[j].canDelete = false
          }
          var content = res.data.data[i].reply[j].content
          content = '@' + res.data.data[i].user.nickname + ' : ' + content
          res.data.data[i].reply[j].content = content
          if (res.data.data[i].reply[j].is_delete) {
            res.data.data[i].reply[j].content = '该评论已删除'
          }
          res.data.data[i].reply[j].isReply = true
          arr.push(res.data.data[i].reply[j])
        }
      }
    }
    res.data.data = arr
    for (let i in res.data.data) {
      res.data.data[i].time = moment(new Date(res.data.data[i].time * 1000)).locale('zh-cn').startOf('minute').fromNow()
    }
    this.setData({
      commentPage: this.data.commentPage,
      commentData: {
        data: [...this.data.commentData.data, ...res.data.data],
      },
      loadComments: false,
      noMoreComment: res.data.pagination.page * res.data.pagination.size >= this.data.taskDetail.data.comment_count,
      taskDetail: this.data.taskDetail
    })
  },

  loadTaskData: async function() {
    const res = await server.request('GET', 'tasks/' + this.data.taskID)
    // 无法正常获取详情
    if (res.statusCode != 200) {
      this.setData({
        failToGetDetail: true
      })
      wx.showToast({
        title: '无法获取详情',
        image: '/images/icons/error.png'
      })
      setTimeout(function() {
        // 返回
        wx.navigateBack({

        })
      }, 1000);
    } else {
      res.data.titleHeight = (res.data.title.length / 40) > 1 ? (res.data.title.length / 40 * 60) : 60
      this.setData({
        taskDetail: {
          data: res.data
        },
        isMine: res.data.publisher.id === app.globalData.userInfo.id,
        publishDate: moment(new Date(res.data.publish_date * 1000)).format('l'),
        startDate: moment(res.data.start_date * 1000).format('L'),
        endDate: moment(res.data.end_date * 1000).format('L'),
        isLove: res.data.liked,
        isCollected: res.data.collected,
      })
    }
    const res_task = await server.request('GET', 'tasks/' + this.data.taskID + '/player', {
      page: 1,
      size: 10
    })
    this.data.closeBtnText = '完成任务'
    for (let i in res_task.data.data) {
      if (res_task.data.data[i].player.id === app.globalData.userInfo.id) {
        this.data.give_up = res_task.data.data[i].status === 'wait' || res_task.data.data[i].status === 'running'
      }
      if (res_task.data.data[i].status !== 'finish' && res_task.data.data[i].status !== 'failure' &&
        res_task.data.data[i].status !== 'give_up') {
        this.data.closeBtnText = '终止任务'
      }
    }
    this.setData({
      player_list: res_task.data.data,
      give_up: this.data.give_up,
      closeBtnText: this.data.closeBtnText
    })
  },

  onClickPlayer: async function(e) {
    if (this.data.isMine) {
      const index = e.currentTarget.dataset.index
      if (this.data.player_list[index].status === 'running' ||
        this.data.player_list[index].status === 'wait') {
        this.setData({
          selectUser: this.data.player_list[index],
          editPlayer: true
        })
      }
    }
  },

  confirm_status: async function(e) {
    const selectUser = this.data.selectUser
    const status = e.currentTarget.dataset.status
    const res = await server.request('PUT', 'tasks/' + this.data.taskID + '/player/' + selectUser.player.id, {
      status: status
    })
    if (res.statusCode === 200) {
      this.showToast('修改成功')
    } else {
      this.showToast('修改失败', '/images/icons/error.png')
    }
    this.loadTaskData()

    this.cancel_delete(e);
  },
  cancel_delete: function(e) {
    this.setData({
      editPlayer: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    await this.loadTaskData()
    await this.loadComments(1)
  },

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
  // 是否显示其他按钮
  clickMore: function(e) {
    if (this.data.showButtons == false) {
      this.setData({
        showButtons: true
      });
    } else {
      this.setData({
        showButtons: false
      });
    }
  },

  // 是否喜欢
  clickLove: async function(e) {
    if (this.data.isLove == true) {
      const res = await server.request('DELETE', 'tasks/' + this.data.taskID + '/like')
      // 取消点赞失败
      if (res.statusCode != 200) {
        var content = '取消点赞失败'
        // not_allow_status - 此状态不允许点赞
        // faked_task - 任务不存在
        if (res.data.message === 'not_allow_status') {
          content = '此状态不允许点赞'
        } else if (res.data.message === 'faked_like') {
          content = '还没点赞'
        } else if (res.data.message === 'faked_task'){
          content = '任务不存在'
        } else if (res.data.message === 'not_exist' || res.data.message === 'faked_collect') {
          this.setData({
            isLove: false,
            taskDetail: this.data.taskDetail
          })
          return
        }
        wx.showToast({
          title: content,
          image: '/images/icons/error.png'
        })
      } else {
        this.data.taskDetail.data.like_count--
          this.setData({
            isLove: false,
            taskDetail: this.data.taskDetail
          });
      }
    } else {
      const res = await server.request('POST', 'tasks/' + this.data.taskID + '/like')
      // 点赞失败
      if (res.statusCode != 200) {
        var content = '点赞失败'
        // not_allow_status - 此状态不允许点赞
        // faked_task - 任务不存在
        // exist_like  - 任务已经点赞，不能重复点赞
        if (res.data.message === 'not_allow_status') {
          content = '此状态不允许点赞'
        } else if (res.data.message === 'faked_task') {
          content = '任务不存在'
        } else if (res.data.message === 'exist_like') {
          this.setData({
            isLove: true,
            taskDetail: this.data.taskDetail
          })
          return
        }
        wx.showToast({
          title: content,
          image: '/images/icons/error.png'
        })
      } else {
        this.data.taskDetail.data.like_count++
          this.setData({
            isLove: true,
            taskDetail: this.data.taskDetail
          });
      }
    }
  },
  // 是否收藏
  clickCollect: async function(e) {
    if (this.data.isCollected == true) {
      const res = await server.request('DELETE', 'tasks/' + this.data.taskID + '/collect')
      // 取消收藏失败
      if (res.statusCode != 200) {
        var content = '取消收藏失败'
        // not_allow_status - 此状态不允许收藏
        // faked_task - 任务不存在
        if (res.data.message === 'not_allow_status'){
          content = '此状态不允许收藏'
        } else if (res.data.message === 'faked_task'){
          content = '任务不存在'
        } else if (res.data.message === 'not_exist' || res.data.message === 'faked_collect') {
          this.setData({
            isCollected: false,
            taskDetail: this.data.taskDetail
          })
          return
        }
        wx.showToast({
          title: content,
          image: '/images/icons/error.png'
        })
      } else {
        this.data.taskDetail.data.collect_count--
          this.setData({
            isCollected: false,
            taskDetail: this.data.taskDetail
          });
      }
    } else {
      const res = await server.request('POST', 'tasks/' + this.data.taskID + '/collect')
      // 收藏失败
      if (res.statusCode != 200) {
        var content = '收藏失败'
        console.log(res.data)
        // not_allow_status - 此状态不允许收藏
        // faked_task - 任务不存在
        // exist_task - 任务已经收藏，不能重复收藏
        if (res.data.message === 'not_allow_status'){
          content = '此状态不允许收藏'
        } else if (res.data.message ==='faked_task'){
          content = '任务不存在'
        } else if (res.data.message === 'exist_collect'){
          this.setData({
              isCollected: true,
              taskDetail: this.data.taskDetail
          })
          return
        }
        wx.showToast({
          title: content,
          image: '/images/icons/error.png'
        })
      } else {
        this.data.taskDetail.data.collect_count++
          this.setData({
            isCollected: true,
            taskDetail: this.data.taskDetail
          });
      }
    }
  },
  // 评论点赞
  clickCommentLike: async function(e) {
    // 记录id
    const id = e.currentTarget.dataset.item;
    const liked = e.currentTarget.dataset.liked;

    if (liked) {
      const res = await server.request('DELETE', 'comments/' + id + '/like')
      if (res.statusCode != 200) {
        this.showToast('点赞失败', '/images/icons/error.png')
        return
      }
    } else {
      const res = await server.request('POST', 'comments/' + id + '/like')
      if (res.statusCode != 200) {
        this.showToast('取消点赞失败', '/images/icons/error.png')
        return
      }
    }

    // 重写评论
    for (let i in this.data.commentData.data) {
      if (this.data.commentData.data[i].id == id) {
        this.data.commentData.data[i].liked = !liked
        this.data.commentData.data[i].like_count += liked ? -1 : 1
        break
      }
    }
    this.setData({
      commentData: this.data.commentData
    })
  },
  showToast: function(str, src) {
    if (src == "") {
      wx.showToast({
        title: str,
        icon: 'success', //图标，支持"success"、"loading" 
        //image: src,//自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function() {},
        fail: function() {},
        complete: function() {}
      });
    } else {
      wx.showToast({
        title: str,
        //icon: 'loading',//图标，支持"success"、"loading" 
        image: src, //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function() {},
        fail: function() {},
        complete: function() {}
      });
    }
  },
  // 回复评论
  clickReply: function(e) {
    this.data.replyCommentID = e.currentTarget.dataset.item;
    this.setData({
      isReplying: true
    });
  },
  // 提交回复
  submitRely: async function(e) {
    // 评论为空
    if (!/[^\s]+/.test(this.data.reply_content)) {
      this.setData({
        isReplying: false
      });
      this.setData({
        reply_content: ""
      });
      this.showToast("回复为空", "/images/icons/error.png");
      return;
    }
    var reply = this.data.reply_content;
    // reply = "回复@" + this.data.replyCommentOwner + ":" + reply;
    const res = await server.request('POST', 'comments/' + this.data.replyCommentID, {
      type: 'comment',
      content: reply
    })
    if (res.statusCode == 200) {
      this.showToast("回复成功", "")
      this.setData({
        reply_content: "",
        isReplying:false
      })
      this.loadComments(1)
    } else {
      var content = '回复失败'
      if (res.data.message === 'content_too_long') {
        content = '回复内容超过了128个字符'
      } else if (res.data.message === 'now_allow_status') {
        content = '该任务暂时还不能被评论'
      } else if (res.data.message === 'faked_content') {
        content = '被评论内容不存在'
      }
      this.showToast(content, "/images/icons/error.png")
      return
    }
  },
  // 评论内容刷新
  replyInputChange: function(e) {
    this.setData({
      reply_content: e.detail.value
    });
  },
  commentInputChange: function(e) {
    this.setData({
      comment_content: e.detail.value
    });
  },
  //提交评论
  submitComment: async function(e) {
    if (!/[^\s]+/.test(this.data.comment_content)) {
      this.setData({
        comment_content: ""
      });
      this.showToast("评论为空", "/images/icons/error.png");
      return;
    }
    const res = await server.request('POST', 'comments/' + this.data.taskID, {
      type: 'task',
      content: this.data.comment_content
    })
    if (res.statusCode == 200) {
      this.showToast("评论成功", "")
      this.setData({
        comment_content: "",
      })
      this.loadComments(1)
    } else {
      // faked_content - 被评论内容不存在
      // now_allow_status - 该任务暂时还不能被评论
      // content_too_long - 被评论内容超过了128个字符
      var content = '评论失败'
      if (res.data.message === 'content_too_long'){
        content = '被评论内容超过了128个字符'
      } else if (res.data.message === 'now_allow_status'){
        content = '该任务暂时还不能被评论'
      } else if (res.data.message === 'faked_content'){
        content = '被评论内容不存在'
      }
      this.showToast(content, "/images/icons/error.png")
      return
    }
  },
  // 点击空白取消评论
  cancelReplying: function(e) {
    this.setData({
      isReplying: false
    });
    this.setData({
      reply_content: ""
    });
  },
  // 拉底刷新内容
  onReachBottom() {
    if (!this.data.loadComments && !this.data.noMoreComment) {
      this.loadComments()
    }
  },
  joinin: async function(e) {
    if (this.data.taskDetail.data.type === 'questionnaire') {
      wx.navigateTo({
        url: '/pages/Questionnaire/Questionnaire?&id=' + this.data.taskDetail.data.id,
      })

    } else if (this.data.taskDetail.data.auto_accept) {
      const res = await server.request('POST', 'tasks/' + this.data.taskID + '/player', {
        note: ''
      })
      if (res.statusCode !== 200) {
        var content = '加入失败'
        if (res.data.message === 'not_allow_status'){
          content = '任务还没发布'
        } else if (res.data.message === 'faked_task'){
          content = '任务不存在'
        } else if(res.data.message === 'exist_player'){
          content = '您已经参加任务'
        } else if(res.data.message === 'max_player'){
          content = '参加人数到上限'
        }
        this.showToast(content, '/images/icons/error.png')
        return
      } else {
        wx.showToast({
          title: '加入成功'
        })
        this.loadTaskData()
      }
    } else {
      wx.navigateTo({
        url: '/pages/Comment/Comment?feedback=' + 'false&id=' + this.data.taskDetail.data.id,
      })
    }
  },
  exitTask: async function() {
    const res = await server.request('PUT', 'tasks/' + this.data.taskID + '/player/me', {
      status: 'give_up'
    })
    if (res.statusCode === 200) {
      wx.showToast({
        title: '退出成功'
      })
      this.loadTaskData()
    } else {
      wx.showToast({
        title: '退出失败',
        image: '/images/icons/error.png'
      })
      return
    }
  },
  clickConversation: function(){
    wx.navigateTo({
      url: '/pages/MessageDetail/MessageDetail?status=detail&user_id=' + this.data.taskDetail.data.publisher.id + '&taskID=' + this.data.taskID,
    })
  },
  // 删除评论
  clickDelete: async function(e){
    const res = await server.request('DELETE', 'comments/' + e.currentTarget.dataset.item)
    if(res.statusCode === 200){
      wx.showToast({
        title: '删除成功',
      })
    }else{
      // permission_deny - 权限不足
      // not_exist - 评论不存在
      var content = '删除失败'
      if (res.data.message === 'permission_deny'){
        content = '权限不足'
      } else if (res.data.message === 'not_exist'){
        content = '评论不存在'
      }

      wx.showToast({
        title: content,
        image: '/images/icons/error.png'
      })
    }
    await this.loadComments(1)
  }
})