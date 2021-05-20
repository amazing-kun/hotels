<template>
  <div>
    <TopBar></TopBar>
    <div class="myElStep">
      <el-steps :active=active finish-status="success" simple >
        <!--        <el-step title="注册须知" ></el-step>-->
        <el-step title="确认订单" ></el-step>
        <el-step title="订单付款" ></el-step>
        <el-step title="登记入住" ></el-step>
        <el-step title="退房补款" ></el-step>
        <el-step title="确认完成" ></el-step>
      </el-steps>

      <div v-show="active==3">
        <el-collapse
          accordion
          v-for="(collapseItem,collapseIndex) in collapseData"
          :key="collapseItem.orderDetailId"
        >
          <el-collapse-item>
            <template slot="title">房间号：
              <el-tag size="medium">{{collapseItem.roomId}} </el-tag>

              <el-popover trigger="focus" placement="right">
                <p>订单明细号: {{ collapseItem.orderDetailId }}</p>
                <div slot="reference" class="name-wrapper">
                  <i class="header-icon el-icon-info"></i>
                </div>
              </el-popover>
            </template>
            <!--              <div>{{item.customerName}}</div>-->
            <!--              <div>{{item.customerId}}</div>-->
            <!--              <div>{{item.customerPhone}}</div>-->
            <div
              v-for="(item,index) in collapseItem.registerRecord"
              :key="item.customerId">
              <el-form :inline="true" :model="item" class="demo-form-inline" >
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
              </el-form>
            </div>
            <el-button type="danger" style="margin-left: 85%" @click="">退房</el-button>
          </el-collapse-item>

        </el-collapse>
        <div>
          <el-button
            style="margin-top: 200px;margin-left: 80%"
            type="primary" @click="nextPage()">一键退房</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import TopBar from "../common/TopBar";
  export default {
    name: "OrderPage",
    components: {TopBar},
    data() {
      return {
        //步骤条数据
        active: 3,
        //////

        fullscreenLoading: false,

        //对话弹窗数据
        dialogFormVisible: false,
        registerFormVisible:false,
        //////

        //表单区域
        ruleForm: {
          buyerName: '林俊杰',
          buyerPhone: '19927539999',
          userId: '13',
        },
        rules: {
          buyerName: [
            { required: true, message: '请输入买家姓名', trigger: 'blur' },
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: ['blur','change']}
          ],
          buyerPhone: [
            { required: true, message: '请输入买家电话', trigger: 'blur' },
            { min: 7, max: 11, message: '请输入正确的电话号码', trigger: ['blur','change']},
            // { type:"number", message: '长度在 1 到 32 个字符', trigger: ['blur','change']}
          ],
          userId: [
            { required: true, message: '请输入工号', trigger: 'blur' },
            { min: 1, max: 9, message: '请输入正确的工号', trigger: ['blur','change']},
            // { type:"number", message: '长度在 1 到 9 个字符', trigger: ['blur','change']}
          ],
        },

        itemRules:{
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

        ////另外一个表单
        addRecordForm:{
          customerId: '440106190905191234',
          customerName: '杨发涛',
          customerPhone: '19927539999',
          registerTime: new Date(),
        },
        ///////

        //tempName : '林俊杰',
        collapseData:[
          {
            orderDetailId: 51901,
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
                customerId: '440106190905191234',
                customerName: '杨发涛',
                customerPhone: '19927539999',
                registerTime: new Date(),
                checkoutTime: null,
                recordDisEditable: true,
              },
            ],
          },
          {
            orderDetailId: 51902,
            roomId: 102,
            registerRecord:[
              {
                customerId: '440106190905191234',
                customerName: '林俊杰2',
                customerPhone: '19927539999',
                registerTime: new Date(),
                checkoutTime: null,
                recordDisEditable: true,
              },
              {
                customerId: '440106190905191234',
                customerName: '杨发涛2',
                customerPhone: '19927539999',
                registerTime: new Date(),
                checkoutTime: null,
                recordDisEditable: true,
              },
            ],
          }
        ],


        //后端返回的订单号
        orderId:'',
        ///////

        //折叠面板Collapse数据
        activeNames: ['1'],
        /////

        //表格Table
        tableData: [],
        list:[],
        pData:[],
      };
    },
    created() {

      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.tableData = this.$route.params.list;
        console.log(this.tableData[0]);
      }, 2000);
    },
    mounted() {

    },
    methods: {

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

      submitCustomer(collapseIndex,index){
        this.collapseData[collapseIndex].registerRecord[index].recordDisEditable=true;

        const requestData = this.convertVOData2RequestData(this.collapseData[collapseIndex]);
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

        console.log(this.collapseData[collapseIndex].registerRecord[index]);
      },

      modifyCustomer(collapseIndex,index){
        this.collapseData[collapseIndex].registerRecord[index].recordDisEditable=false;
      },

      addMemberRegisterForm(index) {
        this.orderData[index].registerARoomForms.push({
          customerId: '440106190905191234',
          customerName: '林俊杰',
          customerPhone: '19927539999',
          registerTime: new Date(),
          checkoutTime: null,
          key: Date.now()
        });
      },

      nextPage(){
        if (this.active++ > 4) this.active = 0;
      },

      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

      handleChange(index) {
        console.log('第'+index+'列 num='+this.tableData[index].num );
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },



    },
  }
</script>

<style scoped>
  .myElStep{
    width: 90%;
    margin-top: 20px;
    margin-right: 5%;
    align-content: center;
    margin-left: 5%;
  }



</style>
