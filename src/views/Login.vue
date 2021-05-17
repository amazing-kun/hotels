<template>
    <div class="login_container">
        <div style="color: #dddddd">该页面已被拦截</div>
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!--登录表单区-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
                <el-form-item  prop="email">
                  <el-input v-model="loginForm.email" prefix-icon="el-icon-message"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                //这是登录表单的数据绑定对象
                loginForm:{
                    email:'',
                    password:'',
                },
                //表单验证规则对象
                loginFormRules:{
                    //验证email是否合法
                    email: [
                      {required: true, message: '请输入账号', trigger: 'blur'},
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                    ],
                    //验证密码是否合法
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            //点击清空按钮，重置登陆表单
            resetLoginForm(){
                this.$refs.loginFormRef.resetFields();
            },
            login(){
                /**
                 *  /async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数
                 *  因为async就是异步的意思，异步函数也就意味着该函数的执行不会阻塞后面代码的执行。
                 *  参考博客[https://www.cnblogs.com/yuanyingke/p/10280681.html]
                 */
                this.$refs.loginFormRef.validate(async (valid)=>{ //valid为返回值，布尔类型
                    if (!valid) return;
                    const {data:res}  = await this.$http.post('/hotel/user/login',this.loginForm);
                    console.log(res);
                    if (res.success !== true) return this.$message.error('登录失败, '+res.message);
                    this.$message.success('登录成功');
                    /** 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
                     * 1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
                     * 1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                    */
                    window.sessionStorage.setItem("token",res.data.token);
                    // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
                    this.$router.push('/home');
                })
            },

            register(){
              this.$router.push({
                path: '/register',
              })
            }
          }
    }
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
        height: 100px;
        width: 100px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 5px;
        box-shadow: 0 0 5px #dddddd;
        background-color: #ffffff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #ffffff;
        }
        position: absolute;
        left: 50%;
        transform: translate(-50%,-35%);
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    /*transform: translate(-50%,-35%);*/
}
</style>
