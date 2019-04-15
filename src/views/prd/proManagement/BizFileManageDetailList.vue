<template>
    <div>
        <el-card class="box-card" shadow="never">

            <el-dialog
                    title="详情"
                    :visible.sync="detailVisible"
                    :close-on-click-modal="false"
                    v-if="detailVisible"
                    :appendToBody="true"
                    width="65%"
                    v-drag>
                <biz-file-detail ref="bizFileDetail" @refreshTable="search" @closeDialog="detailVisible=false"
                                 :schemeId="schemeId"
                ></biz-file-detail>
            </el-dialog>
            <elx-edit-table ref="table"
                            :url="url"
                            :columnsData="columns"
                            :initParams="initParams"
                            :searchParams="searchParams"
                            :checkbox="false"
                            :tableData="tableData"
                            :params="params"
                            @handleDownloadDetail="handleDownloadDetail"
            >
            </elx-edit-table>
        </el-card>
    </div>
</template>
<script>


    export default {
        name: "bizFileManageDetailList",
        props: {
            params: {},
        },
        components: {},
        data() {
            return {
                url: "/loan/bizFileManageListAction.do?_md=selectForPage",
                initParams: {
                    manageId: this.$props.params.id,
                },
                searchParams: {},
                bizFileManageList: {},
                prdFileSchemeDetailList: {},
                tableData: [],
                columns: [{
                    field: "manageId",
                    type: "",
                    title: "档案管理编号",
                    width: "178",
                }, {
                    field: "fileName",
                    type: "",
                    title: "文件名称",
                    width: "178"
                }, {
                    field: "button",
                    type: "button",
                    title: "操作",
                    btnType: ['downloadDetail'],
                    width: "250",
                }],
                createTime: this.$dateUtil.getNowFormatDmatDate(),
                createUser: this.$sessionStorage.getLoginUser().user.userName,
                createOrg: this.$sessionStorage.getLoginUser().user.orgId,
                uploadVisible: false,
                detailVisible: false,

            }
        },
        created: function () {
            this.initFileManage();
        },
        methods: {
            getSelectedRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            refreshTable() {
                this.$refs.table.refresh();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            async initFileManage() {
                let flag = false
                await this.$http.post("/loan/prdFileSchemeDetailAction.do?_md=selectForCompare", {
                    "schemeId": this.$props.params.schemeId,
                    "custNo": this.$props.params.custNo,
                    "custName": this.$props.params.custName,
                    "applyNo": this.$props.params.applyNo,
                })
                    .then((response) => {
                        if (response.success) {
                            // this.$refs.table.refresh();
                        } else {
                            this.$error(response.msg);
                            flag = true
                        }
                    })
                    .catch((error) => {
                        flag = true
                        this.$error(error.message);
                    });

                if (flag) {
                    return;
                }
            },
            handleDownloadDetail(row){
                const _self = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadCommonAction.do?_md=commonDownload&manageId=" + row.manageId + "&fileName=" + row.fileName,
                    responseType: 'blob',
                }).then(function (response) {
                    if (!response) {
                        return;
                    }
                    let url = window.URL.createObjectURL(response);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    document.body.appendChild(link);
                    link.setAttribute('download', row.fileName);
                    link.click();
                }).catch(function (error) {
                    _self.$error(error.message);
                })
            },
            bizUpload() {
                const rows = this.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.bizFileManageList = {...rows[0]};
                this.uploadVisible = true;
            },
            bizDownload() {
                const rows = this.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.bizFileManageList = {...rows[0]};
            },
        }
    }
</script>