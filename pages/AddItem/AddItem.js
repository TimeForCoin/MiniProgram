// pages/AddItem/AddItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    describe: "",
    type: "run",
    reward: "",
    reward_value: "",
    location: "",
    tags: [],
    start_date: 0,
    end_date: 0,
    max_player: 0,
    startDate: "2019-06-01",
    endDate: "2019-06-02",
    startTime: "0:00",
    endTime:"0:00",
    max_player: "3",
    auto_in:[
      { val:'是', checked:'true'},
      { val:'否'},
    ],
    auto_accept: true,
    publish: true,
    attachment: []
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
    console.log("title:" + this.data.describe);
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
    this.setData({reward_value: e.detail.value});
    console.log(this.data.reward_value);
  },

  locationChange: function(e){
    this.setData({location: e.detail.value});
    console.log(this.data.location);
  },

  max_playerChange: function(e){
    this.setData({max_player: e.detail.value});
    console.log(this.data.max_player);
  },

  tagesChange: function(e){
    tags = e.detail.value.split(";");
    console.log(this.data.tags);
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
    console.log(e);
    if (e.detail.value == '是') this.data.auto_accept = true;
    else this.data.auto_accept = false;
    console.log("是否同意加入" + this.data.auto_in_choice);
  }


})