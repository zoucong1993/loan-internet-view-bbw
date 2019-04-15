<template>
  <div>
  <div class="topNav">
    <div class="wrap">
      <img class="logo" src="../../../static/login/images/logo_bbw1.png"/>
      <span>网贷管理系统</span>
    </div>
  </div>
  <div class="cont">
    <div class="wrap">
      <!--<img class="text" src="../../../static/login/images/text.png">-->
      <div class="loginBox">
        <h2>
          <span>欢迎登录</span>
        </h2>
        <p>
          <em>账&nbsp;&nbsp;&nbsp;号</em>
          <input v-model="username" class="inpt" type="text" placeholder="请输入账号"/>
          <span v-show="usernameMsgShow">用户名不能为空</span>
        </p>
        <p>
          <em>密&nbsp;&nbsp;&nbsp;码</em>
          <input v-model="password" class="inpt" type="password" placeholder="请输入密码"/>
          <span v-show="passwordMsgShow">密码不能为空</span>
        </p>
        <p>
          <em>验证码</em>
          <input v-model="verificationcode" class="inpt" type="text" placeholder="请输入验证码"/>
          <span v-show="verificationcodeMsgShow">验证码不能为空</span>
        </p>
        <input id="loginBtn" class="btns" type="button" value="登录" @click="handleLogin">
      </div>
    </div>
  </div>
  <div class="footer">© 2014-2018 北京科蓝软件有限公司 版权所有 京ICP备14026205号 </div>
  </div>
</template>

<script>
const blankPattern = /^(\s)*$/g;
export default {
    name: "login",
    data() {
        return {
            username: 'super0',
            password: '1',
            verificationcode: '6666',
            usernameMsgShow: false,
            passwordMsgShow: false,
            verificationcodeMsgShow: false
        };
    },
    mounted: function() {
    },
    methods: {
        handleLogin: async function() {
            if (!this.isValid()){
                return;
            }

            const loginResponse = await this.$http.post(
                "/loan/loginLogoutAction.do?_md=login",
                {
                    username: this.username,
                    password: this.password
                }
            );
            if (!loginResponse.success) {
                this.$error(loginResponse.msg);
                return;
            }
            // 先清空所有的session信息
            this.$sessionStorage.clearAll();
            // 登录成功，将登陆信息放入session
            this.$sessionStorage.setLoginUser(loginResponse.data);
            // 登录信息flag
            this.$sessionStorage.setLoginMsgFlag(true);
            // 查询用户菜单
            const userAppResponse = await this.$http.post(
                "/loan/appAction.do?_md=selectMenusTreeByRoleIds"
            );
            if (!userAppResponse.success) {
                this.$error(userAppResponse.msg);
                return;
            }
            this.$sessionStorage.setUserMenu(userAppResponse.data);
            // 这里重新刷页面是为了重新加载动态路由
            location.reload();
        },
        isValid: function () {
            let valid = true;
            if (blankPattern.test(this.username)) {
                this.usernameMsgShow = true;
                valid = false;
            } else {
                this.usernameMsgShow = false;
            }
            if (blankPattern.test(this.password)){
                this.passwordMsgShow = true;
                valid = false;
            } else {
                this.passwordMsgShow = false;
            }
            return valid;
        }
    },
};
</script>
<style scoped>
    .logo {
      width: 180px;
      height: 40px;
  }

  .topNav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 28px;
    z-index: 10;
  }

  .topNav img {
    vertical-align: top;
  }

  .topNav span {
    display: inline-block;
    padding-left: 15px;
    border-left: 1px solid #b4bad0;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    vertical-align: top;
    margin-left: 18px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
  }

  .cont {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(../../../static/login/images/bgimg_bbw2.jpg) no-repeat center top;
    background-size: 100% 100%;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    line-height: 45px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    text-align: center;
  }

  .wrap {
    width: 1200px;
    margin: 0 auto;
  }

  .text {
    position: absolute;
    right: 50%;
    top: 50%;
    width: 548px;
    height: 141px;
    margin: -70.5px 10px 0 0;
  }

  .loginBox {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -210px 0 0 180px;
    width: 320px;
    height: 430px;
    padding: 0 40px;
    background: #fff;
    border-radius: 5px;
  }

  .loginBox h2 {
    position: relative;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    line-height: 60px;
    font-weight: normal;
    padding-top: 15px;
    height: 60px;
    margin: 0;
    border-bottom: 1px solid #d4d4d4;
    margin-bottom: 34px;
  }

  .loginBox h2 span {
    position: absolute;
    left: 0;
    bottom: -1px;
    border-bottom: 2px solid #e94620;
  }

  .loginBox p {
    position: relative;
    margin-bottom: 24px;
  }

  .loginBox p span {
    position: absolute;
    bottom: -20px;
    left: 14px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: red;
  }

  .loginBox p em {
    position: absolute;
    left: 14px;
    top: 0;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    color: #333;
    font-style: normal;
  }

  .inpt {
    display: block;
    width: 236px;
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    padding: 0 14px 0 70px;
  }

  .btns {
    border: none;
    background: #008cd6;
    border-radius: 4px;
    display: block;
    width: 100%;
    height: 50px;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: #fff;
    margin-top: 35px;
    cursor: pointer;
  }
</style>
