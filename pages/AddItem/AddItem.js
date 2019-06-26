// pages/AddItem/AddItem.js
const app = getApp()
const server = require('../../services/server.js')
const util = require('../../utils/util.js')
const moment = require('moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    describe: "",
    type: "run",
    reward: "money",
    reward_value: 0,
    reward_object: "",
    reward_input: "",
    location_input: "",
    location: [],
    tags: [],
    tags_input: "",
    start_date: 0,
    end_date: 0,
    startDate: "2019-06-02",
    endDate: "2019-06-01",
    startTime: "00:00",
    endTime: "00:00",
    max_player_input: "",
    max_player: 0,
    auto_in: [{
        val: '是',
        checked: 'true'
      },
      {
        val: '否'
      },
    ],
    auto_accept: true,
    publish: true,
    images: [],
    errStr: "",
    isErr: false,
    isSubmit: false,
    isSave: false,
    file: {},
    // 图像src
    addedImages: [],
    isDelete: false,
    // 删除图像的id
    delete_id: -1,
    hasUserInfo: false,
    // 判断是否是修改的
    draft: false,
    taskID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.resetForm()
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
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo
    })
    //登录判断
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '您未登录~',
        image: '/images/icons/error.png'
      })
      setTimeout(function() {
        // 返回
        wx.switchTab({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }, 1000);
    }

    // 草稿修改数据
    if (app.globalData.status === 'draft') {
      app.globalData.status = 'none'
      this.resetForm()
      this.data.draft = true
      this.data.taskID = app.globalData.taskID
      await this.loadTaskData()
    }
  },
  loadTaskData: async function() {
    const res = await server.request('GET', 'tasks/' + this.data.taskID)
    moment.locale('zh-cn', {
      longDateFormat: {
        l: "YYYY-MM-DD",
        L: "HH:mm"
      }
    })
    this.setData({
      isSubmit: false,
      isSave: false,
      title: res.data.title,
      describe: res.data.content,
      type: res.data.type,
      reward: res.data.reward,
      reward_object: res.data.reward_object,
      reward_value: res.data.reward_value,
      reward_input: "",
      location_input: "",
      location: res.data.location,
      tags_input: "",
      tags: res.data.tags,
      start_date: res.data.start_date,
      end_date: res.data.end_date,
      max_player: res.data.max_player,
      startDate: moment(res.data.start_date * 1000).format('l'),
      endDate: moment(res.data.end_date * 1000).format('l'),
      startTime: moment(res.data.start_date * 1000).format('L'),
      endTime: moment(res.data.end_date * 1000).format('L'),
      max_player_input: res.data.max_player,
      addedImages: res.data.images,
      auto_accept: res.data.auto_accept,
    })
    this.data.id = res.data.id
    
    if (this.data.auto_accept === true) {
      this.setData({
        auto_in: [{
            val: '是',
            checked: 'true'
          },
          {
            val: '否'
          },
        ],
      })
    } else {
      this.setData({
        auto_in: [{
            val: '是'
          },
          {
            val: '否',
            checked: 'true'
          },
        ],
      })
    }

    if(this.data.location != null){
      for (var val of this.data.location) {
        this.data.location_input = this.data.location_input + val + ','
      }

    }
    this.data.tags_input = ""
    if(this.data.tags != null){
      for (var val of this.data.tags) {
        this.data.tags_input = this.data.tags_input + val + ','
      }
    }
    if (this.reward === 'object') {
      this.data.reward_input = this.data.reward_object
    } else {
      this.data.reward_input = this.data.reward_value
    }

    
    this.setData({
      location_input: this.data.location_input,
      tags_input: this.data.tags_input,
      reward_input: this.data.reward_input
    })

    // this.setData({

    //   publishDate: moment(new Date(res.data.publish_date * 1000)).format('l'),
    //   startDate: moment(res.data.start_date * 1000).format('L'),
    //   endDate: moment(res.data.end_date * 1000).format('L'),
    //   isLove: res.data.liked,
    //   isCollected: res.data.collected,
    // })
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
        wx.switchTab({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }, 1000);
    }
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

  /*修改标题*/
  titleChange: function(e) {
    this.data.title = e.detail.value;
  },

  describeChange: function(e) {
    this.data.describe = e.detail.value
  },

  /*修改任务分类*/
  chooseRun: function(e) {
    this.setData({
      type: "run"
    })
  },

  chooseInfo: function(e) {
    this.setData({
      type: "info"
    })
  },

  /*修改酬劳分类*/
  chooseMoney: function(e) {
    this.setData({
      reward: "money"
    })
  },

  chooseRmb: function(e) {
    this.setData({
      reward: "rmb"
    })
  },

  chooseObject: function(e) {
    this.setData({
      reward: "object"
    })
  },

  priceChange: function(e) {
    this.setData({
      reward_input: e.detail.value
    });
    if (this.data.reward == "object") this.data.reward_object = this.data.reward_input;
    else this.data.reward_value = parseInt(this.data.reward_input);
    if (isNaN(this.data.reward_value)){
      this.data.reward_value = -1
    }
  },

  splitData: function(str) {
    var origin = str.split(/[,|，| ]/);
    var arr = [];
    for (var val of origin) {
      if (val != "" && val != undefined) {
        arr.push(val);
      }
    }
    return arr;
  },
  locationChange: function(e) {
    this.data.location = this.splitData(e.detail.value);
    this.setData({
      location_input: e.detail.value
    })
  },

  max_playerChange: function(e) {
    this.setData({
      max_player_input: e.detail.value
    });
    this.data.max_player = parseInt(this.data.max_player_input);
    if (isNaN(this.data.max_player)) {
      this.data.max_player = -1
    }
  },

  tagsChange: function(e) {
    this.data.tags = this.splitData(e.detail.value)
    this.setData({
      tags_input: e.detail.value
    })
  },

  changeBeginDate(e) {
    this.setData({
      startDate: e.detail.value
    });
  },
  changeEndDate(e) {
    this.setData({
      endDate: e.detail.value
    });
  },

  changeBeginTime(e) {
    this.setData({
      startTime: e.detail.value
    });
  },
  changeEndTime(e) {
    this.setData({
      endTime: e.detail.value
    });
  },
  changePlayerNum(e) {
    this.setData({
      max_player: e.detail.value
    });
  },

  /*修改是否自动同意*/
  auto_inChange: function(e) {
    if (e.detail.value == '是') this.data.auto_accept = true;
    else this.data.auto_accept = false
  },
  judgeValid: function(e) {
    // 空判断
    if (!/[^\s]+/.test(this.data.title)) {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "标题为空"
      });
      return false;
    }

    if (!/[^\s]+/.test(this.data.describe)) {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "内容为空"
      });
      return false;
    }

    if (this.data.max_player <= 0) {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "人数上限输入错误"
      });
      return false;
    }

    if (this.data.reward_value <= 0 && (this.data.reward == "money" || this.data.reward == "rmb")) {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "交易金额输入错误"
      });
      return false;
    }

    if (!/[^\s]+/.test(this.data.reward_object) && this.data.reward == "object") {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "交易物品输入错误"
      });
      return false;
    }

    if (!/[^\s]+/.test(this.data.location)) {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "地点为空"
      });
      return false;
    }

    var st = new Date(this.data.startDate + 'T' + this.data.startTime + ":00");
    var et = new Date(this.data.endDate + 'T' + this.data.endTime + ":00");
    // 时间错误
    if (et.getTime() / 1000 <= st.getTime() / 1000) {
      this.setData({
        isErr: true
      });
      this.setData({
        errStr: "时间输入错误"
      });
      return false;
    }
    return true;
  },
  makeFile: function(flag) {

    const imagesId = []
    for (let image of this.data.addedImages) {
      imagesId.push(image.id)
    }


    // 生成json
    this.data.file = {
      "title": this.data.title,
      "content": this.data.describe,
      "images": this.data.images,
      "type": this.data.type,
      "reward": this.data.reward,
      "reward_value": this.data.reward_value,
      "reward_object": this.data.reward_object,
      "location": this.data.location,
      "tags": this.data.tags,
      "start_date": this.data.start_date,
      "end_date": this.data.end_date,
      "max_player": this.data.max_player,
      "auto_accept": this.data.auto_accept,
      "publish": flag,
      "images": imagesId
    }
  },
  /*提交*/
  formSubmit: function(e) {
    this.publishTask(e, true)

  },
  /*保存为草稿*/
  formReset: function(e) {
    this.publishTask(e, false)
  },

  publishTask: async function(e, isPublish) {
    if (!this.judgeValid(e)) return;
    var st = new Date(this.data.startDate + 'T' + this.data.startTime + ":00");
    var et = new Date(this.data.endDate + 'T' + this.data.endTime + ":00");
    this.data.start_date = st.getTime() / 1000;
    this.data.end_date = et.getTime() / 1000;
    this.makeFile(isPublish);
    if (this.data.draft) {
      this.data.file.status = 'wait'
    }
    try {
      const res = await server.request(this.data.draft ? 'PUT' : 'POST', 'tasks' + (this.data.draft ? ('/' + this.data.taskID) : ''), this.data.file)
      if (res.statusCode === 200) {
        id = this.data.id
        draft = this.data.draft
        if (!isPublish) {
          this.setData({
            isSave: true
          });
        } else {
          this.setData({
            isSubmit: true
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/Detail/Detail?id=' + (draft ? id : res.data.id) + '&isMine=' + 'true',
            })
          }, 1000)
        }
      } else {
        // faked_file - 图片 / 文件不存在
        // permission_deny - 不允许添加他人的附件
        // error_file_type - 文件类型(图片 / 附件)错误
        // not_allow_date - 不允许结束日期小于开始日期
        // title_too_long - 任务标题不能超过32个字符
        // content_too_long - 任务内容不能超过256个字符
        // reward_object_too_long - 任务酬劳不能超过32个字符
        // location_too_long - 任务地点不能超过64个字符
        // tag_too_long - 任务标签不能超过16个字符
        var result = "未知错误"
        if (res.data.message === 'faked_file'){
          result = "图片 / 文件不存在"
        } else if (res.data.message === 'permission_deny'){
          result = "不允许添加他人的附件"
        } else if (res.data.message === 'error_file_type') {
          result = "文件类型(图片 / 附件)错误"
        } else if (res.data.message === 'not_allow_date') {
          result = "不允许结束日期小于开始日期"
        } else if (res.data.message === 'title_too_long') {
          result = "任务标题不能超过32个字符"
        } else if (res.data.message === 'content_too_long') {
          result = "任务内容不能超过256个字符"
        } else if (res.data.message === 'reward_object_too_long') {
          result = "任务酬劳不能超过32个字符"
        } else if (res.data.message === 'location_too_long') {
          result = "任务地点不能超过64个字符"
        } else if (res.data.message === 'tag_too_long') {
          result = "任务标签不能超过16个字符"
        } else if (res.data.message === 'no_money') {
          result = "爸爸请充值！"
        }
        this.setData({
          isErr: true
        });
        this.setData({
          errStr: result
        });
      }
    } catch (err) {
      console.log(err)
    }


  },

  /*确认*/
  confirm: function(e) {
    if (this.data.isErr) {
      this.setData({
        isErr: false,
        errStr: ""
      })
    }
    if (this.data.isSubmit || this.data.isSave) {
      this.resetForm()
    }
  },
  resetForm: function() {
    const startTime = moment(new Date().getTime() + 1000 * 60 * 60)
    const endTime = moment(new Date().getTime() + 1000 * 60 * 60 * 6)
    this.setData({
      isSubmit: false,
      isSave: false,
      title: "",
      describe: "",
      type: "run",
      reward: "money",
      reward_object: "",
      reward_value: 0,
      reward_input: "",
      location_input: "",
      location: [],
      tags_input: "",
      tags: [],
      start_date: 0,
      end_date: 0,
      max_player: 0,
      startDate: startTime.format("YYYY-MM-DD"),
      endDate: endTime.format("YYYY-MM-DD"),
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
      max_player_input: "",
      addedImages: [],
      auto_accept: true,
      auto_in: [{
          val: '是',
          checked: 'true'
        },
        {
          val: '否'
        },
      ],
    })
  },
  save: function(e) {

  },
  // 添加图片
  addImage: async function(e) {
    try {
      const res = await util.as(wx.chooseImage, {
        count: 4 - this.data.addedImages.length,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'] // 可以指定来源是相册还是相机，默认二者都有
      })
      wx.showLoading({
        title: '正在上传',
        mask: true
      })
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      let tempFilePaths = res.tempFilePaths;
      for (var value of tempFilePaths) {
        if (this.data.addedImages.length >= 4) {
          wx.showToast({
            title: '最多上传四张',
            image: '/images/icons/error.png',
            mask: true,
            duration: 1000
          })
          break;
        } else {
          try {
            const resImage = await server.uploadFile(value, 'image')
            const resData = JSON.parse(resImage.data)
            this.data.addedImages.push({
              id: resData.id,
              url: value
            })
          } catch (err) {
            wx.showToast({
              title: '上传失败',
              image: '/images/icons/error.png'
            })
          }
          wx.hideLoading()
        }
      }
      this.setData({
        addedImages: this.data.addedImages
      })
    } catch (err) {
      console.log(err)
    }

  },

  // 删除图片
  deleteImage: function(e) {
    var id = e.currentTarget.dataset.index;
    this.setData({
      isDelete: true,
      delete_id: id
    });
  },
  confirm_delete: async function(e) {
    const id = this.data.delete_id
    if (id == -1) return
    const imageId = this.data.addedImages[id].id
    try {
      await server.request('DELETE', 'file/' + imageId)
    } catch (error) {
      // 删除失败
      console.log(err)
    }
    this.data.addedImages.splice(id, 1)
    this.setData({
      addedImages: this.data.addedImages
    })

    this.cancel_delete(e);
  },
  cancel_delete: function(e) {
    this.setData({
      isDelete: false
    });
  }


})