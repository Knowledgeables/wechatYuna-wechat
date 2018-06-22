let api = require("/wxApi.js");
let util = require("/wxUtil.js");

function post(url, data, onSuccess, onFail) {
  console.log("请求地址---");
  console.log(url);
  console.log("请求入参---");
  console.log(data);
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: {
      jsonBean: JSON.stringify(data)
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      console.log("调用成功---")
      console.log(res.data)
      onSuccess(res.data);
    },
    fail: function(result) {
      console.log("请求失败---");
      console.log(result);
      onFail(result.data);
    }
  });
}

function upload(companyType, versionCode, companyCode, file, call) {
  let url;
  if (companyType === "service") {
    url = api.SERVICE_UPLOAD_FILE;
  } else {
    url = api.OWNER_UPLOAD_FILE;
  }
  wx.uploadFile({
    url: url, //仅为示例，非真实的接口地址
    filePath: file.path,
    name: file.name,
    formData: {
      'versionCode': versionCode,
      'companyCode': companyCode,
      'fileuploadFileName': file.name,
      'fileupload': file,
      'isControl': '1'
    },
    success: function(res) {
      call(res);
      //do something
    },
    fail: function(res) {
      util.toastMsg("文件上传失败");
      //do something
    }
  })
}
//登陆请求
function doLogin(companyType, userName, password, success) {
  let url;
  let params;
  if (companyType === "service") {
    console.log(api.OWNER_FILE);
    url = api.SERVICE_LOGIN_URL;
  } else {
    url = api.OWNER_LOGIN_URL;
  }
  params = {
    userName: userName,
    password: password
  }
  post(url, params, function(res) {
    console.log("登陆结果");
    console.log(res);
    success(res);
  }, function(error) {
    util.toastMsg("登陆失败");
    console.log("登陆失败");
    console.log(error);
  });
}
//请求sla信息
function reqSlaItem(currentCompany, currentEmployee, success) {
  console.warn("reqSlaItem" + currentCompany);
  let url;
  let params;
  let contractId = currentEmployee.contractId === undefined ? "" : currentEmployee.contractId;
  if (currentCompany === "service") {
    url = api.SERVICE_MINUTE_URL;
    params = {
      serviceProviderCode: currentEmployee.serviceProviderCode,
      contractId: contractId,
    };
  } else if (currentCompany === "owner") {
    url = api.OWNER_MINUTE_URL;
    params = {
      ownerCode: currentEmployee.ownerCode
    };
  }
  post(url, params, function(res) {
    console.log("请求sla信息");
    console.log(res);
    success(res);
  }, function(error) {
    util.toastMsg("未查询到相关sla信息");
    console.log("未查询到相关sla信息");
    console.log(error);
  });
}
//获取请求公司信息
function reqCompanyInfo(companyType, employee, searchName, call) {
  let params;
  let url;
  if (companyType === "service") {
    url = api.SERVICE_QUERY_COMPANY_URL;
    params = {
      useFlag: "1",
      type: "1",
      serviceProviderCode: employee.serviceProviderCode,
      currentUserId: employee.employeeId,
      serverName: searchName == null ? "" : searchName
    }
  } else if (companyType === "owner") {
    url = api.OWNER_QUERY_COMPANY_URL;
    params = {
      exeType: "1",
      ownerCode: employee.ownerCode,
      currentUserId: employee.employeeId,
      serverName: searchName == null ? "" : searchName
    }
  }
  post(url, params, function(data) {
    switch (data.message.code) {
      case 200:
        call(JSON.stringify(data.rows));
        break;
      default:
        util.toastMsg(data.message.message);
        break;
    }
  });
}
//获取请求人信息
function reqPersonInfo(sysCode, serviceProviderCode, call) {
  let url = api.SERVICE_QUERY_PERSON_URL;
  let params = {
    synCode: sysCode,
    serviceProviderCode: serviceProviderCode,
  };
  post(url, params, function(data) {
    switch (data.message.code) {
      case 200:
        call(JSON.stringify(data.rows));
        break;
      default:
        util.toastMsg(data.message.message);
        break;
    }
  });
}

function sendOrder(companyType, params, call) {
  let url;
  if (companyType === "service") {
    url = api.SERVICE_SEND_ORDER;
  } else {
    url = api.OWNER_SEND_ORDER;
  }
  post(url, params, function(data) {
    switch (data.message.code) {
      case 200:
        call(JSON.stringify(data.rows));
        break;
      default:
        util.toastMsg(data.message.message);
        break;
    }
  });
}

module.exports = {
  doLogin: doLogin,
  reqSlaItem: reqSlaItem,
  reqCompanyInfo: reqCompanyInfo,
  reqPersonInfo: reqPersonInfo,
  sendOrder: sendOrder,
  upload: upload
}