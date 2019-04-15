import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 引入项目的公共组件
import loanComponent from "./vendor/component";
// 引入项目的公共组件----开发调试版
// import loanComponent from "../../loan-sys-view/src/components/index.js";
import router from './router';
import store from './store';
import http from '@/utils/http';
import * as message from '@/utils/message';
import './assets/icon/iconfont.css';
import sessionStorage from '@/utils/sessionStorage';
import stringUtil from '@/utils/stringUtil';
import moneyUtil from '@/utils/moneyUtil';
import dateUtil from '@/utils/dateUtil';
import commonUtil from '@/utils/common';
import _require_ from "@/utils/_require_";
import '@/router/routerControl';
import buildRoutes from '@/router/buildRoutes';
import ElxTree from '@/components/tree';

import '@/utils/vDrag';
import 'jsplumb/css/jsplumbtoolkit-defaults.css'
import "./assets/jsplumb.css";
import "babel-polyfill";
// 打印插件
import myPrint from "@/vendor/myPrint.js";

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'



import echarts from 'echarts'



Vue.use(ElementUI, {size: 'mini'});
Vue.use(loanComponent);
Vue.use(myPrint);
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})

// // 定义全局方法
Vue.prototype.$http = http;
Vue.prototype.$info = message.info;
Vue.prototype.$success = message.success;
Vue.prototype.$warning = message.warning;
Vue.prototype.$error = message.error;
Vue.prototype.$sessionStorage = sessionStorage;
Vue.prototype.$stringUtil = stringUtil;
Vue.prototype.$moneyUtil = moneyUtil;
Vue.prototype.$dateUtil = dateUtil;
Vue.prototype.$commonUtil = commonUtil;
Vue.prototype.$_require_ = _require_;
Vue.prototype.$echarts = echarts;


// // 引入规则的
import $rule from "./vendor/rule.js";
// 引入流程
import $flow from "./vendor/flow.js";
// 引入系统
import $sys from "./vendor/sys.js";
Vue.prototype.$rule = $rule;
Vue.prototype.$flow = $flow;
Vue.prototype.$sys = $sys;

// // 如果用户已登录并且有路由信息，就增加路由
if (sessionStorage.getLoginUser() && sessionStorage.getUserMenu()) {
    router.addRoutes(buildRoutes(sessionStorage.getUserMenu()));
    // 清空下拉树缓存
    sessionStorage.removeSelectTreeData();
    // 刷新下拉字段缓存
    http.post("/loan/selectOptionAction.do?_md=findAllOptions")
        .then(response => sessionStorage.setSelectData(response.data))
        .catch(error => message.error(error.message));
    if (sessionStorage.getLoginMsgFlag()) {
        message.success("登录成功");
        sessionStorage.removeLoginMsgFlag();
    }
}



// 注册全局组件
Vue.component("userInfoList", $sys['/sys/user/userInfoList']);
Vue.component("userList", $sys["/sys/user/userList"]);
Vue.component('elx-tree', ElxTree);
//Vue.component("act-validator", ActValidator);



new Vue({
    el: '#app',             //加载
    router,
    store,
    render: h => h(App) ,    //渲染
});
