<template>
    <div>
        <el-container>
            <el-main>
                <el-row>
                    <el-button type="primary" icon="el-icon-view" @click="openQueryDialog">查看</el-button>
                    <el-button type="primary" @click="interfaceMessage">接口报文</el-button>
                    <el-button type="primary">征信报告</el-button>
                    <el-button type="primary" @click="hitTheRules">命中规则</el-button>
                </el-row>

                <elx-table ref="table"
                           :url="url"
                           :columns="columns"
                           :initParams="initParams"
                           :searchParams="searchParams"
                >
                </elx-table>
                <el-dialog
                        title="查看"
                        :visible.sync="viewVisible"
                        v-if="viewVisible"
                        width="70%"
                        :append-to-body='true'>
                    <fund-credit-info-view ref="fundCreditInfoView" :rows="rows" ></fund-credit-info-view>
                </el-dialog>
                <el-dialog
                        title="接口报文"
                        :visible.sync="interfaceMessageDialog"
                        v-if="interfaceMessageDialog"
                        width="70%"
                        :append-to-body='true'>
                    <interface-message ref="interfaceMessage" :rows="rows"></interface-message>
                </el-dialog>
                <el-dialog
                        title="命中规则"
                        :visible.sync="hitTheRulesDialog"
                        v-if="hitTheRulesDialog"
                        width="70%"
                        :append-to-body='true'>
                    <hit-the-rules-list ref="hitTheRulesList" :id="rows"></hit-the-rules-list>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import fundCreditInfoView from './fundCreditInfoView';
    import interfaceMessage from './interfaceMessage';
    import hitTheRulesList from './hitTheRulesList';

    export default {
        name: "fundCreditInfoList",
        props:{
            applyNo:String,
        },
        components:{
            fundCreditInfoView,
            interfaceMessage,
            hitTheRulesList,
        },
        data(){
            return {
                url:'/loan/fundCreditInfoAction.do?_md=selectList',
                columns: [{
                    prop: "custNo",
                    label: "客户编号",
                    showOverflowTooltip:true,
                }, {
                    prop: "custName",
                    label: "客户姓名",
                    showOverflowTooltip:true,
                }, {
                    prop: "certNo",
                    label: "证件号码",
                    showOverflowTooltip:true,
                }, {
                    prop: "mobile",
                    label: "手机号码",
                    showOverflowTooltip:true,
                }, {
                    prop: "reqTime",
                    label: "发送时间",
                    showOverflowTooltip:true,
                }, {
                    prop: "resTime",
                    label: "响应时间",
                    showOverflowTooltip:true,
                }, {
                    prop: "sts",
                    label: "状态",
                    selectKey: "STD_SEND_STS",
                    showOverflowTooltip:true,
                }, {
                    prop: "brSeriaNo",
                    label: "百融流水号",
                    showOverflowTooltip:true,
                }, {
                    prop: "brSts",
                    label: "百融响应码",
                    selectKey: "BR_RES_CODE",
                    showOverflowTooltip:true,
                }, {
                    prop: "result",
                    label: "决策结果",
                    showOverflowTooltip:true,
                }, {
                    prop: "creditLines",
                    label: "最终授信额度",
                    showOverflowTooltip:true,
                }, {
                    prop: "gearsCoefficient",
                    label: "客户评分档位系数",
                    showOverflowTooltip:true,
                }],
                initParams: {
                    "applyNo":this.applyNo
                },
                searchParams: {},
                viewVisible:false,
                interfaceMessageDialog:false,
                hitTheRulesDialog:false,
                rows:{},
            }
        },
        methods:{
            openQueryDialog(){
                const rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.rows = {...rows[0]}
                this.viewVisible = true
            },
            interfaceMessage(){
                const rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.rows = {...rows[0]}
                this.interfaceMessageDialog = true
            },
            hitTheRules(){
                const rows = this.$refs.table.getSelectedRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.rows = rows[0].id
                this.hitTheRulesDialog = true
            }
        }
    }
</script>

<style scoped>

</style>