<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form ref="form" :model="form" label-width="100px">
                <component :is="formPart" :form="form" flag="done" :readonly="true"></component>
                <el-card class="box-card" shadow="never">
                    <el-row>
                        <el-col :span="12" >
                            <el-form-item label="流程信息" prop="busiInfo">
                                <el-input v-model="form.busiInfo" readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="处理岗位" prop="name">
                                <el-input v-model="form.name" readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :span="12" >
                            <el-form-item label="开始时间" prop="startTime">
                                <el-input v-model="form.startTime" readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="结束时间" prop="endTime">
                                <el-input v-model="form.endTime" readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :span="24" >
                            <el-form-item label="我的结论" prop="remark">
                                <el-input type="textarea" v-model="form.remark" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :offset="10">
                            <el-button type="success" @click="onSubmit">追回</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="never">
            <span>
                <el-button size="mini" type="success" icon="el-icon-download"
                           @click="downloadData">下载
                </el-button>
            </span>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :selection="false"
                       @row-click="handleFrom"
            >
            </elx-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'doneFrom',
        props: {
            rowData: Object
        },
        data() {
            return {
                //form表单
                form: {},
                url: "/loan/activityAction.do?_md=getDoneTaskList",
                columns: [{
                    prop: "name",
                    label: "审批岗位",
                    showOverflowTooltip:true
                }, {
                    prop: "assignee",
                    label: "审批人",
                    showOverflowTooltip:true
                }, {
                    prop: "assigneeName",
                    label: "员工姓名",
                    showOverflowTooltip:true
                }, {
                    prop: "opinion",
                    label: "审批结果",
                    selectKey:'STD_FLW_OPINION',
                    showOverflowTooltip:true
                }, {
                    prop: "remark",
                    label: "意见",
                    showOverflowTooltip:true
                }, {
                    prop: "startTimeStr",
                    label: "开始时间",
                    showOverflowTooltip:true
                }, {
                    prop: "endTimeStr",
                    label: "结束时间",
                    showOverflowTooltip:true
                }],
                initParams: {"procInstId": this.rowData.procInstId},
                formPart: "",
                reslutData:{},
            }
        },
        created: async function () {
            //初始化表单数据
            this.handleFrom(this.rowData);
        },
        methods: {
            async handleFrom(row, event, column) {
                const _this = this;
                await this.$http.post("/flow/interface/getTaskFromProperties", {
                    "taskId": row.id
                }).then(function (response) {
                    if (response.success) {
                        _this.form = {...row, ...response.data};
                    } else {
                        _this.$error(response.msg);
                    }
                }).catch(function (error) {
                    _this.$error(error);
                });

                _this.formPart = function render(h, cxt) {
                    if(_this.form.formKey){
                        return h(_this.$_require_(_this.form.formKey))
                    }
                }
            },
            downloadData() {
                this.$http({
                    method: "post",
                    url: "/flow/taskAction/downloadHistTask/" + this.rowData.procInstId,
                    responseType:'blob',
                }).then((response) => {
                    if(!response) {
                        return;
                    }
                    let url = window.URL.createObjectURL(response);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    document.body.appendChild(link);
                    link.setAttribute('download',"审批意见.xlsx");
                    link.click();
                }).catch((error) => {
                    this.$error(error.message);
                });
            },
            onSubmit() {
                this.$http.post("/flow/interface/recoveryProcess", {
                    "taskId": this.rowData.id, "executionId": this.rowData.executionId, "instNo": this.rowData.procInstId
                }).then(response => {
                    if(response.success) {
                        this.$success(response.msg);
                        this.$emit('refreshTable');
                        this.$emit('closeDialog');
                    } else {
                        this.$error(response.msg);
                    }
                }).catch(error => {
                    this.$error(error.message);
                });
            }
        }
    };
</script>