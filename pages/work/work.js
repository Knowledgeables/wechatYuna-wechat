// pages/work/work.js
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
    headerChoose: 0,
    currentType: null,
    reqCompanyData: null,
    reqPersonData: null,
    servCompanyData: null,
    slaData: null,
    checkedSlaData: null,
    checkItem: null,
    absData: null,
    absTextCount: "0/50",
    image: null
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
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow");
    that.loadSlaItem();
    that.setData({
      currentType: currentCompanyType
    });
    if (currentCompanyType == "service") {
      //请求公司数据
      that.setData({
        reqCompanyData: {
          companycode: cache.readReqCompany().companycode,
          servername: cache.readReqCompany().servername
        }
      });
      //请求人数据
      that.setData({
        reqPersonData: {
          name: cache.readReqPerson().name,
          phone: cache.readReqPerson().phone,
          employeeid: cache.readReqPerson().employeeid
        }
      });
      //设置服务公司名称
      that.setData({
        servCompanyData: {
          companycode: currentEmployee.ownerCode,
          servername: currentEmployee.companyName
        }
      });
    } else {
      //请求公司数据
      that.setData({
        reqCompanyData: {
          companycode: currentEmployee.ownerCode,
          servername: currentEmployee.companyName
        }
      });
      //请求人数据
      that.setData({
        reqPersonData: {
          name: currentEmployee.name,
          phone: currentEmployee.mobilePhone,
          employeeid: currentEmployee.mobilePhone.employeeid
        }
      });
      //设置服务公司名称
      that.setData({
        servCompanyData: cache.readServCompany()
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("onHide");
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onUnload");
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
  onTabCheck: function() {
    if (this.data.headerChoose == 0) {
      this.setData({
        headerChoose: 1
      });
    } else {
      this.setData({
        headerChoose: 0
      });
    }
  },
  swiperChange: function(event) {
    console.log("swiper滚动事件");
    console.log(event);
    that.setData({
      headerChoose: event.detail.current
    });
  },
  //请求企业信息
  reqCompanyClick: function() {
    console.log("请求企业信息点击事件");
    wx.navigateTo({
      url: '/pages/company/company',
    })
  },
  //业主请求人信息
  reqPersonClick: function() {
    console.log("请求人点击事件");
    let selectedCompanyCode = that.data.reqCompanyData.companycode;
    let url = "/pages/person/person?code=" + selectedCompanyCode + "";
    if (that.data.reqCompanyData === null || that.data.reqCompanyData == undefined) {
      util.toastMsg("请选择业主单位");
      return;
    }
    console.log("url");
    console.log(url);
    wx.navigateTo({
      url: url,
    })
  },
  //服务公司点击事件
  servCompanyClick: function() {
    console.log("服务公司点击事件");
    wx.navigateTo({
      url: '/pages/company/company',
    })
  },
  //概要描述
  absDetailInput: function(event) {
    console.log("abs简要描述");
    console.log(event);
    var len = parseInt(event.detail.value.length);
    that.data.absData = event.detail.value;
    that.setData({
      absTextCount: len + "/50"
    });
  },
  //sla条目点击事件
  slaItemClick: function(event) {
    console.log("sla条目点击");
    console.log(event);
    that.setData({
      checkItem: event.currentTarget.dataset.index
    });
    that.setData({
      checkedSlaData: event.currentTarget.dataset.content
    });
  },
  //请求sla相关信息
  loadSlaItem: function() {
    console.log("loadSlaItem" + currentCompanyType);
    request.reqSlaItem(currentCompanyType, currentEmployee, function(result) {
      console.log("请求sla信息");
      console.log(result);
      if (result != null && result.message != null && result.message.code === 200) {
        that.setData({
          slaData: result.rows
        });
      } else {
        util.toastMsg("未查询到相关sla信息");
      }
    });
  },
  //请求人点击事件
  personClick: function(event) {
    console.log("currentEmployee");
    console.log(currentEmployee);
    console.log("readReqCompany");
    console.log(cache.readReqCompany());
    console.log("readReqPerson");
    console.log(cache.readReqPerson());
    console.log("readServCompany");
    console.log(cache.readServCompany());
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  //发送工单
  sendOrderClick: function() {
    let orderInfo = {
      title: null,
      ownerCode: null,
      sendUser: null,
      serviceProviderCode: null,
      levelId: null,
      days: null,
      hours: null,
      tempCategoryId: null,
      outsourceFlag: "0",
      filenames: null,
      attachPath: null,
      attachSize: null,
      currentUserId: null
    };

    if (currentCompanyType === "service") {
      if (that.data.reqCompanyData === null || that.data.reqCompanyData === undefined) {
        util.toastMsg("", "请选择业主单位", "");
        return;
      }
      if (that.data.reqPersonData === null || that.data.reqPersonData === undefined) {
        util.toastMsg("请选择发起人");
        return;
      }
      orderInfo.ownerCode = that.data.reqCompanyData.companycode;
      orderInfo.sendUser = that.data.reqPersonData.employeeid;
    } else {
      if (that.data.servCompanyData === null || that.data.servCompanyData === undefined) {
        util.toastMsg("请选择服务商企业");
        return;
      }
      orderInfo.serviceProviderCode = that.data.servCompanyData.companycode;
      orderInfo.outsourceFlag= "0"
    }
    if (currentEmployee == null || currentEmployee === undefined) {
      util.toastMsg("当前登陆失效");
      return location.href = "login.html";
    }
    if (that.data.checkedSlaData == null || that.data.checkedSlaData === undefined) {
      util.toastMsg("请选择sla等级");
      return;
    }
    if (that.data.absData == null || that.data.absData === null || that.data.absData.length === 0) {
      util.toastMsg("请填写概要描述");
      return;
    }
    orderInfo.levelId = that.data.checkedSlaData.tempId;
    orderInfo.days = that.data.checkedSlaData.completeDay;
    orderInfo.hours = that.data.checkedSlaData.completeHour;
    orderInfo.tempCategoryId = that.data.checkedSlaData.tempCategoryId;
    orderInfo.currentUserId = currentEmployee.employeeId;
    orderInfo.title = that.data.absData;
    console.log("orderInfo");
    console.log(orderInfo);
    request.sendOrder(currentCompanyType,orderInfo,function(result){
      util.toastSuccess("工单发送成功");
    });

  },
  //图片点击事件
  chooseClick: function (event) {
    let chooseImage = {
      count: "9",
      sizeType: "compressed",
      sourceType: "",
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log("res");
        console.log(res);
        if (that.data.image === null || that.data.image===undefined)
        {
          that.data.image=new Array();
        }
        request.upload(currentCompanyType, currentCompany.versionCode, currentCompany.companyCode, res.tempFilePaths[0],function(result)
        {
          console.log("文件上传结果");
          console.log(result);
          that.data.image.push(res.tempFilePaths[0])
          that.setData({
            image: that.data.image
          });
        });
        console.log("图片选择");
        console.log(res);
      },
      fail: function (error) {
        console.log("选择失败");
        console.log(error);
      },
      complete: function () {

      },

    }
    wx.chooseImage(chooseImage)
  }


})