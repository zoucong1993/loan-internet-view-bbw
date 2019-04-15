<template>
    <div>
        <div align="left"style="float: left">
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span=5>
                    <elx-tree ref="leftTree"
                              :url="url"
                              :childUrl="childUrl"
                              :renderContentTypes="renderContentTypes"
                              @node-click="clickNode"

                    ></elx-tree>
                </el-col>
                <el-row>
                    <el-col>
                          <div  style="height: 1000px">
                              <component :is="comp" :applyNo1="applyNo1" :custNo="custNo1" :operate="operate1" ></component>
                         </div>
                    </el-col>
                </el-row>
            </el-row>
        </div>

    </div>
</template>

<script>

    export default {
        name: "indivView",
        components: {
            'custBaseInfoTab': () => import('./indivCustInfoUpdate')
        },
        props: {
            applyNo1:'',
        },
        data() {
            return {
                url: "/loan/subAppAction.do?_md=findSubAppTree&pid=1111",
                childUrl: "/loan/subAppAction.do?_md=findSubAppTree",
                renderContentTypes: [],
                comp: 'custBaseInfoTab',
            };
        },
        methods: {

            clickNode(d, n, s) {
                const _this = this;
                this.$http.post("/loan/subAppAction.do?_md=findSubAppById", {
                    id:d.id
                }).then(function (response) {
                    if (response.success) {
                        _this.comp = function render(h, cxt) {
                            return h(require('~/views'+response.data.tabUrl))
                        }
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

<style scoped>

</style>