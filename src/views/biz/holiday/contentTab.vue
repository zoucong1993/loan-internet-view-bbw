<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="业务信息" name="apply">
            <holiday-info :rowData="rowData"></holiday-info>
        </el-tab-pane>
        <el-tab-pane label="待办任务表单" name="todo" v-if="flag === 'todo'">
            <todo-form :rowData="rowData" @closeDialog="closeDialog" @refreshTable="refreshTable"></todo-form>
        </el-tab-pane>
        <el-tab-pane label="已办任务表单" name="done" v-if="flag === 'done'">
            <done-from :rowData="rowData"/>
        </el-tab-pane>
        <el-tab-pane label="流程图" name="processView">
            <proc-view :rowData="rowData" ref="processView"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>

    import todoForm from "~/views/flow/task/todoForm"
    import doneFrom from "~/views/flow/task/doneForm.vue"
    import procView from "~/views/flow/task/procView.vue"
    import pdfView from "~/views/flow/task/pdfView.vue"
    import HolidayInfo from "~/views/biz/holiday/holidayInfo";

    export default {
        name: "contentTab",
        components: {HolidayInfo, todoForm, doneFrom, procView, pdfView},
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
    }
</script>
