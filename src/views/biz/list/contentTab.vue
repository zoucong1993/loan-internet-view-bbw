<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="批次信息" name="list">
            <list-batch-approve-list :batchNo="rowData.businessKey"></list-batch-approve-list>
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
    import listBatchApproveList from "~/views/biz/list/listBatchApproveList";


    export default {
        name: 'contentTab',
        components: {listBatchApproveList, todoForm, doneFrom, preTodoForm, procView, pdfView},
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