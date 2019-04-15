<template>
    <el-form :model="prdRateModelViewForm" :rules="rules" ref="prdRateModelViewForm" label-width="170px"
             :disabled="true">
        <el-form-item label="利率模型名称" prop="rateName">
            <el-input type="text" v-model="prdRateModelViewForm.rateName" >
            </el-input>
        </el-form-item>
        <el-form-item label="基准利率值" prop="rate">
            <el-input type="text" v-model.number="prdRateModelViewForm.rate" >
            </el-input>
        </el-form-item>
        <el-form-item label="利率方式" prop="rateMode">
            <elx-select type="text" v-model="prdRateModelViewForm.rateMode" selectKey="STD_FAC_RATE_MODE">
            </elx-select>
        </el-form-item>
        <el-form-item label="浮动类型" prop="floatType" v-if="visible">
            <elx-select type="text" v-model="prdRateModelViewForm.floatType" selectKey="FLOAT_TYPE">
            </elx-select>
        </el-form-item>
        <el-form-item label="浮动值" prop="floatValue" v-if="visible">
            <el-input type="text" v-model.number="prdRateModelViewForm.floatValue" >
            </el-input>
        </el-form-item>
        <el-form-item label="罚息利率方式" prop="fineRateMode">
            <elx-select type="text" v-model="prdRateModelViewForm.fineRateMode" selectKey="STD_FAC_RATE_MODE">
            </elx-select>
        </el-form-item>
        <el-form-item label="罚息浮动类型" prop="fineFloatType" v-if="fineVisible">
            <elx-select type="text" v-model="prdRateModelViewForm.fineFloatType" selectKey="FLOAT_TYPE">
            </elx-select>
        </el-form-item>
        <el-form-item label="罚息浮动值" prop="fineFloatValue" v-if="fineVisible">
            <el-input type="text" v-model.number="prdRateModelViewForm.fineFloatValue" >
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>

    export default {
        name: 'prdRateModelViewForm',
        props: {
            rateModelCode: String
        },
        data() {
            return {
                prdRateModelViewForm: {},
                rules: {

                },
                fineVisible: true,
                visible: true,
                prdUrl: "/loan/prdBaseInfoAction.do?_md=selectBaseInfoSelectTree"
            };
        },
        mounted: function () {
            this.initOptions();
        },
        methods: {
            initOptions() {
                const _this = this;
                this.$http.post("/loan/prdRateBaseAction.do?_md=findRateBaseByRateCode",{"rateCode":this.rateModelCode})
                    .then(function (response) {
                        if (response.success) {
                            if (response.data.rateMode ==="1") {
                                _this.visible = true;
                            } else {
                                _this.visible = false;

                            }
                            if (response.data.fineRateMode === "1") {
                                _this.fineVisible = true;
                            } else {
                                _this.fineVisible = false;
                            }
                            _this.prdRateModelViewForm = response.data;

                        } else {
                            _this.$error(response.msg);
                        }
                    }).catch(function (error) {
                    _this.$error(error);
                });
            },
        }

    }
    ;
</script>