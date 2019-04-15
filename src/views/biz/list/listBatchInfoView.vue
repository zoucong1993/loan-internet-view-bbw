<template>
    <el-form ref="viewForm" :model="viewForm" label-width="100px" disabled="true">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="批次编号" prop="batchNo">
                    <el-input v-model="viewForm.batchNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="名单类型" prop="listType">
                    <elx-select v-model="viewForm.listType" selectKey="STD_MDLX"></elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="文件名称" prop="fileName">
                    <el-input v-model="viewForm.fileName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="上传时间" prop="uploadTime">
                    <el-input v-model="viewForm.uploadTime"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
                <el-form-item label="生效日期" prop="beginDate">
                    <el-date-picker
                            v-model="viewForm.beginDate"
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
                            v-model="viewForm.endDate"
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
        name: 'listBatchInfoView',
        props: {
            listBatchInfo:{}
        },
        data() {
            return {
                viewForm: this.listBatchInfo,
            }
        },
        methods: {
        }
    };
</script>