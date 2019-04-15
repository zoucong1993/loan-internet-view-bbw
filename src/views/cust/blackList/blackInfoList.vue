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
                <el-button  size="mini" type="warning" icon="el-icon-edit" @click="approveData">审批</el-button>
                <el-button v-if="$route.meta.btns.downloadBtn" size="mini" type="primary" icon="el-icon-download"
                           @click="downloadData">下载模板
                </el-button>
                <el-upload action="/loan/uploadFileAction.do?_md=blackListUpload"
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
                <black-list-add ref="blackListAdd" @refreshTable="refreshTable" @closeDialog="addVisible = false"
                                :addUrl="addUrl"></black-list-add>
            </el-dialog>
            <el-dialog
                    title="修改"
                    :visible.sync="updateVisible"
                    v-if="updateVisible"
                    width="60%">
                <black-list-update ref="blackListUpdate" @refreshTable="search" @closeDialog="updateVisible = false"
                                   :updateUrl="updateUrl" :blackList="blackList"></black-list-update>
            </el-dialog>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%">
                <black-list-view ref="blackListView" :blackList="blackList"></black-list-view>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>
    import blackListAdd from './blackListAdd';
    import blackListUpdate from './blackListUpdate';
    import blackListView from './blackListView';

    export default {
        name: 'blackInfoList',
        components: {
            blackListAdd,
            blackListUpdate,
            blackListView
        },
        data() {
            return {
                url: "/loan/blackListAction.do?_md=selectForPage",
                updateUrl: "/loan/blackListAction.do?_md=updateListDetail",
                addUrl: "/loan/blackListAction.do?_md=addListDetail",
                deleteUrl: "/loan/blackListAction.do?_md=deleteListDetail",
                columns: [{
                    prop: "custNo",
                    label: "客户编号"
                }, {
                    prop: "custName",
                    label: "客户姓名"
                }, {
                    prop: "certType",
                    label: "证件类型",
                    selectKey: 'STD_ZJLX'
                }, {
                    prop: "certNo",
                    label: "证件号码"
                }, {
                    prop: "sts",
                    label: "状态",
                    selectKey: 'MDZT'
                }],
                initParams: {},
                searchParams: {},
                blackList: {},
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
                    url: "/loan/downloadFileAction.do?_md=downloadBlackList",
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
                        link.setAttribute('download', "blackList.xlsx");
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
                    this.$http.post("/loan/blackListAction.do?_md=deleteListDetail",
                        {"id": id})
                        .then(function (response) {
                            if (response.success) {
                                _self.$success(response.msg);
                                _self.$refs.table.refresh();
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
                this.blackList = {...rows[0]};
                this.updateVisible = true;
            },
            viewData: function () {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.blackList = {...rows[0]};
                this.viewVisible = true;
            },
            //发起黑名单审批
            approveData:function(){
                const _this = this;
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if(rows[0].createType === '0'){
                    this.$error("批量导入的，不可在此页面发起审批");
                    return;
                }
                this.$http.post("/loan/activityAction.do?_md=publisActiviti", {
                    processDefinitionKey: "cus-black-flow",
                    businessKey: rows[0].id,
                    busiInfo: "黑名单审批",
                    assignee: this.$sessionStorage.getLoginUser().user.userName
                })
                    .then((response) => {
                        if (response.success) {
                            _this.$success(response.msg);
                            _this.$emit('refreshTable');
                            _this.$emit('closeDialog');
                            this.rowData = response.data;
                            this.approveVisible = true;
                        } else {
                            _this.$error(response.msg);
                        }
                    })
                    .catch((error) => {
                        _this.$error(error.message);
                    });
            }
        }
    };
</script>