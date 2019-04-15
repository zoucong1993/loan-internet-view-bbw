// 引入规则的
import $rule from "@/vendor/rule.js";
import $flow from "@/vendor/flow.js";
import $sys from "@/vendor/sys.js";
// 动态加载组件
const _require_ = function(path) {
    if (!path){
        return;
    }
    let pathPrefix = path.split("/")[1];
    if (pathPrefix == "sys") {
        return $sys[app.path];
    } else if (pathPrefix == "rule") {
        return $rule[app.path];
    } else if (pathPrefix == "flow") {
        if ($flow[app.path]) {
            return $flow[app.path];
        } else {
            return require(`@/views${path}`);
        }
    } else {
        return require(`@/views${path}`);
    }
};

export default _require_;
