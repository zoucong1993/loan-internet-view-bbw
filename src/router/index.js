import Vue from 'vue';
import Router from 'vue-router';
import $sys from "@/vendor/sys.js";
const Layout = $sys['layout'];

const Login = r =>
    require.ensure([], () => r(require("@/views/login/index.vue")), "Loging");
    
const dashboard = r =>
    require.ensure([], () => r(require("@/views/dashboard/index.vue")), "dashboard");    
    


const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/",
        component: Layout,
        redirect: "dashboard",
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: dashboard,
                meta: {
                    title: "首页"
                }
            }
        ]
    }
];

Vue.use(Router);

export default new Router({
  routes,
});