<template>
    <div class="el-card-padding">
        <el-card class="el-card-height box-card" shadow="never" style="padding: 0">
            <div class="card-title">
                <span class="el-card-title">已办任务</span>
                <el-button class="el-button-right" type="text" @click="openDoneTaskWindow"><i class="el-icon-more"></i>
                </el-button>
            </div>
            <done-task-list @refresh="refresh" :pageSize="5" :height="220"/>
        </el-card>
    </div>
</template>
<script>
    import doneTaskList from "./doneTaskList.vue"
    export default {
        components: {doneTaskList},
        name: 'doneCard',
        data() {
            return {
            }
        },
        methods: {
            refresh(){
                this.$emit('refresh');
            },
            openDoneTaskWindow() {
                this.$router.push('/flow/task/doneTaskList');
            },
        }
    }
</script>

<style scoped>
    .card-title{
        padding:0.58rem;
    }
</style>
