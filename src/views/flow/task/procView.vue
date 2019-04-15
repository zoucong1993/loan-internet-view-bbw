<template>
   <iframe v-if="isLoad" ref="procView" :src="url" width="100%" height="700px"></iframe>
</template>
<script>
    export default {
        name: 'procView',
        props: {
            rowData: Object,
        },
        data() {
            return {
                url: "/static/flow/diagram-viewer/index.html",
                isLoad: false
            }
        },
        mounted() {
            this.url = this.url + "?processDefinitionId=" + this.rowData.procDefId + "&processInstanceId=" + this.rowData.procInstId + "&taskId=" + this.rowData.id;
        },
        methods: {
            reload(){
                this.isLoad = true;
            }
        }
    };
</script>