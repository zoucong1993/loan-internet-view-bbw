<template>
    <div>
        <jsplumb-view ref="jsplumb" @export-data="exportData" :jsonData="json" :toolBtns="toolBtns"></jsplumb-view>
    </div>
</template>
<script>
    import JsplumbView from "~/components/jsplumb/index";
    export default {
        name: 'tranConfigSchedule',
        props: {
            tranCode: String,
            jsonData: String,
            curVers: Number,
        },
        components: {
            JsplumbView
        },
        data() {
            return {
                resource: "",
                json: "",
                toolBtns: [
                    "start",
                    "end",
                    "tranConfigScheduleExecutor",
                ],
            }
        },
        created() {
            if (this.jsonData) {
                // this.json = JSON.parse(this.jsonData)
                this.json = this.jsonData;
            }
        },
        methods: {
            exportData(viewData) {
                let result = JSON.stringify(viewData);
                console.log(result);
            },
            onSubmit() {
                this.resource = this.$refs.jsplumb.getJsonData();
                // this.resource = JSON.stringify(this.resource);
                const _this = this;
                this.$http.post("/loan/tranConfigAction.do?_md=deployTranConfig",
                    {"tranCode": _this.tranCode, "jsonRes": _this.resource, "curVers": _this.curVers}
                ).then(function (response) {
                    if (response.success) {
                        _this.$success(response.msg);
                        _this.$emit("refreshTable");
                        _this.$emit("closeDialog");
                    } else {
                        _this.$error(response.msg);
                    }
                }).catch(function (error) {
                    _this.$error(error);
                })
            }
        }
    }
</script>


<style scoped>

</style>

