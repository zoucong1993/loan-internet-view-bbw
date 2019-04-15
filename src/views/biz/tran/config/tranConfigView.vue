<template>
    <el-form ref="viewForm" :model="viewForm" label-width="100px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="交易号" prop="tranCode">
                    <el-input v-model="viewForm.tranCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="交易名称" prop="tranName">
                    <el-input v-model="viewForm.tranName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="交易锁" prop="tranLock">
                    <elx-select v-model="viewForm.tranLock" selectKey="STD_YES_NO"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="交易状态" prop="tranStatus">
                    <elx-select v-model="viewForm.tranStatus" selectKey="STD_START_STOP "></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="创建人员" prop="createUser">
                    <el-input v-model="viewForm.createUser"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="修改人员" prop="updateUser">
                    <el-input v-model="viewForm.updateUser"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="viewForm.createTime"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="修改时间" prop="updateTime">
                    <el-input v-model="viewForm.updateTime"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="创建机构" prop="createOrg">
                    <el-input v-model="viewForm.createOrg"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="修改机构" prop="updateOrg">
                    <el-input v-model="viewForm.updateOrg"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="版本号" prop="curVers">
                    <el-input v-model="viewForm.curVers"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1"></el-col>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name: 'tranConfigView',
        props: {
            tranConfig:{}
        },
        data() {
            return {
                viewForm: this.tranConfig
            }
        },
        methods: {
        }
    };
</script>