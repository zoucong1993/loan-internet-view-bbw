<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="贷款凭证信息" name="list">
            <use-cert-apply-info :applyNo="rowData.businessKey"></use-cert-apply-info>
        </el-tab-pane>
        <el-tab-pane label="任务表单" name="pre" v-if="flag === 'pre'">
            <pre-todo-form :publishData="rowData" @closeDialog="closeDialog" @refreshTable="refreshTable"></pre-todo-form>
        </el-tab-pane>
        <el-tab-pane label="待办任务表单" name="todo" v-if="flag === 'todo'">
            <todo-form :rowData="rowData" @closeDialog="closeDialog" @refreshTable="refreshTable"></todo-form>
        </el-tab-pane>
        <el-tab-pane label="已办任务表单" name="done" v-if="flag === 'done'">
            <done-from :rowData="rowData"  @closeDialog="closeDialog" @refreshTable="refreshTable"/>
        </el-tab-pane>
        <el-tab-pane label="流程图" name="processView"  v-if="flag !== 'pre'">
            <proc-view :rowData="rowData" ref="processView"/>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import preTodoForm from "~/views/flow/task/preTodoForm";
    import todoForm from "~/views/flow/task/todoForm"
    import doneFrom from "~/views/flow/task/doneForm"
    import procView from "~/views/flow/task/procView"
    import pdfView from "~/views/flow/task/pdfView"
    import useCertApplyInfo from "~/views/pls/useCertApplyInfo";


    export default {
        name: 'contentTab',
        components: {useCertApplyInfo, todoForm, doneFrom, preTodoForm, procView, pdfView},
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
                if (this.activeName === 'processView') {
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