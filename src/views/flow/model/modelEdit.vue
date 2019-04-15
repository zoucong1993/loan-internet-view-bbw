<template>
   <iframe :src="url" width="100%" height="800px"></iframe>
</template>
<script>
    export default {
        name: 'modelEdit',
        props: {modelId: String},
        data() {
            return {
                url: "/static/flow/modeler.html"
            }
        },
        mounted() {
            this.url = this.url + "?modelId=" + this.modelId
        },
        methods: {}
    };
</script>