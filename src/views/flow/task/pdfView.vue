<template>
   <iframe v-if="isLoad" :src="url" width="100%" height="700px"></iframe>
</template>
<script>
    export default {
        name: 'pdfView',
        props: {

        },
        data() {
            return {
                url: "/static/pdf/web/viewer.html",
                isLoad: true
            }
        },
        methods: {
            reload(){
                this.isLoad = true;
            }
        }
    };
</script>