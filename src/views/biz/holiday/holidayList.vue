<template>
    <div>
        <!--<elx-search-card searchTargetRef="table"-->
        <!--:searchItem="[{'holidayStart':{-->
        <!--'label': '节日日期',-->
        <!--'component':'el-date-picker',-->
        <!--'value-format':'yyyy-MM-dd'},'holidayType':{-->
        <!--'label':'日期类型',-->
        <!--'component':'elx-select',-->
        <!--'selectKey':'HLDTYPE'},-->
        <!--'holiyear':'年份'}]">-->
        <!--</elx-search-card>-->
        <el-card class="box-card" shadow="never">
            <el-form ref="searchParams" :model="searchParams" label-width="100px">
                <el-row type="flex" class="row-bg" justify="start">
                    <el-col :span="5" :offset="1">
                        <el-form-item label="节日日期" prop="holidayStart">
                            <el-date-picker
                                    v-model="searchParams.holidayStart"
                                    type="date" size="small"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="日期类型" prop="holidayType">
                            <elx-select type="text" v-model="searchParams.holidayType" size="small"
                                        selectKey="HLDTYPE"></elx-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="年份" prop="holiyear">
                            <el-input type="text" v-model="searchParams.holiyear" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-button type="primary" icon="el-icon-search" @click.native="search">查询</el-button>
                        <el-button type="info" icon="el-icon-loan-reset" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card" shadow="never">
            <el-row type="flex" class="row-bg" justify="start" style="padding-bottom: 10px">
                <el-button v-if="$route.meta.btns.addBtn" size="mini" type="success" icon="el-icon-plus"
                           @click="generateHoliday">生成
                </el-button>
                <el-button v-if="$route.meta.btns.deleteBtn" size="mini" type="danger" icon="el-icon-delete"
                           @click="deleteData">删除审批
                </el-button>
                <el-button v-if="$route.meta.btns.viewBtn" size="mini" type="primary" icon="el-icon-view"
                           @click="viewData">查看
                </el-button>
                <el-button v-if="$route.meta.btns.downloadBtn" size="mini" type="primary" icon="el-icon-download"
                           @click="downloadData">下载模板
                </el-button>
                <el-upload action="/loan/uploadFileAction.do?_md=holidayListUpload"
                           :on-success="handSuccess"
                           :show-file-list="false"
                >
                    <el-button v-if="$route.meta.btns.uploadBtn" size="mini" type="primary" icon="el-icon-upload2">点击上传
                    </el-button>
                </el-upload>
            </el-row>
            <elx-table ref="table"
                       :url="url"
                       :columns="columns"
                       :initParams="initParams"
                       :searchParams="searchParams"
            >
            </elx-table>
            <el-dialog
                    title="查看"
                    :visible.sync="viewVisible"
                    v-if="viewVisible"
                    width="60%"
                    :close-on-click-modal="false">
                <holiday-view ref="holidayView" :holidayInfo="row"></holiday-view>
            </el-dialog>
            <el-dialog
                    title="删除审批"
                    :visible.sync="delApproveVisible"
                    v-if="delApproveVisible"
                    width="60%"
                    :close-on-click-modal="false">
                <content-tab @refreshTable="refreshTable"
                             @closeDialog="delApproveVisible = false" :rowData="row" flag="todo"
                ></content-tab>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>


    import HolidayView from "~/views/biz/holiday/holidayView";
    import ContentTab from "~/views/biz/holiday/contentTab";

    export default {
        name: 'holidayList',
        components: {ContentTab, HolidayView},
        data() {
            return {
                url: "/loan/holidayAction.do?_md=findHolidayList",
                viewVisible: false,
                delApproveVisible: false,
                row: {},
                columns: [{
                    prop: "holidayStart",
                    label: "节假日期"
                }, {
                    prop: "workDay",
                    label: "下一工作日",
                }, {
                    prop: "holidayType",
                    label: "日期类型",
                    selectKey: "HLDTYPE",
                }, {
                    prop: "status",
                    label: "当前状态",
                    selectKey: "DQZT",
                }, {
                    prop: "holiyear",
                    label: "年份"
                }, {
                    prop: "remark",
                    label: "备注"
                }, {
                    prop: "approveSts",
                    label: "审批状态",
                    selectKey: "WF_SP_STATUS"
                }],
                searchParams: {
                    holidayStart: '',
                    holiyear: '',
                    holidayType: '',
                },
                initParams: {
                    status: '2'
                }
            }
        },
        mounted: function () {
        },
        methods: {
            getSelectRows() {
                return this.$refs.table.getSelectedRows();
            },
            search() {
                this.$refs.table.search();
            },
            refreshTable() {
                this.$refs.table.refresh();
            },
            resetForm() {
                this.$refs.searchParams.resetFields();
            },
            generateHoliday() {
                const _this = this;
                _this.$confirm("是否确认生成新的节假日信息!这将需要一定的时间!", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let y = new Date(this.$dateUtil.getNowFormatDmatDate());
                    let year = y.getFullYear();
                    let createUser = this.$sessionStorage.getLoginUser().user.userName;
                    let createOrg = this.$sessionStorage.getLoginUser().user.orgId;
                    let createTime = this.$dateUtil.getNowFormatDmatDate();
                    this.$http.post("/loan/holidayAction.do?_md=getHoliday",
                        {"year": year, "createUser": createUser, "createOrg": createOrg, "createTime": createTime})
                        .then(response => {
                            if (response.success) {
                                _this.$success(response.msg);
                                _this.refreshTable();
                            } else {
                                _this.$error(response.msg);
                            }
                        })
                }).catch(() => {
                    return false;
                })
            },
            deleteData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                if (rows[0].approveSts === "02") {
                    this.$error("该日期正在审批中!不可再次删除");
                    return;
                }
                if (rows[0].status !== "1") {
                    this.$error("只有启用状态下才可删除");
                    return;
                }
                const _self = this;
                _self.$confirm("是否删除此信息", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http.post("/loan/activityAction.do?_md=publisActiviti", {
                        processDefinitionKey: "holiday_manager",
                        businessKey: rows[0].id,
                        busiInfo: "节假日删除审批",
                        assignee: this.$sessionStorage.getLoginUser().user.userName,
                    }).then(function (response) {
                        if (response.success) {
                            _self.$success(response.msg);
                            _self.$refs.table.refresh();
                            _self.row = response.data;
                            _self.delApproveVisible = true;
                        }
                    }).catch(function (error) {
                        _self.$error(error.message);
                    })
                }).catch(() => {
                    return false;
                })
            },
            viewData() {
                const rows = this.getSelectRows();
                if (rows.length !== 1) {
                    this.$error("请选择一行数据");
                    return;
                }
                this.row = rows[0];
                this.viewVisible = true;
            },
            downloadData: function () {
                const _self = this;
                this.$http({
                    method: "get",
                    url: "/loan/downloadFileAction.do?_md=downloadHolidayList",
                    responseType: 'blob',
                })
                    .then(function (response) {
                        if (!response) {
                            return;
                        }
                        let url = window.URL.createObjectURL(response);
                        let link = document.createElement('a');
                        link.style.display = 'none';
                        link.href = url;
                        document.body.appendChild(link);
                        link.setAttribute('download', "holiday.xlsx");
                        link.click();
                    }).catch(function (error) {
                    _self.$error(error.message);
                })

            },
            handSuccess(response, file, fileList) {

                if (response.success) {
                    this.$notify({
                        title: '成功',
                        message: response.msg,
                        type: 'success'
                    });
                    this.refreshTable();
                } else {
                    this.$notify({
                        title: '失败',
                        message: response.msg,
                        type: 'error'
                    });
                }
            },
        }
    };
</script>