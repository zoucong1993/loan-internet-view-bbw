<template>
    <div>
        <el-card class="box-card" shadow="never">
            <el-form v-if="ifFlag" ref="form" :model="form" :rules="rules" label-width="100px">
                <el-input v-model="form.executionId" v-show="false"></el-input>
                <el-input v-model="form.instNo" v-show="false"></el-input>
                <el-input v-model="form.businessKey" v-show="false"></el-input>
                <el-input v-model="form.procDefId" v-show="false"></el-input>
                <el-input v-model="form.opinion" v-show="false"></el-input>
                <el-input v-model="form.taskId" v-show="false"></el-input>
                <el-input v-model="form.currentAssignee" v-show="false"></el-input>
                <el-input v-model="form.schemeId" v-show="false"></el-input>
                <el-input v-model="form.taskDefKey" v-show="false"></el-input>
                <el-checkbox-group v-model="form.assigneeList" v-show="false"/>
                <component ref="childForm" :is="formPart" :flag="'pre'" :form="form" @gainChildRules="gainChildRules"></component>
                <el-card class="box-card" shadow="never">
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :span="12">
                            <el-form-item label="当前处理岗位" prop="station">
                                <el-input v-model="form.station" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="当前处理人" prop="empName">
                                <el-input v-model="form.empName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :span="12">
                            <el-form-item label="下一处理岗位" prop="nextStation">
                                <el-select v-model="form.nextStation" @change="changeStation">
                                    <el-option
                                            v-for="item in nextStations"
                                            :key="item.key"
                                            :value="item.key"
                                            :label="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="审批人" prop="assignee" v-if="assigneeShow">
                                <el-select v-model="form.assignee">
                                    <el-option
                                            v-for="item in assignees"
                                            :key="item.key"
                                            :value="item.key"
                                            :label="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :span="24">
                            <el-form-item label="我的结论" prop="remark">
                                <el-input type="textarea" v-model="form.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <el-col :offset="10">
                            <el-button type="success" @click="publish('1')" v-show="showSucButton">同意</el-button>
                            <el-button type="warning" @click="publish('2')" v-show="showRetButton">退回</el-button>
                            <el-button type="warning" @click="publish('3')" v-show="showBackButton">打回</el-button>
                            <el-button type="danger" @click="publish('4')" v-show="showRejBubbon">拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: 'preTodoForm',
        components: {},
        props: {
            publishData: Object
        },
        data() {
            return {
                form: {
                    station: '审查人',
                    assignee: null,
                    assigneeList: [],
                    nextStation: '',
                },
                rules: {
                    remark: [
                        {required: true, message: '处理意见为空'}
                    ],
                    opinion: [
                        {required: true, message: '审批意见为空'}
                    ],
                    assignee: [
                        {required: true, message: '审批人不能为空'}
                    ],
                    nextStation: [
                        {required: true, message: '下一处理岗位不能为空'}
                    ]
                },
                //流程实例ID
                instNo: null,
                //可选审批意见
                opinions: {},
                //可选角色code
                selectRole: null,
                //同意按钮隐藏
                showSucButton: false,
                //退回按钮隐藏
                showRetButton: false,
                //退回按钮隐藏
                showBackButton: false,
                //退回按钮隐藏
                showRejBubbon: false,
                //可选员工名称 List<String>
                assignees: [],
                //动态表单key
                fromPart: "",
                //会签标志
                countersign: false,
                //是否显示审批人域
                assigneeShow: false,
                ifFlag: true,
                ruleFlag: true,
                formPart: '',
                //下一岗位列表
                nextStations: [],
                //下一岗位和角色的映射关系
                roleStation: {},
                countersignFlag: {},
            }
        },
        created: async function () {
            const _this = this;
            this.form.currentAssignee = this.$sessionStorage.getLoginUser().user.userName;
            this.form.empName = this.$sessionStorage.getLoginUser().user.empName;
            this.form.businessKey = this.publishData.businessKey;
            await this.$http.post("/flow/interface/startUserInfo", {
                "processDefinitionKey": this.publishData.processDefinitionKey
            }).then((response) => {
                if (response.success) {
                    if(response.data) {
                        if (response.data !== "") {
                            this.form.schemeId = response.data.schemeId;
                            this.form.taskDefKey = response.data.taskDefKey;
                            this.nextStations = response.data.nextInfo;
                            this.formPart = function render(h, cxt) {
                                if (typeof response.data.formKey !== 'undefined') {
                                    return h(_this.$_require_(response.data.formKey))
                                }
                            };
                            this.opinions = response.data.opinion;
                            this.changeOpinion(this.opinions);
                        }
                    }
                } else {
                    this.$error(response.msg);
                }
            }).catch((error) => {
                this.$error(error.message );
            });

            if(this.nextStations.length > 0) {
                this.nextStations.forEach((item) => {
                    this.roleStation[item.key] = item.roleCode;
                    this.countersignFlag[item.key] = item.countersign;
                });
            };
        },
        methods: {
            publish(value) {
                this.$http.post("/loan/activityAction.do?_md=publisActiviti",
                    this.publishData
                ).then(response => {
                    if (response.success) {
                        this.form.executionId = response.data.executionId;
                        this.form.instNo = response.data.procInstId;
                        this.form.businessKey = response.data.businessKey;
                        this.form.procDefId = response.data.procDefId;
                        this.form.taskId = response.data.id;
                        this.onSubmit(value);
                    } else {
                        this.$error(response.msg);
                    }
                }).catch((error) => {
                    this.$error(error.message);
                });
            },

            onSubmit(value) {
                this.form.opinion = value;
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        this.$error("校验未通过");
                        return false;
                    } else {
                        this.$delete(this.form, "_md");
                            this.$http.post("/loan/activityAction.do?_md=dispathchTask",
                                this.form).then((response) => {
                                if (response.success) {
                                    this.$success('审核成功')  ;
                                    this.$emit('refreshTable');
                                    this.$emit('closeDialog');
                                } else {
                                    this.$error(response.msg);
                                }
                            }).catch((error) => {
                            this.$error(error.message);
                        })
                    }
                });
            },
            closeDialog() {
                this.$emit('closeDialog');
            },
            changeStation(value) {
                this.assigneeShow = false;
                this.form.assignee = null;
                this.assignees = [];
                this.selectRole = this.roleStation[value];
                this.countersign = this.countersignFlag[value];
                if (this.selectRole) {
                    this.$http.post("/loan/activityAction.do?_md=getSelectUser", {
                        "roleCode": this.selectRole
                    }).then((response) => {
                        if (response.success) {
                            //如果为会签传递参与回签的员工名称
                            if (this.countersign) {
                                this.assigneeShow = false;
                                response.data.forEach(item => {
                                    this.form.assigneeList.push(item.key);
                                });
                            } else {
                                this.assigneeShow = true;
                                this.assignees = response.data;
                            }
                        } else {
                            this.$error(response.msg);
                        }
                    }).catch((error) => {
                        this.$error(error.message);
                    });
                }
            },
            gainChildRules(chidldRule) {
                if (this.ruleFlag) {
                    this.ruleFlag = false;
                    this.ifFlag = false;
                    this.$nextTick(function () {
                        this.rules = {...chidldRule, ...this.rules};
                        this.ifFlag = true;
                    });
                }
            },
            changeOpinion(changeOpinion) {
                if (changeOpinion) {
                    for (let opinion in changeOpinion) {
                        if (opinion === '1') {
                            this.showSucButton = true;
                        }
                        if (opinion === '2') {
                            this.showRetButton = true;
                        }
                        if (opinion === '3') {
                            this.showBackButton = true;
                        }
                        if (opinion === '4') {
                            this.showRejBubbon = true;
                        }
                    }
                }
            }
        }
    };
</script>