<template>
    <div style="height:750px;">
        <el-row type="flex" class="row-bg" justify="start">
            <el-col :span=5>
                <elx-tree ref="leftTree"
                          :url="url"
                          :childUrl="childUrl"
                          :renderContentTypes="renderContentTypes"
                          @node-click="clickNode"

                ></elx-tree>
            </el-col>
            <el-col :span=19>
                <component :is="comp" :custNo="custNo1" :operate="operate1"></component>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "indivCustInfoTree",
        components: {
            'custBaseInfoTab': () => import('./indivCustBaseInfoTab')
        },
        props:{
            custNo:String,
            operate:String
        },
        data() {
            return {
                url: "/loan/subAppAction.do?_md=findSubAppTree&id=20115776929159712768",
                childUrl: "/loan/subAppAction.do?_md=findSubAppTree",
                renderContentTypes: [],
                comp: 'custBaseInfoTab',
                custNo1:this.custNo,
                operate1:this.operate
            };
        },
        methods: {
            clickNode(d, n, s) {
                const _this = this;
                if(d.id!=="20115776929159712768"){
                    this.$http.post("/loan/subAppAction.do?_md=findSubAppById", {
                        id: d.id
                    }).then(function (response) {
                        if (response.success) {
                            _this.comp = function render(h, cxt) {
                                return h(require('@/views'+response.data.tabUrl))
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
    };
</script>