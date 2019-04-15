import http from './http';

const commonUtil = {
    /**
     * 根据机构code，显示机构中文名称
     */
    orgTransfer: function (value) {
        return new Promise(reasolve => {
            http.post("/loan/orgAction.do?_md=findOrgByCode", {"code": value}
            ).then(
                function (response) {
                    reasolve(response.data);
                }
            ).catch(function (error) {
                return;
            });
        })

    },
    /**
     * 根据userName显示用户中文名称
     */
    userTransfer: function (value) {
        return new Promise(reasolve => {
            http.post("/loan/userAction.do?_md=findUserByUserName", {"userName": value}
            ).then(
                function (response) {
                    reasolve(response.data);
                }
            ).catch(function (error) {
                return;
            });
        })

    }
};

export default commonUtil