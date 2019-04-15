import $rule from "@/vendor/rule.js";
import $flow from "@/vendor/flow.js";
import $sys from "@/vendor/sys.js";
export default function(appList) {
    let routes = [];
    appList.map(app => {
        if (app.path && app.path !== "") {
            const btns = {};
            if (app.buttons && app.buttons !== "") {
                //配置按钮权限
                const bs = app.buttons.split(",");
                bs.forEach(b => (btns[b] = true));
            }

            let pathPrefix = app.path.split("/")[1];
            let realPath = app.path.split("?")[0];
            if (pathPrefix == "sys") {
                routes.push({
                    path: realPath,
                    component: $sys[realPath],
                    name: app.path,
                    meta: {
                        id: app.id,
                        title: app.name,
                        btns: btns
                    }
                });
            } else if (pathPrefix == "rule") {
                routes.push({
                    path: realPath,
                    component: $rule[realPath],
                    name: app.path,
                    meta: {
                        id: app.id,
                        title: app.name,
                        btns: btns
                    }
                });
            } else if (pathPrefix == "flow") {
                if ($flow[app.path]) {
                    routes.push({
                        path: realPath,
                        component: $flow[realPath],
                        name: app.path,
                        meta: {
                            id: app.id,
                            title: app.name,
                            btns: btns
                        }
                    });
                } else {
                    routes.push({
                        path: realPath,
                        component: r =>
                            require.ensure(
                                [],
                                () => r(require(`@/views${realPath}.vue`)),
                                "base"
                            ),
                        name: app.path,
                        meta: {
                            id: app.id,
                            title: app.name,
                            btns: btns
                        }
                    });
                }
            } else {
                routes.push({
                    path: realPath,
                    component: r =>
                        require.ensure(
                            [],
                            () => r(require(`@/views${realPath}.vue`)),
                            "base"
                        ),
                    name: app.path,
                    meta: {
                        id: app.id,
                        title: app.name,
                        btns: btns
                    }
                });
            }
        }
    });
    return [{ path: "/", component: $sys["layout"], children: routes }];
}
