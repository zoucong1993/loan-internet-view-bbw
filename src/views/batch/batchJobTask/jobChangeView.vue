<!--添加、删除工作组，yangzhu-->
<template>
    <el-card class="box-card" shadow="never">

        <el-row type="flex" class="row-bg" justify="start" style="margin:0 0 3px 0">
            <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="success" icon="el-icon-view" @click="addGroupData">添加job
            </el-button>
            <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="danger" icon="el-icon-view" @click="deleteData">删除job
            </el-button>
        </el-row>

        <el-dialog
                title="添加job"
                append-to-body
                :visible.sync="addGroupDatavisible"
                v-if="addGroupDatavisible"
                width="30%"
                >
            <job-group-add ref="jobGroupAdd"  @refreshTable="refreshTable" @closeDialog="addGroupDatavisible = false"
            :groupCode = groupCode
            />
        </el-dialog>

        <elx-table ref="table"
                   :url="url"
                   :columns="columns"
                   :initParams="initParams"
                   :searchParams="searchParams">
        </elx-table>
    </el-card>
</template>

<script>
    import jobGroupAdd from './jobGroupAdd';
    export default {
        name: 'jobChangeView',
        components: {
            jobGroupAdd
        },
        props: {
            groupCode: String
        },
        data() {
            return {
                url: "/loan/jobGroupRefAction.do?_md=selectJobGroupRef",
                deleteUrl: "/loan/jobGroupRefAction.do?_md=deleteById",
                changeviewVisible: false,
                id:"",
                columns: [
                    {
                        prop: "groupCode",
                        label: "工作组编码"
                    }, {
                        prop: "jobName",
                        label: "JOB-名字"
                    }],
                initParams: {
                    "groupCode": this.groupCode
                },
                searchParams: {},
                addGroupDatavisible: false
            }
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
            addGroupData() {
                this.addGroupDatavisible = true;
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
            }

        }
    };
</script>