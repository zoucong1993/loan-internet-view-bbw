<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="渠道管理" name="first">
            <el-form ref="viewForm" :rules="rules" :model="viewForm" label-width="140px" disabled>

                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8" >
                        <el-form-item label="渠道编码" prop="chanCode">
                            <el-input v-model="viewForm.chanCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="渠道名称" prop="chanName">
                            <el-input v-model="viewForm.chanName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="渠道类型" prop="chanType">
                            <elx-select v-model="viewForm.chanType" selectKey="STD_LYQD"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="接入方式" prop="accessMode">
                            <elx-select v-model="viewForm.accessMode" selectKey="ACCESS_MODE"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="接入密钥" prop="secretKey">
                            <el-input v-model="viewForm.secretKey"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="放款总额度" prop="lmtAmt">
                            <el-input v-model="viewForm.lmtAmt"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="单户限额" prop="dayLmtAmt">
                            <el-input v-model="viewForm.dayLmtAmt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否允许授信申请" prop="lmtApplyFlag">
                            <elx-select v-model="viewForm.lmtApplyFlag" selectKey="STD_ZX_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="是否允许签约" prop="loanSignFlag">
                            <elx-select v-model="viewForm.loanSignFlag" selectKey="STD_ZX_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否允许放款" prop="loanPayFlag">
                            <elx-select v-model="viewForm.loanPayFlag" selectKey="STD_ZX_YES_NO"></elx-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="生效时间" prop="beginDate">
                            <el-input v-model="viewForm.beginDate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="失效时间" prop="endDate">
                            <el-input v-model="viewForm.endDate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="状态" prop="sts">
                            <elx-select v-model="viewForm.sts" selectKey="QDSNZT"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="viewForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="创建人员" prop="createUser">
                            <el-input v-model="viewForm.createUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="创建时间" prop="createTime">
                            <el-input v-model="viewForm.createTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="8">
                        <el-form-item label="修改人员" prop="updateUser">
                            <el-input v-model="viewForm.updateUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="viewForm.updateTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div align="center" style="margin-top: 15px;">
                <el-button type="danger" @click="onCancel">关闭</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="产品关联" name="second">
            <channel-prd-rel-list
                    :view="true"
                    :chanCode="chanCode"
            >
            </channel-prd-rel-list>
        </el-tab-pane>
    </el-tabs>

</template>
<script>

    import channelPrdRelList from './channelPrdRelList.vue';

    export default {
        name: 'channelView',
        props: {
            chanCode:String,
            channel:{}
        },
        components: {
            channelPrdRelList
        },
        data() {
            return {
                activeName:'first',
                viewForm: this.channel,
            }
        },
        methods: {
            onCancel() {
                this.$emit('closeDialog');
            }
        }
    };
</script>