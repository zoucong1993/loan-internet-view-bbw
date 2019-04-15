<template>
    <div>
        <el-row  type="flex" class="row-bg" justify="start">
            <el-col :span="12">
                <todo-card @refresh="refresh" v-if="taskView"/>
            </el-col>
            <el-col :span="12">
               <done-card v-if="taskView"/>
            </el-col>
        </el-row>
        <el-row  type="flex" class="row-bg" justify="start">
            <el-col :span="12">
               <todo-sign-card @refresh="refresh" v-if="taskView"></todo-sign-card>
            </el-col>
            <el-col :span="12">
                <el-card class="el-card-height box-card" shadow="never">
                    <div>
                        <span>预留</span>
                        <el-button class="el-button-right" type="text"><i class="el-icon-more"></i></el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import todoCard from "@/views/flow/task/todoCard";
    import doneCard from "@/views/flow/task/doneCard";
    import todoSignCard from "@/views/flow/task/todoSignCard";
    export default {
        components: {todoCard, doneCard, todoSignCard},
        name: 'dashboard',
        data() {
            return{
                taskView: true,
            }
        },
        methods:{
            refresh() {
                this.taskView = false;
                this.$nextTick(function () {
                    this.taskView = true;
                })
            }
        }
    }
</script>
<style>
    .el-button-right{
        float: right;
    }
    .el-card-height{
        height: 380px;
    }
    .el-card-title{
        font-size: 18px;
        font-weight: 800;
    }
    .el-card-padding .el-card__body {
        padding: 0;
    }
</style>