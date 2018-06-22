//保存服务商用户信息
function saveServiceUser(ServiceUser) {
  wx.setStorageSync("ServiceUser", JSON.stringify(ServiceUser))
}
//读取服务商用户信息
function readServiceUser() {
  let ServiceUser = wx.getStorageSync("ServiceUser");
  if (ServiceUser === null || ServiceUser === undefined || ServiceUser.length === 0) {
    return null;
  } else {
    console.log("ServiceUser");
    console.log(ServiceUser);
    return JSON.parse(ServiceUser);
  }
}
//保存业主用户信息
function saveOwnerUser(OwnerUser) {
  wx.setStorageSync("OwnerUser", JSON.stringify(OwnerUser))
}
//读取业主用户信息
function readOwnerUser() {
  let OwnerUser = wx.getStorageSync("OwnerUser");
  if (OwnerUser === null || OwnerUser === undefined || OwnerUser.length === 0) {
    return null;
  } else {
    console.log("OwnerUser");
    console.log(OwnerUser);
    return JSON.parse(OwnerUser);
  }
}
//设置当前选择公司的类型
function saveCompanyType(data) {
  wx.setStorageSync("CompanyType", data);
}
//获取公司类型
function readCompanyType() {
  let CompanyType = wx.getStorageSync("CompanyType");
  if (CompanyType === null || CompanyType === undefined || CompanyType.length === 0) {
    return "service";
  } else {
    console.log("CompanyType");
    console.log(CompanyType);
    return CompanyType;
  }
}

//保存请求公司
function saveReqCompany(ReqCompany) {
  wx.setStorageSync("ReqCompany", JSON.stringify(ReqCompany))
}
//读取请求公司
function readReqCompany() {
  let ReqCompany = wx.getStorageSync("ReqCompany");
  if (ReqCompany === null || ReqCompany === undefined || ReqCompany.length === 0) {
    return null;
  } else {
    console.log("ReqCompany");
    console.log(ReqCompany);
    return JSON.parse(ReqCompany);
  }
}

//保存请求人
function saveReqPerson(ReqPerson) {
  wx.setStorageSync("ReqPerson", JSON.stringify(ReqPerson))
}
//读取请求人
function readReqPerson() {
  let ReqPerson = wx.getStorageSync("ReqPerson");
  if (ReqPerson === null || ReqPerson === undefined || ReqPerson.length === 0) {
    return null;
  } else {
    console.log("ReqPerson");
    console.log(ReqPerson);
    return JSON.parse(ReqPerson);
  }
}

//保存服务公司
function saveServCompany(ServCompany) {
  wx.setStorageSync("ServCompany", JSON.stringify(ServCompany))
}
//读取服务公司
function readServCompany() {
  let ServCompany = wx.getStorageSync("ServCompany");
  if (ServCompany === null || ServCompany === undefined || ServCompany.length === 0) {
    return null;
  } else {
    console.log("ServCompany");
    console.log(ServCompany);
    return JSON.parse(ServCompany);
  }
}

module.exports = {
  saveServiceUser: saveServiceUser, //保存服务商用户
  readServiceUser: readServiceUser, //读取服务商用户
  saveOwnerUser: saveOwnerUser, //保存业主用户
  readOwnerUser: readOwnerUser, //读取业主用户
  saveCompanyType: saveCompanyType, //保存公司类型
  readCompanyType: readCompanyType, //读取公司类型
  saveReqCompany: saveReqCompany, //保存请求公司
  readReqCompany: readReqCompany, //读取请求公司
  saveReqPerson: saveReqPerson, //保存请求人
  readReqPerson: readReqPerson, //读取请求人
  saveServCompany: saveServCompany, //保存服务企业
  readServCompany: readServCompany, //读取服务企业

}