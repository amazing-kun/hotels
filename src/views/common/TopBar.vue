<template>
      <div style="margin-left: 8%;">
        <el-container >
          <el-header class="header-content" style="text-align: right; font-size: 12px">
            <a href="www.baidu.com" class="logo-box">
              <img  src="" class="logo-content">
              <span class="logo-content-txt">logo文本</span>
            </a>

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1" @click="$router.push('/home')">首页</el-menu-item>
              <el-submenu index="2">
                <template slot="title">选择房间</template>
                <el-menu-item index="2-1" @click="$router.push('/typeStatistics')">按类型查找</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项1</el-menu-item>
                  <el-menu-item index="2-4-2">选项2</el-menu-item>
                  <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="3" disabled>管理中心</el-menu-item>
              <el-menu-item index="4"><a href="https://github.com/amazing-kun/hotels" target="_blank">GitHub链接</a></el-menu-item>
              <el-menu-item index="5"><LoginDialog ></LoginDialog></el-menu-item>
            </el-menu>
          </el-header>
        </el-container>
      </div>
</template>

<script>
    import LoginDialog from "../dialog/LoginDialog";
    export default {
        name: "TopBar",
      components: {LoginDialog},
      data() {
          return {
            activeIndex: '1',
            activeIndex2: '1'
          };
        },
      methods: {

        login(){
          /**
           *  /async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数
           *  因为async就是异步的意思，异步函数也就意味着该函数的执行不会阻塞后面代码的执行。
           *  参考博客[https://www.cnblogs.com/yuanyingke/p/10280681.html]
           */
          this.$refs.loginFormRef.validate(async (valid)=>{ //valid为返回值，布尔类型
            if (!valid) return;
            const {data:res}  = await this.$http.post('login',this.loginForm);

            if (res.meta.status !== 200) return this.$message.error('登录失败');
            this.$message.success('登录成功');
            /** 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
             * 1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
             * 1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
             */
            window.sessionStorage.setItem("token",res.data.token);
            // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
            this.$router.push('/home');

          })

        }
      },
      data() {
        return {
          dialogTableVisible: false,
          dialogFormVisible: false,

          loginForm:{
            username:'',
            password:'',
          },
          //表单验证规则对象
          loginFormRules:{
            //验证用户名是否合法
            username:[
              { required: true, message: '请输入账号', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            //验证密码是否合法
            password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]
          },

          formLabelWidth: '120px'
        };
      }
    }
</script>

<style lang="less" scoped>

  .logo-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 15px;
    line-height: 16px;
    color: #fff;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .logo-content {
      height: 18px;
      .logo-content-txt {
        min-width: 110px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
      }
    }

  }

  .header-content{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    max-width: 940px;
    padding: 15px 0;
  }

  .el-menu-demo{
    // pidding:0,0,0;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 60px;
    background-color: transparent;
  }
</style>
