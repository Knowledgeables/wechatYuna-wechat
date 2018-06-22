//app.js
//创建类,并添加属性
function Api(adress) {
  this.BaseUrl = adress;
  console.debug(this); //在控制台打印
}
App({
  onLaunch: function() {

  },
  globalData: {
    userInfo: null,
    companyInfo: null,
    employeeInfo: null,
  }
})