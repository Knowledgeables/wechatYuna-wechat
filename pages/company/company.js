// pages/company/company.js
let request = require("../../utils/wxRequest.js");
let util = require("../../utils/wxUtil.js");
let cache = require("../../utils/cache.js");
let that;
let app = getApp();
let currentEmployee;
let currentCompany;
let currentCompanyType;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    reqCompany: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
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
    this.getCompanyInfo();
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
  //获取公司信息
  getCompanyInfo: function() { //.serviceProviderCode, currentEmployee.employeeId
    request.reqCompanyInfo(currentCompanyType, currentEmployee, "", function(result) {
      console.log("请求公司信息");
      console.log(result);
      let thisResult = JSON.parse(result);
      for (let i = 0; i < thisResult.length; i++) {
        switch (thisResult[i]["bindFlag"]) {
          case "1":
            thisResult[i]["bgcolor"] = "#a9db34";
            thisResult[i]["src"] = "../../image/icon_company_hyyz.png"
            break;
          case "2":
            thisResult[i]["bgcolor"] = "#ff7d8c";
            thisResult[i]["src"] = "../../image/icon_company_zjyz.png"
            break;
          case "3":
            thisResult[i]["bgcolor"] = "#5cc9ff";
            thisResult[i]["src"] = "../../image/icon_company_zsqy.png"
            break;
          default:
            break;
        }
      }
      let creadReqCompany = cache.readReqCompany();
      console.log("信息存储失败");
      console.log(creadReqCompany);
      that.setData({
        reqCompany: thisResult
      });
    });
  },
  itemClick: function(event) {
    console.log("event");
    console.log(event);
    if (currentCompanyType == "service") {
      cache.saveReqCompany(event.currentTarget.dataset);
    } else {
      cache.saveServCompany(event.currentTarget.dataset);
    }
    wx.navigateBack({})
  }

})