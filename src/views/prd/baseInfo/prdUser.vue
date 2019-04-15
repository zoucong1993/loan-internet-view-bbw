<template>
    <div>
        <elx-search-card searchTargetRef="table"
                         :searchItem="[
                          { 'userName':'用户账号','empName':'用户姓名'},
                ]"

        >
        </elx-search-card>


        <el-card class="box-card" shadow="never">


            <elx-table  ref="table"
                        :url="url"
                        :columns="columns"
                        :initParams="initParams"
                        :searchParams="searchParams"
            >
            </elx-table>

            <div align="center" style="margin-top: 15px">
                <el-button type="primary"  @click="onSubmit">提交</el-button>
                <el-button type="danger" @click="onCancel">取消</el-button>
            </div>

        </el-card>
    </div>
</template>
<script>


    export default {
        name:'prdUserList',
        props:{

        },
        components:{

        },

        data(){
            return{
                url:"/loan/userAction.do?_md=findUserList",


                columns: [{
                    prop: 'id',
                    label: 'ID'
                },{
                    prop: 'userName',
                    label: '用户账号'

                },{
                    prop: 'empName',
                    label: '用户姓名'

                }],
                initParams:{
                },
                searchParams:{},
                prdUserList:{},


            }
        },  mounted:function() {

        },
        methods:{
            getSelectedRows(){
                return this.$refs.table.getSelectedRows();
            },
            search(){
                this.$refs.table.search();
            },
            refreshTable(){
                this.$refs.table.refresh();
            },
            resetForm(){
                this.$refs.searchParams.resetFields();
            },
            onSubmit(){
                const rows=this.getSelectedRows();
                if(rows.length!==1)
                {
                    this.$error("请选择一行数据");
                    return;
                }
                this.$emit('getRows',rows[0]);
                this.$emit('closeDialog');
            },

            onCancel(){
                this.$success("已取消");
                this.$emit('closeDialog');
            },
        }
    };
</script>