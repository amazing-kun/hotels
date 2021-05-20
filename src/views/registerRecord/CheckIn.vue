<template>
  <div>
    <TopBar></TopBar>
    <div>
      <el-collapse
        accordion
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        <el-collapse-item>
          <template slot="title">房间号：
            <el-tag size="medium">{{collapseData.roomId}} </el-tag>

            <el-popover trigger="focus" placement="right">
              <p>订单明细号: {{ collapseData.detailId }}</p>
              <div slot="reference" class="name-wrapper">
                <i class="header-icon el-icon-info"></i>
              </div>
            </el-popover>
          </template>
          <!--              <div>{{item.customerName}}</div>-->
          <!--              <div>{{item.customerId}}</div>-->
          <!--              <div>{{item.customerPhone}}</div>-->
          <div>
            <el-form :inline="true"
                     v-for="(item,index) in collapseData.registerRecord"
                     :key="item.customerId"
                     class="demo-form-inline" >
              <el-form-item label="姓名">
                <el-input style="width: 80px" v-model="item.customerName" placeholder="姓名" :disabled="item.recordDisEditable"></el-input>
              </el-form-item>
              <el-form-item label="身份证">
                <el-input style="width: 175px" v-model="item.customerId" placeholder="身份证" :disabled="item.recordDisEditable"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input style="width: 110px" v-model="item.customerPhone" placeholder="手机号码" :disabled="item.recordDisEditable"></el-input>
              </el-form-item>

              <el-form-item>
                <div class="block">
                  <el-date-picker
                    style="width: 200px"
                    v-model="item.registerTime"
                    type="datetime"
                    placeholder="选择入住时间"
                    :disabled="item.recordDisEditable">
                  </el-date-picker>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="block">
                  <el-date-picker
                    style="width: 200px"
                    v-model="item.checkoutTime"
                    type="datetime"
                    placeholder="选择退房时间"
                    :disabled="item.recordDisEditable">
                  </el-date-picker>
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyCustomer(index)" circle></el-button>
                <el-button type="success" icon="el-icon-check" size="mini" @click="submitCustomer(index)" circle></el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-dialog :visible.sync="registerFormVisible" width="380px" center="false">
                <div class="el-dialog_header" >
                  <span class="el-dialog_title">入住登记</span>
                </div>

                <div>

                  <!--登记表单区-->
                  <el-form ref="addRecordFormRef" :model="addRecordForm" :rules="rules" >
                    <el-form-item  prop="customerName">
                      <el-input v-model="addRecordForm.customerName" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>

                    <el-form-item prop="customerId">
                      <el-input v-model="addRecordForm.customerId" prefix-icon="el-icon-key" ></el-input>
                    </el-form-item>

                    <el-form-item prop="customerId">
                      <el-input v-model="addRecordForm.customerPhone" prefix-icon="el-icon-phone"></el-input>
                    </el-form-item>

                    <el-form-item prop="registerTime">
                      <div class="block">
                        <el-date-picker
                          v-model="addRecordForm.registerTime"
                          type="datetime"
                          placeholder="选择入住时间">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-form>

                </div>
                <div class="btns-wrap">
                  <el-button type="primary" @click="registerOneRecord()">登记</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <el-button size="mini" icon="el-icon-plus" style="margin-left: 30px" circle @click="addRecord()"></el-button>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>

</template>

<script>
  import TopBar from "../common/TopBar";
  export default {
    name: "CheckIn",
    components: {TopBar},
    data() {
      return {
        //步骤条数据
        active: 0,
        //////

        fullscreenLoading: false,

        registerFormVisible:false,

        ////另外一个表单
        addRecordForm:{
          customerId: '440106190905191213',
          customerName: '曾锟浩',
          customerPhone: '19927539999',
          registerTime: new Date(),
        },

        rules: {
          customerId: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            {min: 18, max: 18, message: '请输入正确的身份证号码', trigger: ['blur','change']}
          ],
          customerPhone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 7, max: 11, message: '请输入正确的电话号码', trigger: ['blur','change']},
            // { type:"number", message: '长度在 1 到 32 个字符', trigger: ['blur','change']}
          ],
          customerName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 9, message: '请输入正确的姓名', trigger: ['blur','change']},
          ],
        },

        //tempName : '林俊杰',
        collapseData:
          {
            detailId: 51901,
            roomId: 101,
            registerRecord:[
              {
                customerId: '440106190905191234',
                customerName: '林俊杰',
                customerPhone: '19927539999',
                registerTime: new Date(),
                checkoutTime: null,
                recordDisEditable: true,
              },
              {
                customerId: '440106190905191267',
                customerName: '杨发涛',
                customerPhone: '19927539999',
                registerTime: new Date(),
                checkoutTime: null,
                recordDisEditable: true,
              },
            ],
          },


        //requestForm
        requestData:{
          detailId: null,
          registerRecord:[]
        },

        //后端返回的订单号
        orderId:'',

        //折叠面板Collapse数据
        activeNames: ['1'],
      }
    },

    methods: {

      registerOneRecord(){
        this.fullscreenLoading = true;
        this.registerFormVisible=false;
        this.addRecordForm.detailId = this.collapseData.detailId;
        setTimeout(() => {
          const res3  = this.$http.post('/hotel/register-record/registerIn',this.addRecordForm);
          res3.then(result3 =>{
            if(result3.data.success !== true) {
              return this.$message.error('登记失败');
            }else {
              this.collapseData = result3.data.data;
              return this.$message.success('登记成功,数据重新加载...');
            }
          });
          this.fullscreenLoading = false;
        }, 800);
      },



      addRecord(){
        this.registerFormVisible=true;
      },

      //Adapter
      convertVOData2RequestData(paramsData){
        let requestData={
          detailId: null,
          registerRecord:[]};
        requestData.detailId = paramsData.detailId;
        paramsData.registerRecord.forEach((item,index)=>{
          requestData.registerRecord.push({
            customerId: item.customerId,
            customerName: item.customerName,
            customerPhone: item.customerPhone,
            registerTime: item.registerTime,
            checkoutTime: item.checkoutTime
          });
        });
        return requestData;
      },

      submitCustomer(index){
        this.collapseData.registerRecord[index].recordDisEditable=true;
        const requestData = this.convertVOData2RequestData(this.collapseData);
        this.fullscreenLoading = true;
        setTimeout(() => {
          const res3  = this.$http.post('/hotel/register-record/modifyRegisterRecord',requestData);
          res3.then(result3 =>{
            if(result3.data.success !== true) {
              return this.$message.error('修改记录失败');
            }else {
              this.collapseData = result3.data.data;
              return this.$message.success('修改成功,数据重新加载...');
            }
          });
          this.fullscreenLoading = false;
        }, 800);
        console.log(this.collapseData.registerRecord[index]);
      },

      modifyCustomer(index){
        this.collapseData.registerRecord[index].recordDisEditable=false;
      },

    },

    created() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        const detailId  = this.$route.params.detailId;
        const res3  = this.$http.get('/hotel/register-record/checkIn',{params:{detailId:detailId}});
        res3.then(result3 =>{
          if(result3.data.success !== true) {
            return this.$message.error('数据获取失败');
          }else {
            this.collapseData = result3.data.data;
            return this.$message.success('数据正在加载...');
          }
        });
        this.registerFormVisible=false;
        this.fullscreenLoading = false;
      }, 800);
    }

  }
</script>

<style scoped>

</style>
