<template>
    <el-form ref="viewForm" :model="viewForm" label-width="100px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8" v-if="false">
                <el-form-item label="渠道编码" prop="chanCode">
                    <el-input v-model="viewForm.chanCode" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="渠道名称" prop="chanName">
                    <el-input v-model="viewForm.chanName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="产品名称" prop="prdCode">
                    <el-input v-model="viewForm.productName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="状态" prop="sts">
                    <elx-select v-model="viewForm.sts" selectKey="STD_PRD_STATE" :disabled="true"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="viewForm.remark" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="登记人员" prop="">
                    <el-input v-model="viewForm.createUser" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="登记时间" prop="createTime">
                    <el-input v-model="viewForm.createTime" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="修改人员" prop="updateUser">
                    <el-input v-model="viewForm.updateUser" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="修改时间" prop="updateTime">
                    <el-input v-model="viewForm.updateTime" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div align="center" style="margin-top: 15px;">
            <el-button type="primary" @click="back">返 回</el-button>
        </div>
    </el-form>
</template>
<script>
    export default {
        name: 'channelPrdRelView',
        props: {
            channelPrdRel:{}
        },
        data() {
            return {
                viewForm: this.channelPrdRel,
            }
        },
        methods: {
            back() {
                this.$emit("closeDialog");
            }
        }
    };
</script>