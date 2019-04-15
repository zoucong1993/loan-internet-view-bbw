<template>
    <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8" >
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="addForm.custNo" placeholder="请选择用户" disabled class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="addUserVisible = true"></el-button>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" >
                <el-form-item label="客户姓名" prop="custName">
                    <el-input v-model="addForm.custName" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="证件类型" prop="certType">
                    <elx-select v-model="addForm.certType" disabled selectKey="STD_ZJLX"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="证件号码" prop="certNo">
                    <el-input v-model="addForm.certNo" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="产品编号" prop="prdCode">
                    <elx-select-tree v-model="addForm.prdCode" :url="selectTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="利率类型" prop="rateType">
                    <elx-select-tree v-model="addForm.rateType" :url="selectTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="执行利率" prop="actualRate">
                    <el-input v-model="addForm.actualRate"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="生效日期" prop="beginDate">
                    <el-date-picker
                            v-model="addForm.beginDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="失效日期" prop="endDate">
                    <el-date-picker
                            v-model="addForm.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark" type="textarea" maxlength="300"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="onSubmit('addForm')">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
        <el-dialog
                title="添加用户"
                :visible.sync="addUserVisible"
                v-if="addUserVisible"
                append-to-body
                width="80%">
            <cust-base-info-list
                    @closeDialog="addUserVisible = false"
                    @getRows="getRows">
            </cust-base-info-list>
        </el-dialog>
    </el-form>

</template>
<script>
    import * as regex from "@/utils/regex";
    import custBaseInfoList from '../custBaseInfoList';
    export default {
        name: 'whiteListAdd',
        props: {
            addUrl: String
        },
        components: {
            custBaseInfoList
        },
        data() {
            return {
                addUserVisible: false,
                addForm: {
                    custName:"",
                    custNo:"",
                    certType:"",
                    certNo:""
                },
                selectTreeUrl:"/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                rules: {
                    custName: [
                        {required: true, message: '客户姓名不能为空'}
                    ],
                    custNo: [
                        {required: true, message: '客户编号不能为空'}
                    ],
                    mobile: [
                        {pattern: regex.mbExp, message: "手机号码格式不正确"}
                    ],
                },
            }
        },
        mounted: function () {
        },
        methods: {
            getRows(rows) {
                this.addForm.custName = rows.custName;
                this.addForm.custNo = rows.custNo;
                this.addForm.certType = rows.certType;
                this.addForm.certNo = rows.certNo;
                this.addUserVisible = false;

            },
            onSubmit() {
                const _this = this;
                this.$refs.addForm.validate(valid => {
                    if(!valid){
                        return false;
                    }
                    this.$http.post(_this.addUrl,_this.addForm)
                        .then((response) => {
                            if(response.success){
                                _this.$success(response.msg);
                                _this.$emit('refreshTable');
                                _this.$emit('closeDialog');
                            }else{
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