// pages/Comment/Comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    holder: "",
    inputValue: "",
    // 判断申请或者反馈
    isFeedback: false,
    id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.feedback == 'true'){
      this.setData({holder: "请输入您的反馈"});
      this.setData({ isFeedback: true });
    } else{
      this.setData({holder: "请输入您的申请备注"});
      this.data.isFeedback = false;
      this.setData({ isFeedback: false });
    }
    console.log(options.id);
    this.data.id = options.id;
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
  inputProcess: function(e){
    this.setData({inputValue: e.detail.value});
  },
  submit: function(e){
    // 评论为空
    if (!/[^\s]+/.test(this.data.inputValue)) {
      wx.showToast({
        title: '输入为空！',
        image: '/images/icons/error.png',
      })
      return;
    }
    if(this.data.isFeedback){
      wx.showToast({
        title: '反馈成功',
        success: function () {
          setTimeout(function () {
            // 返回
            wx.navigateBack({

            })
          }, 1000);
        }
      })
      // TODO: 提交反馈信息
    } else{
      wx.showToast({
        title: '申请成功',
        success: function(){
          setTimeout(function(){
            // 返回
            wx.navigateBack({

            })
          }, 1000);
        }
      })
      // TODO: 提交申请信息
    }

    
  }
})