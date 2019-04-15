<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10" >
                <el-form-item label="文件名" prop="fileName">
                    <el-input type="text" v-model="form.schemeId" >
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">

            </el-col>
        </el-row>

        <div align="center" style="margin-top: 15px">
            <el-button type="primary"  @click="onSubmit('form')">提交</el-button>
            <el-button type="danger" @click="onCancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>

    export  default {
        name:'bizFileUpload',
        props:
            {

            },
        components:{
        },
        data(){
            return{
                form:{},
               rules:{

                },
            }
        },
        mounted:function () {

        },
        methods:{
            onSubmit(){

            },

            onCancel(){
                this.$success("已取消");
                this.$emit('closeDialog');

            },

        }
    };
</script>