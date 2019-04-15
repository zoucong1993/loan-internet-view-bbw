<template>
    <el-form ref="viewForm" :model="viewForm" label-width="130px" disabled>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="节日日期" prop="holidayStart" style="margin-left: 60px">
                    <el-date-picker
                            v-model="viewForm.holidayStart"
                            type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
                <el-form-item label="下一工作日" prop="workDay">
                    <el-date-picker
                            v-model="viewForm.workDay"
                            type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="节日类型" prop="holidayType" style="margin-left: 60px">
                    <elx-select v-model="viewForm.holidayType" selectKey="HLDTYPE"></elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
                <el-form-item label="当前状态" prop="status">
                    <elx-select v-model="viewForm.status" selectKey="DQZT" disabled></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="年份" prop="holiyear" style="margin-left: 60px">
                    <el-input v-model="viewForm.holiyear"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
                <el-form-item label="创建人" prop="createUser">
                    <el-input v-model="viewForm.createUser" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="10">
                <el-form-item label="创建时间" prop="createTime" style="margin-left: 60px">
                    <el-input v-model="viewForm.createTime" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
                <el-form-item label="创建机构" prop="createOrg">
                    <elx-select-tree v-model="viewForm.createOrg" :url="selectTree" disabled></elx-select-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span="20">
                <el-form-item label="备注" prop="remark" style="margin-left: 60px">
                    <el-input type="textarea" v-model="viewForm.remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "holidayView",
        props: {
            holidayInfo: Object,
        },
        data() {
            return {
                viewForm: this.holidayInfo,
                selectTree: "/loan/orgAction.do?_md=findAllVueTree",
            }
        },
        methods: {},
    }
</script>

<style scoped>

</style>