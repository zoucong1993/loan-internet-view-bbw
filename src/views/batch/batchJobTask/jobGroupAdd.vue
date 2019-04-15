<!--yangzhu-修改工作组下的添加工作组-->
<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
                <el-form-item label="工作组编码" prop="groupCode" >
                    <el-input v-model="addForm.groupCode" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="job名称" prop="jobName">
                    <el-input v-model="addForm.jobName" placeholder="请选择job名称" >
                        <el-button slot="append" icon="el-icon-search" @click="addJobVisible = true"></el-button>
                    </el-input>
                </el-form-item>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addForm')">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>


        <el-dialog
                title="添加job名称"
                :visible.sync="addJobVisible"
                v-if="addJobVisible"
                append-to-body
                width="60%">
            <cust-job-info-list
                    @closeDialog="addJobVisible = false"
                    @getRows="getRows">
            </cust-job-info-list>
        </el-dialog>


    </el-form>
</template>
<script>

    import custJobInfoList from './custJobInfoList';

    export default {
        name: 'jobGroupAdd',
        components: {
            custJobInfoList
        },
        props:{
            groupCode:String
        },
        data() {
            return {
                addJobVisible : false,
                addUrl: "/loan/jobGroupRefAction.do?_md=addJobGroupRef",
                addForm: {
                    groupCode:this.groupCode,
                    jobName:""
                },
                rules: {
                    groupCode: [
                        {required: true, message: '工作组名称不能为空'}
                    ],
                    groupName: [
                        {required: true, message: 'job组名称不能为空'}
                    ]
                },
            }
        },
        methods: {
            getRows(rows) {
                this.addForm.jobName = rows.jobName;
                this.addJobVisible = false;
            },
            onSubmit() {
                const _this = this;
                this.$refs.addForm.validate(valid => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post(_this.addUrl, _this.addForm)
                        .then((response) => {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                        .catch((error) => {
                            _this.$error(error.message);
                        });
                });
            },
            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');
            }
        }
    };
</script>