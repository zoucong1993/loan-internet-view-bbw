<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[{ 'custNo':'客户编号',
                                           'custName':'客户名称',
                                           'certNo':'证件号码'
                                           }]"
        >
        </elx-search-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus"
                           @click="addVisible = true">新增
                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteData">删除
                </el-button>
                <el-button v-if="$route.meta.btns.updateBtn" size="mini" type="warning" icon="el-icon-edit"
                           @click="updateData">修改
                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
                </el-button>
                <el-button v-if="$route.meta.btns.downloadBtn" size="mini" type="primary" icon="el-icon-download"
                           @click="downloadData">下载模板
                </el-button>
                <el-upload action="/loan/uploadFileAction.do?_md=whiteListUpload"
                           :on-success="handSuccess"
                           :show-file-list="false"
                >
                    <el-button v-if="$route.meta.btns.uploadBtn" size="mini" type="primary" icon="el-icon-upload2">点击上传
                    </el-button>
                </el-upload>

            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="新增"
                    :visible.sync="addVisible"
                    v-if="addVisible"
                    width="60%">
                <white-list-add ref="whiteListAdd" @refreshTable="refreshTable" @closeDialog="addVisible = false"
                                :addUrl="addUrl"></white-list-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="60%">
                <white-list-update ref="whiteListUpdate" @refreshTable="search" @closeDialog="updateVisible = false"
                                   :updateUrl="updateUrl" :whiteList="whiteList"></white-list-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <white-list-view ref="whiteListView" :whiteList="whiteList"></white-list-view>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>
    import whiteListAdd from './whiteListAdd';
    import whiteListUpdate from './whiteListUpdate';
    import whiteListView from './whiteListView';

    export default {
        name: 'whiteInfoList',
        components: {
            whiteListAdd,
            whiteListUpdate,
            whiteListView
        },
        data() {
            return {
                url: "/loan/whiteListAction.do?_md=selectForPage",
                updateUrl: "/loan/whiteListAction.do?_md=updateListDetail",
                addUrl: "/loan/whiteListAction.do?_md=addListDetail",
                deleteUrl: "/loan/whiteListAction.do?_md=deleteListDetail",
                columns: [{
                    prop: "custName",
                    label: "客户姓名"
                }, {
                    prop: "certNo",
                    label: "证件号码"
                }, {
                    prop: "mobile",
                    label: "手机号",
                }, {
                    prop: "actualRate",
                    label: "执行利率",
                }, {
                    prop: "lmtAmt",
                    label: "额度",
                }, {
                    prop: "beginDate",
                    label: "生效时间",
                }, {
                    prop: "endDate",
                    label: "失效时间",
                }, {
                    prop: "sts",
                    label: "状态",
                    selectKey: 'STD_MDZT'
                }],
                initParams: {},
                searchParams: {},
                whiteList: {},
                addVisible: false,
                updateVisible: false,
                viewVisible: false
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
            refreshTable() {
                this.$refs.table.refresh();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            handSuccess(response, file, fileList) {
                if (response.success) {
                    this.$notify({
                        title: '成功',
                        message: response.msg,
                        type: 'success'
                    });
                    this.refreshTable();
                } else {
                    this.$notify({
                        title: '失败',
                        message: response.msg,
                        type: 'error'
                    });
                }
            },
            downloadData: function () {
                const _self = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadFileAction.do?_md=downloadWhiteList",
                    responseType: 'blob',
                })
                    .then(function (response) {
                        if (!response) {
                            return;
                        }
                        let url = window.URL.createObjectURL(response);
                        let link = document.createElement('a');
                        link.style.display = 'none';
                        link.href = url;
                        document.body.appendChild(link);
                        link.setAttribute('download', "whiteList.xlsx");
                        link.click();
                    }).catch(function (error) {
                    _self.$error(error.message);
                })

            },
            deleteData: function () {
                const _self = this;
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    const rows = this.getSelectRows();
                    if (rows.length !== 1) {
                        this.$error("请选择一行数据");
                        return;
                    }
                    let id = rows[0].id;
                    _self.$http.post(_self.deleteUrl,
                        {"id": id})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
                            } else {
                                _self.$error(response.msg);
                            }
                        }).catch(function (error) {
                        _self.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })
            },
            updateData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].sts != "0") {
                    this.$error("请选择未审批数据");
                    return;
                }
                this.whiteList = {...rows[0]};
                this.updateVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.whiteList = {...rows[0]};
                this.viewVisible = true;
            },
        }
    };
</script>