<template>
    <div>
        <el-tree ref="expandMenuList"
                 :data="treeData"
                 node-key="id"
                 highlight-current
                 :props="defaultProps"
                 :default-expanded-keys="defaultExpandKeys"
                 :render-content="treeRenderContent"
                 lazy
                 :load="loadChildData"
                 :expand-on-click-node="false"
                 @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
    export default {
        name: 'ElxTree',
        props: {
            url: {
                type: String,
                required: true
            },
            childUrl: {
                type: String,
                required: true
            },
            renderContent: {
                type: Function,
                default: null
            },
            renderContentTypes: {
                type: Array,
                default: function () {
                    return [ 'plus', 'edit', 'delete' ];
                }
            }
        },
        data() {
            return {
                treeData: null, // 节点树数据
                treeRenderContent: null, // 树节点的内容区的渲染 Function
                defaultProps: {
                    label: 'name',
                    isLeaf: 'leaf'
                },
                defaultExpandKeys: []//默认展开节点列表
            }
        },
        mounted() {
            this.initTreeData();
            if (this.renderContent){
                this.treeRenderContent = this.renderContent;
            } else {
                this.treeRenderContent = this.defaultRenderContent;
            }
        },
        methods: {
            initTreeData() {
                const _this = this;
                this.$http
                    .post(this.url, {})
                    .then(function (response) {
                        if (response.success) {
                            _this.treeData = response.data;
                            _this.treeData.map((a) => {
                                _this.defaultExpandKeys.push(a.id)
                            });
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch(function (error) {
                        _this.$error(error.message);
                    });
            },
            handleNodeClick(data, node, store) {//点击节点
                this.$emit("node-click", data, node, store);
            },
            loadChildData(node, resolve) {
                if (node.level === 0) {
                    return;
                }
                const _this = this;
                this.$http
                    .post(this.childUrl, {
                        pid: node.data.id,
                    })
                    .then(function (response) {
                        if (response.success) {
                            resolve(response.data);
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch(function (error) {
                        _this.$error(error.message);
                    });

            },
            defaultRenderContent(h, {node, data, store}) {//加载节点
                return (
                    <span>
                        <span>{ data.name }</span>
                            <span class="tree-btn">
                            { this.renderContentTypes.indexOf('plus') !== -1 ? <i  class="el-icon-plus" on-click={ () => this.handleAdd(data, node, store) }></i> : null}
                            { this.renderContentTypes.indexOf('edit') !== -1 ? <i  class="el-icon-edit" on-click={ () => this.handleEdit(data, node, store) }></i> : null}
                            { this.renderContentTypes.indexOf('delete') !== -1 ? <i  class="el-icon-delete" on-click={ () => this.handleDelete(data, node, store) }></i> : null}
                            { this.renderContentTypes.indexOf('menu') !== -1 ? <i  class="el-icon-menu" on-click={ () => this.handleMenu(data, node, store) }></i> : null}
                        </span>
                    </span>
                );
            },
            handleAdd(data, node, store) {//增加节点
                //添加数据
                this.$emit("add-node", data, node, store);
                //展开节点
                if (!node.expanded) {
                    node.expanded = true;
                }
            },
            handleEdit(data, node, store) {
                //编辑节点
                this.$emit("update-node", data, node, store);
            },
            handleDelete(data, node, store) {
                //最好在后台校验一下是否有子节点
                this.$emit("delete-node", data, node, store);

            },
            handleMenu(data, node, store) {
                //节点配置子菜单
                this.$emit("menu-node", data, node, store);
            },
        }
    }
</script>

<style>
    .el-tree-node__content:hover .tree-btn {
        display: inline-block;
    }
    .tree-btn{
        display:none;
    }
</style>