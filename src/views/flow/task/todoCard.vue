<template>
    <div class="el-card-padding">
        <el-card class="el-card-height box-card" shadow="never" style="padding: 0">
            <div class="card-title">
                <span class="el-card-title">待办任务</span>
                <el-button class="el-button-right" type="text" @click="openTodoTaskWindow"><i class="el-icon-more"></i>
                </el-button>
            </div>
            <todo-task-list @refresh="refresh" :pageSize="5" :height="220">
            </todo-task-list>
        </el-card>
    </div>
</template>
<script>
    import todoTaskList from "./todoTaskList.vue"
    export default {
        components: {todoTaskList},
        name: 'todoCard',
        data() {
            return {
            }
        },
        methods: {
            refresh(){
                this.$emit('refresh');
            },
            openTodoTaskWindow() {
                this.$router.push('/flow/task/todoTaskList');
            },
        }
    }
</script>

<style scoped>
    .card-title{
        padding:0.58rem;
    }
</style>