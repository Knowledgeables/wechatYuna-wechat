// pages/person/person.js
let request = require("../../utils/wxRequest.js");
let util = require("../../utils/wxUtil.js");
let cache = require("../../utils/cache.js");
let that;
let app = getApp();
let currentEmployee;
let currentCompany;
let currentCompanyType;
let selectCompanyCode;
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
  onLoad: function(options) {
    that = this;
    console.log("options");
    console.log(options);
    selectCompanyCode = options.code;
    currentEmployee = app.globalData.employeeInfo;
    currentCompany = app.globalData.companyInfo;
    currentCompanyType = cache.readCompanyType();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.reqPersonInfo(selectCompanyCode, currentEmployee.serviceProviderCode);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载*/
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
  /**
   * 请求人信息
   */
  reqPersonInfo: function(companyCode, serviceProviderCode) {
    request.reqPersonInfo(companyCode, serviceProviderCode, function(result) {
      console.log("请求人公司信息");
      console.log(result);
      if (result !== null && result !== undefined && result !== "null") {
        that.setData({
          reqPerson: JSON.parse(result)
        });
      } else {
        util.toastMsg("未查询到任何请求人信息");
      }
    });
  },
  itemClick: function(event) {
    console.log("event");
    console.log(event.currentTarget.dataset);
    cache.saveReqPerson(event.currentTarget.dataset);
    wx.navigateBack({})
  }
})