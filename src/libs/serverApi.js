import Axios from "axios";
import VueCookie from "vue-cookies";
// import EventBus from "@/libs/eventBus.js";
import apiConfig from "@/configs/api.Config.js";

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
// let surl = 'http://admin.localhost.com/inforward/api/'

//  构造axios实例

let vueAxios = Axios.create({
  baseURL: surl
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

/** ** 接口方法 ****/

let buildParams = function(params) {
  return (params.agent_id = configs.agentId);
};

//  连接服务器 - 换取appToken
let getAppToken = function(corpId, corpSecret) {
  vueAxios
    .get(surl + "wx_work_connect", {
      params: {
        corp_id: corpId || configs.corpId,
        corp_secret: corpSecret || configs.corpSecret
      }
    })
    .then(res => {
      if (res.status === 200 && res.data.token !== undefined) {
        console.log("连接服务器成功!!");
        EventBus.$emit("appToken", res.data.token);
        return res.data.token;
      } else {
        console.log("链接服务器失败");
      }
    });
};

//  员工登录交互 - 带token
let wxWorkLogin = function(token) {
  let accessToken = token || VueCookie.get("corpAccessToken");
  Axios.get(surl + "wx_work_login", {
    params: {
      token: accessToken
    }
  }).then(res => {});
};

/**
 * @deprecated 本函数已废弃,转为后台获取
 */
let getToken = function() {
  Axios.get(surl + "get_access_token", {
    params: {}
  }).then(res => {
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("通讯出错..");
    }
  });
};
//  获取当月排班数据
let getCurMonthEvents = function(today) {
  vueAxios
    .get("get_month_events", {
      params: {
        date: new Date(today).Format("yyyy-M-d")
      }
    })
    .then(res => {
      if (res.status === 200) {
        EventBus.$emit("curMonthEvents", res.data);
        console.log("通过服务器获取当月排班数据");
        return res.data;
      } else {
        console.error("获取当月排班数据失败");
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

//  获取员工信息
let getUserInfo = function(userCode) {
  Axios.get(surl + "get_user_info", {
    params: {
      user_code: userCode || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取员工信息");
      console.log(res.data);
      //  抛出员工信息
      EventBus.$emit("userInfo", res.data);
      //  缓存员工票据
      VueCookie.set("userTicket", res.data.user_ticket, 7200);
      return res.data;
    } else {
      EventBus.$emit("toastMsg", "员工授权失败");
      console.log(res.errmsg);
      return false;
    }
  });
};

//  获取员工信息 - 员工票据
let getUserInfoByTicket = function(userTicket) {
  Axios.get(surl + "get_user_info_by_ticket", {
    params: {
      user_ticket: userTicket || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取员工票据");
      EventBus.$emit("userInfo", res.data);
      return res.data;
    }
  });
};

let getUserInfoById = function(userId) {
  Axios.get(surl + "get_user_info_by_id", {
    params: {
      user_id: userId || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取员工信息");
      EventBus.$emit("userInfo", res.data);
      EventBus.$emit("needAuth", false);
      return res.data;
    }
  });
};
//  获取员工的休假日
let getRestDayByUser = function(userid) {
  Axios.get(surl + "get_rest_day_by_user", {
    params: {
      user_id: userid || null
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("成功获取员工的休假日");
      EventBus.$emit("curUserRestDay", res.data);
      return res.data;
    } else {
      console.log(res.errmsg);
    }
  });
};

//  获取全部员工
let getAllUser = function() {
  vueAxios
    .get("get_all_user", {
      params: {}
    })
    .then(res => {
      if (res.status === 200) {
        console.info("获取所有员工信息成功( • ̀ω•́ )✧");
        EventBus.$emit("getAllUser", res.data);
        return res.data;
      } else {
        console.log(res.errmsg);
      }
    });
};

//  提交员工排班数据
let setuserAttendance = function(oldRestDay, restDay, userId, userName) {
  Axios.get(surl + "set_user_attendance", {
    params: {
      old_day: oldRestDay || null,
      rest_day: restDay,
      user_id: userId,
      user_name: userName,
      status: "rest"
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("当前员工提交休假日期成功!");
      EventBus.$emit("toastMsg", "成功提交员工休息日");
      return true;
    } else {
      console.log(res.errmsg);
      return false;
    }
  });
};
//  获取员工近日报餐数据
let getUserWeekMeal = function(useid) {
  let datas = [];
  //  产生数据
  let todayDate = new Date();

  let weekDate = new Date();

  weekDate.setDate(todayDate.getDay() - 7 + todayDate.getDate());

  for (let i = 1; i < 7 + 1; i++) {
    weekDate.setDate(weekDate.getDate() + 1);
    let event = {
      date: weekDate.Format("yyyy-MM-dd"),
      day: weekDate.getDay(),
      menu: 123,
      isCheck: false,
      isToday: todayDate.Format("yyyy-MM-dd") == weekDate.Format("yyyy-MM-dd")
    };
    datas.push(event);
  }

  EventBus.$emit("getUserWeekMeal", datas);
  return datas;
};

//  提交员工报餐数据
let attendUserMeal = function(userid, mealsData) {
  let result = [];
  let timeStamp = new Date();
  EventBus.$emit("attendUserMealsRes", timeStamp + "提交了数据");
  return;
  vueAxios
    .post("attendUserMeal", {
      params: {
        user_id: userid || null,
        meals_data: mealsData || []
      }
    })
    .then(response => {
      if (response.status == 200) {
        //  指派数据UserMeals
        EventBus.$emit("attendUserMeals", response.data);
      }
    });
};
/**
 * 服务器数据交互接口类
 */
const serverApi = {
  //  建立数据接口基本数据
  buildParams: buildParams,
  //  serverApi配置项
  configs: configs,
  //  链接后台服务器
  connect: getAppToken,
  //  同名方法
  getAppToken: getAppToken,

  login: wxWorkLogin,
  serverUrl: surl,
  getToken: getToken,
  //  获取员工信息
  getUserInfo: getUserInfo,
  //  获取所有员工信息
  getAllUser: getAllUser,
  //  提交员工排班数据
  attendSubmit: setuserAttendance,
  //  获取当月休假记录
  getRestEventsByMonth: getRestEventsByMonth,
  //  获取当月排班数据
  getCurMonthEvents: getCurMonthEvents,
  //  获取员工的休假纪录
  getRestDayByUser: getRestDayByUser,
  //  通过员工user_id获取员工信息,调试开发专用
  getUserInfoById: getUserInfoById,
  //  通过员工票据获取员工信息
  getUserInfoByTicket: getUserInfoByTicket,
  //  获取员工近日报餐数据
  getUserWeekMeal: getUserWeekMeal,
  //  提交员工报餐数据
  attendUserMeal: attendUserMeal
};
export default serverApi;
