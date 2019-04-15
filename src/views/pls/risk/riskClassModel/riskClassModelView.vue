<template>
    <el-form ref="viewForm" :model="viewForm" label-width="120px" disabled>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="8" :offset="2">
                <el-form-item label="产品编码" prop="prdCode">
                    <elx-select-tree v-model="viewForm.prdCode" :url="selectPrdTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="最小逾期天数" prop="overMin">
                    <el-input v-model="viewForm.overMin"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="最大逾期天数" prop="overMax">
                    <el-input v-model="viewForm.overMax"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="担保方式" prop="grtType">
                    <elx-select v-model="viewForm.grtType" selectKey="STD_ZB_ASSURE_MEANS"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="分类级别" prop="classLevel">
                    <elx-select v-model="viewForm.classLevel" selectKey="STD_ZB_FIVE_SORT"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="登记人员" prop="createUser">
                    <el-input v-model="viewForm.createUser"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="登记时间" prop="createTime">
                    <el-input v-model="viewForm.createTime"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="登记机构" prop="createOrg">
                    <elx-select-tree v-model="viewForm.createOrg" :url="selectOrgTreeUrl"></elx-select-tree>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="修改机构" prop="updateOrg">
                    <elx-select-tree v-model="viewForm.updateOrg" :url="selectOrgTreeUrl"></elx-select-tree>
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
        name: 'riskClassModelView',
        props: {
            classModel: {}
        },
        data() {
            return {
                viewForm: this.classModel,
                selectPrdTreeUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree",
                selectOrgTreeUrl: "/loan/orgAction.do?_md=findAllVueTree"
            }
        },
        methods: {}
    };
</script>