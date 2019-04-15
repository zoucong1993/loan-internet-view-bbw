<template>
    <div>
        <el-button size="mini" type="success" icon="el-icon-circle-plus"
                   @click="handleDownloadAll">下载全部
        </el-button>
        <el-card class="box-card" shadow="never">
            <elx-edit-table ref="table"
                            :url="url"
                            :columnsData="columns"
                            :initParams="initParams"
                            :searchParams="searchParams"
                            :checkbox="false"
                            :tableData="tableData"
                            :params="params"
                            @handleView="handleView"
                            @handleUpload="handleUpload"
                            @handleDownloadDetail="handleDownloadDetail"
                            @handleDownload="handleDownload"
            >
            </elx-edit-table>
        </el-card>
        <el-dialog
                title="下载"
                :visible.sync="downloadVisible"
                :close-on-click-modal="false"
                v-if="downloadVisible"
                :appendToBody="true"
                width="65%"
                v-drag>
            <biz-file-manage-detail-list ref="bizFileManageDetailList" @refreshTable="refreshTable"
                                         @closeDialog="downloadVisible=false"
                                         :params="params1"
            ></biz-file-manage-detail-list>
        </el-dialog>

        <el-dialog
                title="上传"
                :visible.sync="uploadVisible"
                :close-on-click-modal="false"
                v-if="uploadVisible"
                :appendToBody="true"
                width="65%"
                v-drag>
            <mult-upload ref="multUpload" @refreshTable="refreshTable" @closeDialog="uploadVisible=false"
                         :params="params1" :action="action"
            ></mult-upload>
        </el-dialog>
    </div>
</template>
<script>

    import bizFileManageDetailList from "./BizFileManageDetailList"

    export default {
        name: "bizFileManageList",
        props:{
            params: {},
        },
        components: {bizFileManageDetailList},
        data() {
            return {
                url: "/loan/bizFileManageAction.do?_md=selectForMapPage",
                initParams: {
                    schemeId: this.$props.params.schemeId,
                    custNo: this.$props.params.custNo,
                    applyNo: this.$props.params.applyNo,
                },
                searchParams: {},
                tableData: [],
                columns: [
                {
                    field: "itemId",
                    type: "",
                    title: "项目编号",
                    width:"178"
                }, {
                    field: "itemName",
                    type: "",
                    title: "项目名称",
                    width: "178"
                }, {
                    field: "fileType",
                    type: "select",
                    title: "文档类型",
                    disabled: true,
                    selectOptions: "WDLX",
                    width: "110"
                }, {
                    field: "isCheck",
                    type: "checkbox",
                    disabled: true,
                    title: "是否检查",
                    selectOptions: "STD_YES_NO",

                }, {
                    field: "button",
                    type: "button",
                    title: "操作",
                    btnType: ['upload', 'download', 'viewBtn'],
                    width: "250",
                }],
                createTime: this.$dateUtil.getNowFormatDmatDate(),
                createUser: this.$sessionStorage.getLoginUser().user.userName,
                createOrg: this.$sessionStorage.getLoginUser().user.orgId,
                uploadVisible:false,
                detailVisible:false,
                params1:{},
                downloadVisible:false,
                uploadVisible:false,
                action: "/loan/upDownloadAction.do?_md=commonUpload",
            }
        },
        created: function () {
            this.initFileManage();
        },
        methods: {
            handleDownloadAll (){
                const row = this.$props.params;
                const _self = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadCommonAction.do?_md=commonDownloadZip&custNo=" + row.custNo + "&applyNo=" + row.applyNo+ "&schemeId=" + row.schemeId,
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
                    link.setAttribute('download', row.schemeId +".zip");
                    link.click();
                }).catch(function (error) {
                    _self.$error(error.message);
                })
            },
            getSelectedRows(){
                return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            refreshTable(){
                this.$refs.table.refresh();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            resetForm(){
                this.$refs.searchParams.resetFields();
            },
            handleView(data){
                this.params1=data;
                this.downloadVisible=true;
            },
            handleUpload(data){
                this.params1=data;
                this.uploadVisible = true;
            },
            handleDownload(row){
                const _self = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadCommonAction.do?_md=commonDownloadZip&custNo=" + row.custNo + "&applyNo=" + row.applyNo+ "&schemeId=" + row.schemeId+ "&itemId=" + row.itemId,
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
                    link.setAttribute('download', row.itemId+".zip");
                    link.click();
                }).catch(function (error) {
                    _self.$error(error.message);
                })
            },
            async initFileManage() {
                let flag = false;
                await this.$http.post("/loan/prdFileSchemeDetailAction.do?_md=selectForCompare", {
                    "schemeId": this.$props.params.schemeId,
                    "custNo": this.$props.params.custNo,
                    "custName": this.$props.params.custName,
                    "applyNo": this.$props.params.applyNo,
                }).then((response) => {
                    if (response.success) {
                        // this.$refs.table.refresh();
                    } else {
                        this.$error(response.msg);
                        flag = true
                    }
                }).catch((error) => {
                    flag = true
                    this.$error(error.message);
                });
                if (flag) {
                    return;
                }
            },
        }
    }
</script>