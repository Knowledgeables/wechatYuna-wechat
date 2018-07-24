var BaseUrl = "http://192.168.15.90:8080/";
//var BaseUrl = "http://192.168.10.13:8090/";

var MIDDLE = BaseUrl + "MiddleServer/";
//服务商地址
var SERVER = BaseUrl + "AppServiceProvider/";
//业主地址
var OWNER = BaseUrl + "AppCloudServer/";

//文件上传
var SERVICE_FILE = BaseUrl + "ServiceProvider/";
var OWNER_FILE = BaseUrl + "CloudServer/";


//服务上登陆接口
var SERVICE_LOGIN_URL = SERVER + "appUserCheckLogin.htm";
var OWNER_LOGIN_URL = OWNER + "appUserCheckLogin.htm";

//服务商 工单 选择企业
var SERVICE_QUERY_COMPANY_URL = SERVER + "queryAppServerInfoRebuild.htm";
var OWNER_QUERY_COMPANY_URL = OWNER + "queryAppServerInfo.htm";


//服务商 工单 选择发起人
var SERVICE_QUERY_PERSON_URL = SERVER + "queryAppSynEmployeeRebuild.htm";


//SLA协议
var SERVICE_MINUTE_URL = SERVER + "getAppTotalMinute.htm";
var OWNER_MINUTE_URL = OWNER + "appGetTotalMinute.htm";

//发起工单
var SERVICE_SEND_ORDER = SERVER + "appRebuildRequestServerLimit.htm";;
var OWNER_SEND_ORDER   = OWNER + "appRebuildRequestServerLimit.htm";

//发起工单-上传附件
var SERVICE_UPLOAD_FILE = SERVICE_FILE + "appUploadFile.htm";
var OWNER_UPLOAD_FILE = OWNER_FILE + "appUploadFile.htm";

//忘记密码验证码那
var SERVICE_SEND_CODE = SERVER + "sendVercode.htm";
var OWNER_SEND_CODE = OWNER + "sendVercode.htm";


//重置密码
var SERVICE_RESET_PWD = SERVER + "forgetUserPwd.htm";
var OWNER_RESET_PWD = OWNER + "forgetUserPwd.htm";


var ceshi = OWNER + "修改代码";

module.exports = {
  SERVICE_FILE: SERVICE_FILE,
  OWNER_FILE: OWNER_FILE,
  SERVICE_LOGIN_URL: SERVICE_LOGIN_URL,
  OWNER_LOGIN_URL: OWNER_LOGIN_URL,
  SERVICE_QUERY_COMPANY_URL: SERVICE_QUERY_COMPANY_URL,
  OWNER_QUERY_COMPANY_URL: OWNER_QUERY_COMPANY_URL,
  SERVICE_QUERY_PERSON_URL: SERVICE_QUERY_PERSON_URL,
  SERVICE_MINUTE_URL: SERVICE_MINUTE_URL,
  OWNER_MINUTE_URL: OWNER_MINUTE_URL,
  SERVICE_SEND_ORDER: SERVICE_SEND_ORDER,
  OWNER_SEND_ORDER: OWNER_SEND_ORDER,
  SERVICE_UPLOAD_FILE: SERVICE_UPLOAD_FILE,
  OWNER_UPLOAD_FILE: OWNER_UPLOAD_FILE,
  SERVICE_SEND_CODE: SERVICE_SEND_CODE,
  OWNER_SEND_CODE: OWNER_SEND_CODE,
  SERVICE_RESET_PWD: SERVICE_RESET_PWD,
  OWNER_RESET_PWD: OWNER_RESET_PWD,
    ceshi:ceshi
}