// pages/person/person.js
let app = getApp();
let companyCode;
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqPerson: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;;
    console.log("公司信息12312231");
    console.log(options.code);
    companyCode = options.code;
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
    this.reqPersonInfo();
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

  }
  ,
  /**
   * 请求人信息
   */
  reqPersonInfo: function () {
    //“synCode”：选择发起业主公司code，"serviceProviderCode":当前公司Code
    let url = app.api.SERVICE_REQ_PERSON;
    let params = {
      synCode: companyCode,
      serviceProviderCode: app.loginInfo.serviceProviderCode,
    };
    app.wxPost(url, params, function call(result) {
      that.setData({ reqPerson: result.rows });
    });
  }
  ,
  itemClick: function (event) {
    console.log(event);
    app.saveData("reqPerson", event.currentTarget.dataset,
      function succ() {
        wx.navigateBack({
        })
      },
      function fail() {
        console.log("信息存储失败");
      }
    );
  }
})