<template>
    <div class="el-card-padding">
        <el-card class="el-card-height box-card" shadow="never" style="padding: 0">
            <div>
                <span class="el-card-title">待签任务</span>
                <el-button class="el-button-right" type="text" @click="openTodoSignTaskWindow"><i class="el-icon-more"></i>
                </el-button>
            </div>
            <todo-sign-task-list @refresh="refresh"></todo-sign-task-list>
        </el-card>
    </div>
</template>
<script>
    import todoSignTaskList from "./todoSignTaskList.vue"
    export default {
        components: {todoSignTaskList},
        name: 'todoSignCard',
        data() {
            return {
            }
        },
        methods: {
            refresh(){
                this.$emit('refresh');
            },
            openTodoSignTaskWindow() {
                this.$router.push('/flow/task/todoSignTaskList');
            },
        }
    }
</script>