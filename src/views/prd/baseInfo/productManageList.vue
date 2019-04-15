<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                         {
                         'prdCode':'产品编码',
                         'prdName':'产品名称'
                         }]":searchParams="searchParams"
        ></elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 10px 0">
                <el-col :span=5>
                    <elx-tree ref="leftTree"
                              :url="treeUrl"
                              :childUrl="childTree"
                              @add-node="addNode"
                              @delete-node="deleteNode"
                              @update-node="updateNode"
                              @node-click="clickNode"
                    ></elx-tree>
                </el-col>
                <el-col>
                    <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 10px 0">
                        <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-edit"
                                   @click="addBtn">新增
                        </el-button>
                        <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                                   @click="updateBtn">修改
                        </el-button>
                        <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-edit"
                                   @click="deleteBtn">删除
                        </el-button>
                        <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                                   @click="viewBtn">查看
                        </el-button>
                    </el-row>
                    <elx-table ref="table"
                               :url="selectBaseInfoListUrl"
                               :columns="columns"
                               :initParams="initParams"
                               :searchParams="searchParams"
                               :checkbox="false"
                    >
                    </elx-table>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog title="新增产品目录"
                   :visible.sync="addCatalogVisible"
                   v-if="addCatalogVisible"
                   width="30%">
            <product-catalog-add @refreshLeftTree="refreshLeftTree"
                                 @refreshTable="refreshTable"
                                 @closeDialog="addCatalogVisible = false"
                                 :addCatalogUrl="addCatalogUrl"
                                 :parentCat="parentCat"
            >
            </product-catalog-add>
        </el-dialog>
        <el-dialog title="修改产品目录"
                   :visible.sync="updateCatalogVisible"
                   v-if="updateCatalogVisible"
                   width="30%">
            <product-catalog-update @refreshLeftTree="refreshLeftTree"
                                    @refreshTable="refreshTable"
                                    @closeDialog="updateCatalogVisible = false"
                                    :updateCatalogUrl="updateCatalogUrl"
                                    :catalog="catalog"
            >
            </product-catalog-update>
        </el-dialog>
        <el-dialog title="新增产品"
                   :visible.sync="addBaseInfoVisible"
                   v-if="addBaseInfoVisible"
                   width="75%">
            <product-base-info-add @refreshTable="refreshTable"
                                   @addBaseInfoDialog="prdInfoTabs"
                                   @closeDialog="addBaseInfoVisible = false"
                                   :addBaseInfoUrl="addBaseInfoUrl"
                                   :findCatalogSelectTreeUrl="findCatalogSelectTreeUrl">
            </product-base-info-add>
        </el-dialog>
        <el-dialog title="产品详情"
                   :visible.sync="prdInfoTabsVisible"
                   v-if="prdInfoTabsVisible"
                   width="80%">
            <product-info-tabs @refreshTable="refreshTable"
                               @closeDialog="prdInfoTabsVisible = false"
                               :productNo="productNo" :productName="productName"
                               :operate="operate">
            </product-info-tabs>
        </el-dialog>
    </div>
</template>
<script>
    import productCatalogAdd from './productCatalogAdd.vue';
    import productBaseInfoAdd from './productBaseInfoAdd.vue';
    import productInfoTabs from './productInfoTabs.vue';
    import productCatalogUpdate from './productCatalogUpdate.vue';

    export default {
        name: 'productManageList',
        components: {
            productCatalogAdd,
            productBaseInfoAdd,
            "product-info-tabs": productInfoTabs,
            productCatalogUpdate
        },
        data() {
            return {
                selectBaseInfoListUrl: "/loan/prdBaseInfoAction.do?_md=selectBySelective",
                treeUrl: "/loan/prdCatalogAction.do?_md=findVueTreeRoot",
                childTree: "/loan/prdCatalogAction.do?_md=findChildVueTree",
                addCatalogUrl: "/loan/prdCatalogAction.do?_md=addPrdCatalog",
                updateCatalogUrl: "/loan/prdCatalogAction.do?_md=updatePrdCatalog",
                viewCatalogUrl: "/loan/prdCatalogAction.do?_md=selectPrdCatalogByCatalog",
                deleteCatalogUrl: "/loan/prdCatalogAction.do?_md=deletePrdCatalog",
                addBaseInfoUrl: "/loan/prdBaseInfoAction.do?_md=addPrdBaseInfo",
                findCatalogSelectTreeUrl: "/loan/prdCatalogAction.do?_md=selectCatalogSelectTree",
                viewBaseInfoUrl: "/loan/prdBaseInfoAction.do?_md=selectPrdBaseInfoByPrimaryKey",
                deleteBaseInfoUrl: "/loan/prdBaseInfoAction.do?_md=deletePrdBaseInfo",
                catalog: {},
                addCatalogVisible: false,
                updateCatalogVisible: false,
                addBaseInfoVisible: false,
                prdInfoTabsVisible: false,
                productNo: "",
                productName: "",
                parentCat: [],
                operate: "",
                columns: [{
                    prop: "prdCode",
                    label: "产品编码"
                }, {
                    prop: "prdName",
                    label: "产品名称"
                }, {
                    prop: "prdStatus",
                    label: "产品状态",
                    selectKey: 'STD_VALID_STS'
                }],
                searchParams: {
                    prdCode: '',
                    prdName: ''
                },
                initParams: {},
            }
        },
        mounted: function () {
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            addBtn() {
                this.addBaseInfoVisible = true;
            },
            deleteBtn() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                const id = rows[0].id;
                _this.$confirm("是否删除此节点？", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http.post(this.deleteBaseInfoUrl,
                        {"id": id}).then(function (response) {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$refs.table.refresh();
                        }
                    }).catch(function (error) {
                        _this.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })

            },
            updateBtn() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.productNo = rows[0].prdCode;
                    _this.productName = rows[0].prdName;
                    _this.operate = "update";
                    _this.prdInfoTabsVisible = true;
                }
            },
            viewBtn() {
                const rows = this.getSelectRows();
                const _this = this;
                if (rows.length !== 1) {
                    _this.$error("请选择一行数据");
                } else {
                    _this.productNo = rows[0].prdCode;
                    _this.productName = rows[0].prdName;
                    _this.operate = "view";
                    _this.prdInfoTabsVisible = true;
                }
            },
            prdInfoTabs(prdCode){
                this.addBaseInfoVisible = false;
                this.productNo = prdCode;
                this.operate = "update";
                this.prdInfoTabsVisible = true;

            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            addNode(data, node, store) {
                this.parentCat = {...data};
                this.addCatalogVisible = true;
            },
            clickNode(data, node, store) {
                this.$set(this.searchParams, 'supCatalog', data.id);
                this.$refs.table.search();
            },
            updateNode(data, node, store) {
                const _this = this;
                this.$http
                    .post(this.viewCatalogUrl, {
                        id: data.id,
                    })
                    .then(function (response) {
                        if (response.success) {
                            _this.catalog = {...response.data};
                            _this.updateCatalogVisible = true;
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch(function (error) {
                        _this.$error(error.message);
                    });
            },
            deleteNode(data, node, store) {
                const _this = this;
                if (!data.leaf) {
                    _this.$warning("此节点有子级，不可删除！")
                    return false;
                }
                _this.$confirm("是否删除此该产品？", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    _this.$http
                        .post(this.deleteCatalogUrl, {
                            id: data.id,
                        })
                        .then(function (response) {
                            if (response.success) {
                                _this.$success("删除成功！");
                                _this.$refs.leftTree.initTreeData();
                                _this.$refs.table.refresh();
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch(function (error) {
                            _this.$error(error.message);
                        });
                }).catch(() => {
                    return false;
                })
            },
            refreshLeftTree() {
                this.$refs.leftTree.initTreeData();
            },
            refreshTable() {
                this.$refs.table.refresh();
            }
        }
    };
</script>