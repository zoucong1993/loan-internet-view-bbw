import router from '@/router'       //@代表src        这个语句是引组建用的
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import sessionStorage from '@/utils/sessionStorage';        //加载路由的

const whiteList = ['/login', '/demo'];

router.beforeEach(async (to, from, next) => {
    nprogress.start();
    if (sessionStorage.getLoginUser()) {
        // 如果登录过后访问登录页面则跳回主页
        if (to.path === '/login') {
            next('/');
            nprogress.done();
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            next('/login');
            nprogress.done(); // 如果当前页是 login 则路由不会触发 after 钩子函数，需要手动处理
        }
    }
});

router.afterEach((to, from) => {
    nprogress.done();
});
