// pages/AddItem/AddItem.js
const server = require('../../services/server.js')
const util = require('../../utils/util.js')

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
    startDate: "2019-06-01",
    endDate: "2019-06-01",
    startTime: "00:00",
    endTime:"00:00",
    max_player_input: "",
    max_player: 0,
    auto_in:[
      { val:'是', checked:'true'},
      { val:'否'},
    ],
    auto_accept: true,
    publish: true,
    attachment: [],
    errStr: "",
    isErr: false,
    isSubmit: false,
    isSave: false,
    file : {},
    // 图像src
    addedImages:[],
    isDelete: false,
    // 删除图像的id
    delete_id: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /*修改标题*/
  titleChange: function (e) {
    this.data.title = e.detail.value;
    console.log("title:" + this.data.title);
  },

  describeChange: function (e) {
    this.data.describe = e.detail.value;
    console.log("describe:" + this.data.describe);
  },

  /*修改任务分类*/
  chooseRun: function (e) {
    this.setData({ type: "run" });
    console.log("选择跑腿");
  },

  chooseInfo: function (e) {
    this.setData({ type: "info" });
    console.log("选择信息");
  },

  /*修改酬劳分类*/
  chooseMoney: function (e) {
    this.setData({ reward: "money" });
    console.log("选择money");
  },

  chooseRmb: function (e) {
    this.setData({ reward: "rmb" });
    console.log("选择rmb");
  },

  choosePhysical: function (e) {
    this.setData({ reward: "physical" });
    console.log("选择physical");
  },

  priceChange: function(e){
    this.setData({reward_input: e.detail.value});
    if (this.data.reward == "physical") this.data.reward_object = this.data.reward_input;
    else this.data.reward_value = parseInt (this.data.reward_input);
    console.log("reward_value:" + this.data.reward_value);
    console.log("reward_object:" + this.data.reward_object);
  },

  splitData: function(str){
    var origin = str.split(/[,|，]/);
    var arr = [];
    for (var val of origin) {
      if (val != "" && val != undefined) {
        arr.push(val);
      }
    }
    return arr;
  },
  locationChange: function(e){
    this.data.location = this.splitData(e.detail.value);
    this.setData({location_input: e.detail.value});
    console.log("number of logs:" + this.data.location.length);
    console.log("location: " + this.data.location);
  },

  max_playerChange: function(e){
    this.setData({max_player_input: e.detail.value});
    this.data.max_player = parseInt(this.data.max_player_input);
    console.log("max_player:" + this.data.max_player);
  },
  
  tagsChange: function(e){
    this.data.tags = this.splitData(e.detail.value);
    console.log("number of logs:" + this.data.tags.length);
    this.setData({ tags_input: e.detail.value});
    console.log("tags:" + this.data.tags);
  },
  
  changeBeginDate(e) {
    this.setData({ startDate: e.detail.value });
  },
  changeEndDate(e) {
    this.setData({ endDate: e.detail.value });
  },

  changeBeginTime(e) {
    this.setData({ startTime: e.detail.value });
  },
  changeEndTime(e) {
    this.setData({ endTime: e.detail.value });
  },
  changePlayerNum(e){
    this.setData({ max_player: e.detail.value});
  },

  /*修改是否自动同意*/
  auto_inChange: function(e){
    // var str = null;
    // for(var value of this.data.auto_in){
    //   if(value.val == e.detail.val){
    //     this.data.auto_in_choice = value.val;
    //     break;
    //   }
    // }
    if (e.detail.value == '是') this.data.auto_accept = true;
    else this.data.auto_accept = false;
    console.log("是否同意加入" + this.data.auto_accept);
  },
  judgeValid:function(e){
    // 空判断
    if (!/[^\s]+/.test(this.data.title)) {
      this.setData({ isErr: true });
      this.setData({ errStr: "标题为空" });
      return false;
    }

    if (!/[^\s]+/.test(this.data.describe)) {
      this.setData({ isErr: true });
      this.setData({ errStr: "内容为空" });
      return false;
    }

    if (this.data.max_player <= 0) {
      console.log("renshu" + this.data.max_player);
      this.setData({ isErr: true });
      this.setData({ errStr: "人数上限输入错误" });
      return false;
    }

    if (this.data.reward_value <= 0 && (this.data.reward == "money" || this.data.reward == "rmb")) {
      this.setData({ isErr: true });
      this.setData({ errStr: "交易金额输入错误" });
      return false;
    }

    if (!/[^\s]+/.test(this.data.reward_object) && this.data.reward == "physical") {
      this.setData({ isErr: true });
      this.setData({ errStr: "交易物品输入错误" });
      return false;
    }

    if (!/[^\s]+/.test(this.data.location)) {
      this.setData({ isErr: true });
      this.setData({ errStr: "地点为空" });
      return false;
    }

    var st = new Date(this.data.startDate + 'T' + this.data.startTime + ":00");
    var et = new Date(this.data.endDate + 'T' + this.data.endTime + ":00");
    // 时间错误
    if (et.getTime() / 1000 <= st.getTime() / 1000) {
      this.setData({ isErr: true });
      this.setData({ errStr: "时间输入错误" });
      return false;
    }
    return true;
  },
  makeFile:function(flag){
    // 生成json
    this.data.file = {
      "title": this.data.title,
      "content": this.data.describe,
      "attachment": this.data.attachment,
      "type": this.data.type,
      "reward": this.data.reward,
      "reward_value": this.data.reward_value,
      "reward_object": this.data.reward_object,
      "location": this.data.location,
      "tags": this.data.tags,
      "top_time": 0,
      "start_date": this.data.start_date,
      "end_date": this.data.end_date,
      "max_player": this.data.max_player,
      "max_finish": 0,
      "auto_accept": this.data.auto_accept,
      "publish": flag
    }
    console.log(this.data.file);
  },
  /*提交*/
  formSubmit: function(e){
    if( !this.judgeValid(e) ) return;
    var st = new Date(this.data.startDate + 'T' + this.data.startTime + ":00");
    var et = new Date(this.data.endDate + 'T' + this.data.endTime + ":00");
    this.data.start_date = st.getTime() / 1000;
    this.data.end_date = et.getTime() / 1000;
    this.makeFile(true);
    this.setData({isSubmit: true});
  },
  /*保存为草稿*/
  formReset: function (e) {
    if (!this.judgeValid(e)) return;
    var st = new Date(this.data.startDate + 'T' + this.data.startTime + ":00");
    var et = new Date(this.data.endDate + 'T' + this.data.endTime + ":00");
    this.data.start_date = st.getTime() / 1000;
    this.data.end_date = et.getTime() / 1000;
    this.makeFile(false);
    this.setData({ isSave: true });
  },

  /*确认*/
  confirm: function(e){
    if (this.data.isErr){
      this.setData({isErr: false});
      this.setData({errStr: ""});
    }
    if(this.data.isSubmit || this.data.isSave){
      this.setData({ isSubmit: false});
      this.setData({ isSave: false });
      this.setData({ title: ""});
      this.setData({ describe: "" });
      this.setData({ type: "run" });
      this.setData({ reward: "money" });
      this.data.reward_object = "";
      this.data.reward_value = 0;
      this.setData({ reward_input: "" });
      this.setData({ location: "" });
      this.setData({ tags_input: "" });
      this.data.tags = [];
      this.data.start_date = 0;
      this.data.end_date = 0;
      this.data.max_player = 0;
      this.setData({ startDate: "2019-06-01" });
      this.setData({ endDate: "2019-06-01" });
      this.setData({ startTime: "00:00" });
      this.setData({ endTime: "00:00" });
      this.setData({ max_player_input: "" });
      this.data.attachment = [];
      this.data.auto_accept =  true;
    }
  },
  save: function(e){

  },
  // 添加图片
  addImage: async function(e){
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
            console.log(resImage)
            const resData = JSON.parse(resImage.data)
            console.log(resData)
            this.data.addedImages.push({
              src: value,
              id: resData.id
            })
          } catch (err) {
            wx.showToast({
              title: '上传失败',
              image: '/images/icons/error.png'
            })
            console.log(err)
          }
          wx.hideLoading()
        }
      }
      this.setData({ addedImages: this.data.addedImages })
      console.log(this.data.addedImages)
    } catch (err) {
      console.log(err)
    }

  },

  // 删除图片
  deleteImage: function(e){
    var id = e.currentTarget.dataset.index;
    this.data.delete_id = id;
    this.setData({isDelete: true});
  },
  confirm_delete: function(e) {
    var id = this.data.delete_id
    if(id == -1) return
    this.data.addedImages.splice(id, 1)
    this.setData({ addedImages: this.data.addedImages })

    this.cancel_delete(e);
  },
  cancel_delete: function(e){
    this.setData({isDelete: false});
  }


})