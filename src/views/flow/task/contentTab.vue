<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
     <!--   <el-tab-pane label="业务信息" name="apply">
            <indiv-apply-approve :rowData="rowData"></indiv-apply-approve>
        </el-tab-pane>-->
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
    import todoForm from "./todoForm.vue"
    import doneFrom from "./doneForm.vue"
    import procView from "./procView.vue"
    import pdfView from "./pdfView.vue"
    import creditApplyApprove from "../../lmt/creditApply/creditApplyApprove.vue"
    export default {
        name: 'contentTab',
        components: {todoForm, doneFrom, procView, pdfView, creditApplyApprove},
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