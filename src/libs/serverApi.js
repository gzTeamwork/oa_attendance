import Axios from "axios";
import VueCookie from "vue-cookies";
import EventBus from "@/libs/eventBus.js";
import apiConfig from "./apiConfig.js";

// 接口配置
const configs = apiConfig;
// const configs = {
//   corpId: "wwdc02ce3b575253e3",
//   corpSecret: "ipWlHNDjalbGoLOqB2mCR4lNz2GqgiSmx03OJms8PDw",
//   appSecrect: "bLhYfEQsgz1zO5Y1kmoCQi_p96ZVCC65uRovbEX-qPM",
//   agentId: "1000034"
// };

// 接口地址

let surl = "http://oa.emking.cn/inforward/api/";
// let surl = 'http://admin.localhost.com/inforward/api/';

//  构造axios实例

let vueAxios = Axios.create({
  baseURL: surl,
  timeout: 3000
  // headers: { "Access-Control-Allow-Origin": "*" }
});

vueAxios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**** 接口方法 ****/

let buildParams = function(params) {
  return (params.agent_id = configs.agentId);
};

//  连接服务器 - 换取token
let getAppToken = function(corpId, corpSecret) {
  vueAxios
    .get(surl + "wx_work_connect", {
      params: {
        corp_id: corpId || configs.corpId,
        corp_secret: corpSecret || configs.corpSecret
      }
    })
    .then(res => {
      if (res.status == 200 && res.data.token !== undefined) {
        console.log("连接服务器成功!!");
        EventBus.$emit("appToken", res.data.token);
        return res.data.token;
      } else {
        console.log("链接服务器失败");
      }
    });
};

//  用户登录交互 - 带token
let wxWorkLogin = function(token) {
  let accessToken = token || VueCookie.get("corpAccessToken");
  Axios.get(surl + "wx_work_login", {
    params: {
      token: accessToken
    }
  }).then(res => {});
};

let getToken = function() {
  Axios.get(surl + "get_access_token", { params: {} }).then(res => {
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("通讯出错..");
    }
  });
};
//  获取当月休假记录
let getRestEventsByMonth = function(today) {
  Axios.get(surl + "get_restevents_by_month", {
    params: {
      date: today
    }
  }).then(res => {
    if (res.status === 200) {
      EventBus.$emit("curMonthRests", res.data);
      console.log("通过服务器获取到当月休假时间");
      return res.data;
    } else {
      console.error("获取休假事件失败");
    }
  });
};

//  获取用户信息
let getUserInfo = function(userCode) {
  let result = null;
  Axios.get(surl + "get_user_info", {
    params: {
      user_code: userCode || null
    }
  }).then(res => {
    if (res.status == 200) {
      console.log("成功获取用户信息");
      console.log(res.data);
      //  抛出用户信息
      EventBus.$emit("userInfo", res.data);
      //  缓存用户票据
      VueCookie.set("userTicket", res.data.user_ticket, 7200);
      return (result = res.data);
    } else {
      EventBus.$emit("toastMsg", "用户授权失败");
      console.log(res.errmsg);
    }
  });
};

//  获取用户信息 - 用户票据
let getUserInfoByTicket = function(userTicket) {
  let result = null;
  Axios.get(surl + "get_user_info_by_ticket", {
    params: {
      user_ticket: userTicket || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取用户票据");
      EventBus.$emit("userInfo", res.data);
    }
  });
};

let getUserInfoById = function(userId) {
  let result = null;
  Axios.get(surl + "get_user_info_by_id", {
    params: {
      user_id: userId || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取用户信息");
      EventBus.$emit("userInfo", res.data);
      EventBus.$emit("needAuth", false);
    }
  });
};
//  获取用户的休假日
let getRestDayByUser = function(userid) {
  let result = "";
  Axios.get(surl + "get_rest_day_by_user", {
    params: {
      user_id: userid || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取用户的休假日");
      EventBus.$emit("curUserRestDay", res.data);
      return res.data;
    } else {
      console.log(res.errmsg);
    }
  });
};

//  提交用户排班数据
let setuserAttendance = function(oldRestDay, restDay, userId, userName) {
  let result = "";
  Axios.get(surl + "set_user_attendance", {
    params: {
      old_day: oldRestDay || null,
      rest_day: restDay,
      user_id: userId,
      user_name: userName,
      status: "rest"
    }
  })
    .then(res => {
      if (res.status === 200) {
        console.log("当前用户提交休假日期成功!");
        return true;
      } else {
        console.log(res.errmsg);
        return false;
      }
    })
    .catch(error => {});
};
const serverApi = {
  buildParams: buildParams,
  configs: configs,
  connect: getAppToken,
  getAppToken: getAppToken,
  login: wxWorkLogin,
  serverUrl: surl,
  getToken: getToken,
  getUserInfo: getUserInfo,
  attendSubmit: setuserAttendance,
  getRestEventsByMonth: getRestEventsByMonth,
  getRestDayByUser: getRestDayByUser,
  getUserInfoById: getUserInfoById
};
export default serverApi;
