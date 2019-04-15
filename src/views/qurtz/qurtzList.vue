<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="triggerName"
                    label="Trigger名称">
            </el-table-column>
            <el-table-column
                    prop="jobName"
                    label="Job名称">
            </el-table-column>
            <el-table-column
                    prop="cronExpression"
                    label="Trigger表达式">
            </el-table-column>
            <el-table-column
                    prop="triggerGroupName"
                    label="Trigger所属组">
            </el-table-column>
            <el-table-column
                    prop="triggerDescription"
                    label="Trigger描述">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="Job描述">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="Trigger状态"
                    :formatter = "covertStatus">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

    export default {
        name: 'qurtzList',
        components: {},
        data() {
            return {
                tableData: [],
                url: "/loan/jobQurtzAction.do?_md=querQurtzList",
            }
        },
        mounted () {
            this.$http.post(this.url)
                .then( (response) => {
                    if (response.success) {
                        this.tableData = response.data;
                    } else {
                        this.$error(response.msg);
                    }
                })
        },
        methods: {
            covertStatus(row, column, cellValue) {
                let status;
                switch(cellValue){
                    case 0: status="无"; break;
                    case 1: status="正常"; break;
                    case 2: status="暂停"; break;
                    case 3: status="完成"; break;
                    case 4: status="错误"; break;
                    case 5: status="阻塞"; break;
                    default: status="未知";
                }
                return status;
            }
        }
    };
</script>