const sessionStorage = window.sessionStorage;
const LOGIN_USER = "_LOGIN_USER";
const USER_MENU = "_USER_MENU";
const VISITED_VIEWS = "_VISITED_VIEWS";
const SELECT_DATA = "_SELECT_DATA";
const LOGIN_MSG_FLAG = "_LOGIN_MSG_FLAG";
const SELECT_TREE_DATA = "_SELECT_TREE_DATA";

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    sessionStorage.setItem(key, value)
}

function get(key) {
    const value = sessionStorage.getItem(key) || '';
    try {
        const val = JSON.parse(value);
        if ('number' === typeof(val)) {
            return value;
        } else {
            return val;
        }
    } catch (e) {
        return value;
    }
}

function remove(key) {
    sessionStorage.removeItem(key)
}

function clearAll() {
    sessionStorage.clear();
}

function setLoginUser(value) {
    set(LOGIN_USER, value)
}

function getLoginUser() {
    return get(LOGIN_USER);
}

function removeLoginUser() {
    remove(LOGIN_USER);
}

function setUserMenu(value) {
    set(USER_MENU, value)
}

function getUserMenu() {
    return get(USER_MENU);
}

function removeUserMenu() {
    remove(USER_MENU);
}

function setVisitedViews(value) {
    set(VISITED_VIEWS, value)
}

function getVisitedViews() {
    return get(VISITED_VIEWS);
}

function removeVisitedViews() {
    remove(VISITED_VIEWS);
}

function setSelectData(value) {
    set(SELECT_DATA, value)
}

function getSelectData() {
    return get(SELECT_DATA);
}

function removeSelectData() {
    remove(SELECT_DATA);
}

function getOptions(selectKey) {
    return getSelectData()[selectKey];
}

function getOptionValue(selectKey, optionKey) {
    if (getSelectData()[selectKey]){
        return getSelectData()[selectKey][optionKey];
    }
}

function setLoginMsgFlag(value) {
    set(LOGIN_MSG_FLAG, value);
}

function getLoginMsgFlag() {
    return get(LOGIN_MSG_FLAG);
}

function removeLoginMsgFlag() {
    remove(LOGIN_MSG_FLAG)
}

function setSelectTreeData(key, value) {
    let selectTreeData = get(SELECT_TREE_DATA);
    if (selectTreeData === ''){
        selectTreeData = {};
    }
    selectTreeData[key] = value;
    set(SELECT_TREE_DATA, selectTreeData);
}

function getSelectTreeData(key) {
    const selectTreeData = get(SELECT_TREE_DATA);
    if (selectTreeData === ''){
        return null;
    } else {
        return selectTreeData[key];
    }
}

function removeSelectTreeData() {
    remove(SELECT_TREE_DATA)
}

export default {
    set,
    get,
    remove,
    clearAll,
    setLoginUser,
    getLoginUser,
    removeLoginUser,
    setUserMenu,
    getUserMenu,
    removeUserMenu,
    setVisitedViews,
    getVisitedViews,
    removeVisitedViews,
    setSelectData,
    getSelectData,
    removeSelectData,
    getOptions,
    getOptionValue,
    setLoginMsgFlag,
    getLoginMsgFlag,
    removeLoginMsgFlag,
    setSelectTreeData,
    getSelectTreeData,
    removeSelectTreeData
}
