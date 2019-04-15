<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button size="mini" type="success" icon="el-icon-plus"
                           @click="bizUpload" >上传
                </el-button>
                <el-button  size="mini" type="danger" icon="el-icon-delete"
                            @click="bizDownload"  >下载
                </el-button>
            </el-row>




            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
                       :checkbox="false"
            >
            </elx-table>
        </el-card>
    </div>
</template>
<script>

    export default {
        name: "bizFileManageList",
        props:{
            schemeId: String,
            custNo: String,
            applyNo: String,
        },
        components: {


        },
        data() {
            return {
                url: "/loan/bizFileManageListAction.do?_md=selectForPage",
                initParams: {
                    schemeId:this.schemeId,
                },
                searchParams: {},
                bizFileManageList:{},
                prdFileSchemeDetailList:{},
                columns: [{
                    prop: "id",
                    label: "序号",

                }, {
                    prop: "fileName",
                    label: "文件名",
                }],

            }
        },
        mounted: function () {

        },
        methods: {
            getSelectedRows(){
                return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            refreshTable(){
                this.$refs.table.refresh();
            },
            resetForm(){
                this.$refs.searchParams.resetFields();
            },


            bizUpload(){
                const rows=this.getSelectedRows();
                if(rows.length!==1)
                {
                    this.$error("请选择一行数据");
                    return;
                }
                this.bizFileManageList={...rows[0]};
                this.uploadVisible=true;
            },
            bizDownload(){
                const rows=this.getSelectedRows();
                if(rows.length!==1)
                {
                    this.$error("请选择一行数据");
                    return;
                }
                this.bizFileManageList={...rows[0]};
            },



        }
    }
</script>