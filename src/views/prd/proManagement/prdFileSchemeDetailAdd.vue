<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
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
                <el-form-item label="排序" prop="itemOrd">
                    <el-input v-model="form.itemOrd" oninput="value=value.replace(/[^\d]/g,'')"
                              maxlength=4></el-input>
                </el-form-item>
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

    import PrdFileList from "../fileListManage/prdFileList";

    export default {
        name: 'prdFileSchemeDetailAdd',
        props: {
            schemeId: String
        },
        components: {
            PrdFileList
        },
        data() {
            return {
                addDetailVisible: false,
                form: {
                    schemeId: this.$props.schemeId,
                },
                rules: {
                    schemeId: [{
                        required: true, message: '方案编号不能为空'
                    }],
                    itemId: [{
                        required: true, message: '项目编号不能为空'
                    }],
                    isCheck: [{
                        required: true, message: '是否检查不能为空'
                    }],
                    fileType: [{
                        required: true, message: '文档类型不能为空'
                    }],
                    isValid: [{
                        required: true, message: '是否有效不能为空'
                    }],
                    itemOrd: [{
                        required: true, message: '排序不能为空'
                    }],
                },
                addFileVisible: false,
            }
        },
        mounted: function () {
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.form.validate(valid => {
                    if (!valid) {
                            return false;
                        }
                    this.$http.post("/loan/prdFileSchemeDetailAction.do?_md=insertPrdFileSchemeDetail", _this.form).then(
                        (response) => {
                            if (response.success) {
                                    _this.$success(response.msg);
                                _this.addResult = response.data;
                                _this.$emit('addSuccess', _this.addResult);
                                    _this.$emit('refreshTable');
                                _this.$emit('closeDialog', _this.addResult);
                            } else {
                                    _this.$error(response.msg);
                                }
                            }
                    ).catch((error) => {
                                _this.$error(error.message);
                            }
                        );
                    }
                );
            },

            onCancel() {
                this.$success("已取消");
                this.$emit('closeDialog');

            },
            choose() {
                const _this = this;
                let rows = this.$refs.PrdFileList.getSelectRows();
                _this.form.itemId = rows[0].itemId;
                _this.addFileVisible = false;

            },

        }
    };
</script>