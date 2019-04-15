<template>

    <div>
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
                <elx-tree ref="leftTree"
                          :url="url"
                          :childUrl="childUrl"
                          :renderContentTypes="renderContentTypes"
                          @node-click="clickNode"
                ></elx-tree>
            </el-aside>
            <el-container>
                <el-header style="height: 50px; ">
                    <div>
                        <el-button size="mini" type="success" icon="el-icon-download"
                                   @click="handleDownloadAll">下载全部
                        </el-button>
                        <el-button v-show="this.node_n.isLeaf===true" size="mini" type="success"
                                   icon="el-icon-upload2"
                                   @click="uploadVisible=true">上传
                        </el-button>
                        <el-button v-show="this.node_n.isLeaf===true" size="mini" type="success"
                                   icon="el-icon-download"
                                   @click="handleDownload">下载
                        </el-button>
                        <el-dialog
                                title="上传"
                                :visible.sync="uploadVisible"
                                :close-on-click-modal="false"
                                v-if="uploadVisible"
                                :appendToBody="true"
                                width="65%"
                                v-drag>
                            <mult-upload ref="multUpload"
                                         @refreshTable="refreshTable"
                                         @closeDialog="uploadVisible=false"
                                         :params="params"
                                         :action="action"
                            ></mult-upload>
                        </el-dialog>
                    </div>
                </el-header>
                <el-main v-loading="imgLoading">
                    <div class="imgwrap" v-if="this.imgData.length !==0 ">
                        <div class="img_inner" v-for="src in imgData" align="center">
                            <viewer :imgData="imgData">
                                <img :src="src[1]" width="200px" height="140px" :onerror="defaultImg"/>
                            </viewer>
                            <br/>
                            <span style="float: left;width: 200px">{{src[0]}}</span>
                        </div>
                    </div>
                    <div align="center">
                        {{this.emptyText}}
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>


    export default {
        name: "imgData",
        props: {
            params1: String,
            params2: [],
        },
        components: {},
        data() {
            return {
                node_d: '',
                node_n: '',
                node_s: '',
                emptyText: ' ',
                imgLoading: true,
                preViewUrl: "/loan/upDownloadAction.do?_md=previewPicture",
                paramsUrl: "/loan/upDownloadAction.do?_md=prdFileManageData",
                action: "/loan/upDownloadAction.do?_md=commonUpload",
                url: "/loan/upDownloadAction.do?_md=findFileManageTreeNew&params=" + this.$props.params1,
                childUrl: "/loan/upDownloadAction.do?_md=findFileManageTreeNew&params=" + this.$props.params1,
                renderContentTypes: [],
                viewForm: {},
                imgData: [],
                ifTrue: false,
                downloadVisible: false,
                uploadVisible: false,
                defaultImg: 'this.src="' + require('../../../../static/layout/images/error.jpg') + '"',
                params: {}
            }
        },
        created: function () {
            this.initFileManage();
        },
        methods: {
            handleDownloadAll() {
                const _self = this;
                let row = this.params2[0];
                this.$http({
                    method: "get",
                    url: "/loan/downloadCommonAction.do?_md=commonDownloadZip&custNo=" + row.custNo + "&schemeId=" + row.schemeId,
                    responseType: 'blob',
                }).then(function (response) {
                    if (!response) {
                        return;
                    }
                    let url = window.URL.createObjectURL(response);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    document.body.appendChild(link);
                    link.setAttribute('download', row.custNo + ".zip");
                    link.click();
                }).catch(function (error) {
                    _self.$error(error.message);
                })
            },
            handleDownload() {
                let imgData = this.imgData;
                if (imgData.length === 0) {
                    this.$error("没有内容!");
                    return false;
                }
                const row = this.params;
                const _self = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadCommonAction.do?_md=commonDownloadZip&custNo=" + row.custNo + "&applyNo=" + row.applyNo + "&schemeId=" + row.schemeId + "&itemId=" + row.itemId,
                    responseType: 'blob',
                }).then(function (response) {
                    if (!response) {
                        return;
                    }
                    let url = window.URL.createObjectURL(response);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    document.body.appendChild(link);
                    link.setAttribute('download', row.itemId + ".zip");
                    link.click();
                }).catch(function (error) {
                    _self.$error(error.message);
                })
            },
            clickNode(d, n, s) {
                this.node_d = d;
                this.node_n = n;
                this.node_s = s;
                this.imgLoading = true;
                this.$http.post(this.preViewUrl, {
                    "id": d.id
                }).then((response) => {
                    this.imgLoading = false;
                    if (response.success) {
                        this.imgData = response.data;
                        if (this.imgData.length === 0) {
                            this.emptyText = '暂无数据!'
                        } else {
                            this.emptyText = ' '
                        }
                    } else {
                        this.$error(response.msg)
                    }
                }).catch((error) => {
                    this.imgLoading = false;
                    this.$error(error.message)
                });
                this.$http.post(this.paramsUrl, {
                    "id": d.id
                }).then((response) => {
                    if (response.success) {
                        this.params = response.data;
                    } else {
                        this.$error(response.msg)
                    }
                }).catch((error) => {
                    this.$error(error.message)
                });
            },
            refreshTable() {
                this.clickNode(this.node_d, this.node_n, this.node_s);
            },
            refresh() {
                this.$refs.table.refresh();
            },
            async initFileManage() {
                let flag = false;
                await this.$http.post("/loan/prdFileSchemeDetailAction.do?_md=selectForViewCompare", {
                    "params": this.$props.params2,
                }).then((response) => {
                    if (response.success) {
                        // this.$refs.table.refresh();
                    } else {
                        this.$error(response.msg);
                        flag = true
                    }
                }).catch((error) => {
                    flag = true;
                    this.$error(error.message);
                });
                this.imgLoading = false;
                if (flag) {
                    return false;
                }
            },
        }
    }
</script>


<style>
    .imgwrap {
        display: flex;
        flex-wrap: wrap;
    }

    .img_inner {
        margin: 1rem;
        cursor: pointer;
    }
</style>
