<template>
    <iframe ref="pdfView" v-if="isLoad" :src="url" width="100%" height="700px"></iframe>
</template>
<script>
    export default {
        name: 'pdfView',
        props: {
            filePath: String
        },
        data() {
            return {
                url: "/static/pdf/web/viewer.html",
                isLoad: true
            }
        },
        mounted: function () {
            this.load();
        },
        methods: {
            reload() {
                this.isLoad = true;
            },
            load() {
                let data = {
                    key: "/loan/contractModelAction.do?_md=preViewContractModel",
                    value: {"filePath":this.filePath}
                };
                setTimeout(() => {
                    this.$refs.pdfView.contentWindow.postMessage(data, document.location.origin+'/static/pdf/web/viewer.html');
                }, 2000);
            }


        }
    };
</script>