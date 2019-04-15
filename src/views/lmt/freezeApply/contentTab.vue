<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="业务信息" name="apply">
            <freeze-apply-approve :rowData="rowData"></freeze-apply-approve>
        </el-tab-pane>
        <el-tab-pane label="待办任务表单" name="todo" v-if="flag === 'todo'">
            <todo-form :rowData="rowData" @closeDialog="closeDialog" @refreshTable="refreshTable"></todo-form>
        </el-tab-pane>
        <el-tab-pane label="已办任务表单" name="done" v-if="flag === 'done'">
            <done-from :rowData="rowData" />
        </el-tab-pane>
        <el-tab-pane label="流程图" name="processView">
            <proc-view :rowData="rowData" ref="processView"/>
        </el-tab-pane>
        <!--     <el-tab-pane label="pdf预览" name="pdfView">
                 <pdf-view :rowData="rowData" ref="pdfView"/>
             </el-tab-pane>-->
    </el-tabs>
</template>
<script>
    import todoForm from "../../flow/task/todoForm.vue"
    import doneFrom from "../../flow/task/doneForm.vue"
    import procView from "../../flow/task/procView.vue"
    import pdfView from "../../flow/task/pdfView.vue"
    import freezeApplyApprove from './freezeApplyApprove'
    export default {
        name: 'contentTab',
        components: {todoForm, doneFrom, procView, pdfView, freezeApplyApprove},
        props: {
            rowData: Object,
            flag: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                activeName: this.flag,
            };
        },
        methods: {
            handleClick(tab, event) {
                if(this.activeName === 'processView'){
                    this.$refs.processView.reload()
                }
            },
            refreshTable() {
                this.$emit("refreshTable");
            },
            closeDialog() {
                this.$emit("closeDialog");
            }
        },
    };
</script>