<template>
    <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="120px" disabled>
        <el-card class="box-card is-never-shadow">
            <div slot="header" class="clearfix">
                <span>档案列表</span>

            </div>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="12">
                    <el-form-item label="项目编号" prop="itemId">
                        <el-input v-model="updateForm.itemId" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目名称" prop="itemName">
                        <el-input v-model="updateForm.itemName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="24">
                    <el-form-item label="检查说明" prop="itemDesc" class="el-form-reason">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 6}"
                                v-model="updateForm.itemDesc">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    export default {
        name: 'prdFileListView',
        props: {
            data: {}
        },
        data() {
            return {
                updateForm: this.data,
            }
        },
        methods: {}
    };
</script>
