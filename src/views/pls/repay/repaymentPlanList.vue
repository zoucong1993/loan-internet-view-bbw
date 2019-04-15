<template>
    <div>

        <el-card class="box-card" shadow="never">

            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>

        </el-card>
    </div>
</template>
<script>

    export default {
        name: "repaymentPlanList",
        props: {
            duebillNo: String
        },
        data() {
            return {
                url: "/loan/repayAction.do?_md=queryRepayPlan",
                columns: [

                    {
                        prop: "currPridNum",
                        label: "本期期数",
                    },
                    {
                        prop: "currSubPridNum",
                        label: "本期子期数",
                    },
                    {
                        prop: "begingDt",
                        label: "起始日期",
                    },
                    {
                        prop: "repayDate",
                        label: "应还日期",
                    },
                    {
                        prop: "gracePerdMatuDt",
                        label: "宽限期到期日",
                    },
                    {
                        prop: "repayAmt",
                        label: "应还金额(元)",
                    },
                    {
                        prop: "princAmt",
                        label: "应还本金(元)",
                    },
                    {
                        prop: "intAmt",
                        label: "应还利息(元)",
                    },
                    {
                        prop: "actRepayDate",
                        label: "实还日期",
                    },
                    {
                        prop: "payOffFlag",
                        label: "结清状态",
                        selectKey: 'STD_JQBZ'
                    }

                ],
                searchParams: {

                },
                initParams: {
                    'duebillNo': this.duebillNo,
                },
            };
        },
        methods: {
            searchItem: function () {
                this.$refs.table.search();
            },

            refresh: function () {
                this.$refs.table.refresh();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeDialog: function () {
                this.viewVisible = false;
            }
        }
    };
</script>