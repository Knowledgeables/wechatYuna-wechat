// pages/login/login.js
let request = require("../../utils/wxRequest.js");
let util = require("../../utils/wxUtil.js");
let cache = require("../../utils/cache.js");
let app = getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceData: {
      userName: "",
      password: "",
    },
    ownerData: {
      userName: "",
      password: "",
    },
    currentType: "service"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
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
    let serviceUserInfo = cache.readServiceUser();
    let ownerUserInfo = cache.readOwnerUser();
    let companyType = cache.readCompanyType()
    that.setData({
      serviceData: serviceUserInfo
    });
    that.setData({
      ownerData: ownerUserInfo
    });
    that.setData({
      currentType: companyType
    });
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
  /**
   * 用户名输入事件
   */
  userNameInput: function(e) {
    let serviceName = "serviceData.userName";
    let ownerName = "ownerData.userName";
    if (that.data.currentType === "service") {
      that.setData({
        [serviceName]: e.detail.value
      })
    } else {
      that.setData({
        [ownerName]: e.detail.value
      })
    }
  },
  /**
   * 密码输入事件
   */
  passwordInput: function(e) {
    let servicePwd = "serviceData.password";
    let ownerPwd = "ownerData.password";
    if (that.data.currentType === "owner") {
      that.setData({
        [ownerPwd]: e.detail.value
      })
    } else {
      that.setData({
        [servicePwd]: e.detail.value
      })
    }
  },
  tabClick: function(event) {
    console.log("event");
    console.log(event);
    switch (event.currentTarget.dataset.tag) {
      case "service":
        console.log("设置当前为服务商");
        that.setData({
          currentType: "service"
        });
        break;
      case "owner":
        console.log("设置当前为业主");
        that.setData({
          currentType: "owner"
        });
        break;
    }
  },
  //切换swiper方法
  loginSwiperChange: function(event) {
    switch (event.detail.current) {
      case 0:
        console.log("设置当前为服务商");
        that.setData({
          currentType: "service"
        });
        break;
      case 1:
        console.log("设置当前为业主");
        that.setData({
          currentType: "owner"
        });
        break;
    }
  },
  //登陆点击事件
  doLoginClick: function() {
    let userName;
    let password;
    if (that.data.currentType === "service") {
      userName = that.data.serviceData.userName;
      password = that.data.serviceData.password;
    } else {
      userName = that.data.ownerData.userName;
      password = that.data.ownerData.password;
    }
    if (userName === null || userName.length === 0) {
      return;
    }
    if (password === null || password.length === 0) {
      return;
    }
    request.doLogin(that.data.currentType, userName, password, function(result) {
      console.log("登陆结果");
      console.log(result);
      switch (result.message.code) {
        case 200:
          app.globalData.companyInfo = result.rows.company;
          app.globalData.employeeInfo = result.rows.employee;
          cache.saveCompanyType(that.data.currentType);
          if (that.data.currentType == "service") {
            //保存服务商用户信息
            cache.saveServiceUser({
              "userName": userName,
              "password": password
            });
          } else {
            //保存业主用户信息
            cache.saveOwnerUser({
              "userName": userName,
              "password": password
            });
          }
          util.toastSuccess("登陆成功");
          wx.redirectTo({
            url: '/pages/work/work',
          })
          break;
        case 1001:
          util.toastMsg("账号或密码为空");
          break;
        case 201:
          util.toastMsg("系统执行异常");
          break;
        case 1004:
          util.toastMsg("用户不存在");
          break;
        case 1014:
          util.toastMsg("用户名不存在");
          break;
        case 1015:
          util.toastMsg("用户密码错误");
          break;
        case 1016:
          util.toastMsg("用户已被企业移除");
          break;
        default:
          util.toastMsg(data.message.message);
          break;
      }
    });
  },
  doForgetPassword: function() {

  }

})