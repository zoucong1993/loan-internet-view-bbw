<template>
    <el-form ref="viewForm" :rules="rules" :model="viewForm" label-width="130px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12" >
                <el-form-item label="请求数据" prop="reqData">
                    <el-input  v-model="viewForm.reqData" type="textarea" :autosize="{ minRows:2,maxRows:30}"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="响应数据" prop="resData">
                    <el-input  v-model="viewForm.resData" type="textarea" :autosize="{ minRows:2,maxRows:30}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "interfaceMessage",
        props:{
            rows: {},
        },
        components: {

        },
        data() {
            return {
                viewForm: {
                },
            }
        },
        created(){
          this.selectInfoByKey()
        },
        methods:{
            selectInfoByKey(){
                const _this = this;
                this.$http.post('/loan/fundCreditInfoAction.do?_md=selectInfoByKey', {
                    'id': this.rows.id
                }).then(function (response) {
                    if (response.success) {
                        _this.viewForm = response.data
                    } else {
                        _this.$error(response.msg)
                    }
                }).catch(function (error) {
                    _this.$error(error);
                });
            }
        }

    }
</script>
