<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" disabled>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="方案编号" prop="schemeId">
                    <el-input type="text" v-model="form.schemeId" disabled>
                    </el-input>
                </el-form-item>

            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="项目编号" prop="itemId">
                    <el-input v-model="form.itemId" placeholder="请选择项目" disabled>
                        <el-button slot="append" icon="el-icon-search" @click="addFileVisible = true"></el-button>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="是否检查" prop="isCheck">
                    <elx-select selectKey="STD_YES_NO" v-model="form.isCheck">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="文档类型" prop="fileType">
                    <elx-select selectKey="WDLX" v-model="form.fileType">
                    </elx-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
                <el-form-item label="是否有效" prop="isValid">
                    <elx-select selectKey="STD_YES_NO" v-model="form.isValid">
                    </elx-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">

            </el-col>
        </el-row>

        <el-dialog
                title="文件列表"
                :visible.sync="addFileVisible"
                v-if="addFileVisible"
                append-to-body
                width="65%">
            <prd-file-list ref="PrdFileList" @refreshTable="refresh"
                           @closeDialog="addFileVisible = false" :schemeId="schemeId" flag="scheme"></prd-file-list>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary"
                           @click="choose">确认
                </el-button>
                <el-button type="danger" @click="addFileVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </el-form>
</template>
<script>

    export default {
        name: 'prdFileSchemeDetailView',
        props:
            {
                data: {}
            },
        components: {},
        data() {
            return {
                addFileVisible: false,
                form: this.$props.data,
            }
        },
        mounted: function () {

        },
        methods: {
            onCancel() {
                this.$emit('closeDialog');
            },

        }
    };
</script>