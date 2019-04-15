<template>
    <el-form ref="viewForm" :model="viewForm" label-width="100px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="添加类型" prop="createType">
                    <elx-select v-model="viewForm.createType" selectKey="STD_MDTJLX"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="批次编号" prop="batchNo">
                    <el-input v-model="viewForm.batchNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="客户编号" prop="custNo">
                    <el-input v-model="viewForm.custNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="客户姓名" prop="custName">
                    <el-input v-model="viewForm.custName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="证件类型" prop="certType">
                    <elx-select v-model="viewForm.certType" selectKey="STD_ZJLX"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="证件号码" prop="certNo">
                    <el-input v-model="viewForm.certNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="移入日期" prop="blackDate">
                    <el-date-picker
                            v-model="viewForm.blackDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="注销日期" prop="cancelDate">
                    <el-date-picker
                            v-model="viewForm.cancelDate"
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
                    <el-input v-model="viewForm.remark" type="textarea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="创建人员" prop="createUser">
                    <el-input v-model="viewForm.createUser"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="viewForm.createTime"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="修改人员" prop="updateUser">
                    <el-input v-model="viewForm.updateUser"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="修改时间" prop="updateTime">
                    <el-input v-model="viewForm.updateTime"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'blackListView',
        props: {
            blackList: {}
        },
        data() {
            return {
                viewForm: this.blackList,
            }
        }
    };
</script>