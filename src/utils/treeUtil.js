/**
 * list
 * @param   {list}      list数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
export const listToTree = function (listData, idStr, pidStr, childrenStr) {
    // 深度复制
    const list = JSON.parse(JSON.stringify(listData));
    let tree = [],
        hash = {},
        id = idStr || 'id',
        pid = pidStr || 'pid',
        children = childrenStr || 'children',
        i = 0,
        j = 0,
        len = list.length;
    for (; i < len; i++) {
        hash[list[i][id]] = list[i];
    }
    for (; j < len; j++) {
        let node = list[j],
            pNode = hash[node[pid]];
        if (pNode) {
            !pNode[children] && (pNode[children] = []);
            pNode[children].push(node);
        } else {
            tree.push(node);
        }
    }
    return tree;
};