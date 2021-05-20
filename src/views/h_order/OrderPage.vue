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

      <div v-show="active==0">

        <el-table
          stripe
          v-loading.fullscreen.lock="fullscreenLoading"
          :data="tableData"
          style="width: 100%;margin-top: 20px"
          max-height="450">
  <!--        <el-table-column-->
  <!--          prop="roomId"-->
  <!--          align="center"-->
  <!--          label="房间号"-->
  <!--          >-->
  <!--        </el-table-column>-->
          <el-table-column
            label="房间类型"
            align="center"
            >
            <template slot-scope="scope">
              <el-popover trigger="focus" placement="right">
                <p>简介: {{ scope.row.introduction }}</p>
                <p>床位: {{ scope.row.bedNum }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.typeName}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            prop="subAmount"
            label="小计"
            align="center">
            <template slot-scope="scope">
              <el-tag size="medium" :type="scope.row.num * scope.row.price > 1000 ? 'danger' : 'success'">{{ scope.row.num * scope.row.price }}</el-tag>
            </template>

          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
          >
            <template slot-scope="scope">
              <el-input-number
              v-model="tableData[scope.$index].num"
              @change="handleChange(scope.$index)"
              :step="1"
              size="small"
              :min="1"
              :max=tableData[scope.$index].remainNum
              placeholder= "1"
              style="width: 50%">
              </el-input-number>
            </template>

          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            >
            <template slot-scope="scope">

              <el-button size="mini" type="danger"  @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="增加记录" :visible.sync="dialogFormVisible" style="width: 70%;margin-left: 15%;">
          <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%;">
            <el-form-item prop="buyerName" label="买家姓名">
              <el-input v-model="ruleForm.buyerName" placeholder="请输入买家姓名"></el-input>
            </el-form-item>
            <el-form-item prop="buyerPhone" label="买家电话">
            <el-input v-model="ruleForm.buyerPhone" placeholder="请输入买家电话"></el-input>
          </el-form-item>
            <el-form-item prop="userId" label="处理人ID">
              <el-input v-model="ruleForm.userId" placeholder="请输入处理人工号"></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 10%;margin-right: 20%">
              <el-button type="primary" @click="submitO">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <div >
          <el-button style="margin-top: 200px;margin-left: 90%" type="danger" @click="dialogFormVisible = true">提交订单</el-button>
        </div>
      </div>

      <div v-show="active==1">
        <img src="../../assets/微信收款.png" height="600" width="400"/>
        <img src="../../assets/支付宝收款.jpg" height="600" width="400"/>
        <div>
          <el-button type="success" @click="nextStep()">已支付</el-button>
        </div>
      </div>

      <div v-show="active==2">
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

              <el-form-item>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyCustomer(collapseIndex,index)" circle></el-button>
                <el-button type="success" icon="el-icon-check" size="mini" @click="submitCustomer(collapseIndex,index)" circle></el-button>
              </el-form-item>
            </el-form>
              <div>
                <el-dialog :visible.sync="registerFormVisible" width="380px" center="false">
                  <div class="el-dialog_header" >
                    <span class="el-dialog_title">入住登记</span>
                  </div>
                  <div>
                    <!--登记表单区-->
                    <el-form ref="addRecordFormRef" :model="addRecordForm" :rules="itemRules" >
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
                    <el-button type="primary" @click="registerOneRecord(collapseIndex)">登记</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
            <el-button size="mini" icon="el-icon-plus" style="margin-left: 30px" circle @click="addRecord()"></el-button>
          </el-collapse-item>

        </el-collapse>
        <div>
          <el-button
            style="margin-top: 200px;margin-left: 80%"
            type="warning" @click="nextPage()">退房</el-button>
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
          active: 0,
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
        console.log(this.page)
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
        registerOneRecord(collapseIndex){
          this.fullscreenLoading = true;
          this.registerFormVisible=false;
          this.addRecordForm.detailId = this.collapseData[collapseIndex].detailId;
          setTimeout(() => {
            const res3  = this.$http.post('/hotel/register-record/registerIn',this.addRecordForm);
            res3.then(result3 =>{
              if(result3.data.success !== true) {
                return this.$message.error('登记失败');
              }else {
                this.collapseData[collapseIndex] = result3.data.data;
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

        nextStep(){
          if (this.active++ > 4) this.active = 0;
          setTimeout(() => {
            this.fullscreenLoading = false;

            const res1 = this.$http.post('/hotel/h-order/isPaid',{orderId: this.orderId, payStatus: 1});
            res1.then(result1 =>{
              if(result1.data.success !== true) {
                this.active--;
                return this.$message.error('订单支付失败');
              }else {
                this.active++;
                return this.$message.success('订单支付成功');
              }
            });


          }, 2000);
        },

        submitO() {
          if (this.active++ > 4) this.active = 0;
          console.log(this.tableData);
          this.tableData.forEach((item,index)=>{
            this.list.push({
              num: item.num,
              typeId: item.typeId
            })
          });
          console.log(this.list);

          this.pData.push({
            buyerName:this.ruleForm.buyerName,
            buyerPhone:this.ruleForm.buyerPhone,
            userId:this.ruleForm.userId,
            list: this.list
          });


          const res2  =this.$http.post('/hotel/h-order/addOrder',this.pData[0]);

          res2.then(result2 =>{
            
            if(result2.data.success !== true) {
              this.active--;
              return this.$message.error('提交订单失败');
            }else {
              this.active++;
              this.orderId = result2.data.data.orderId;
              return this.$message.success('提交订单成功');
            }
          });
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

        //折叠面板Collapse处理方法
        handleChange(val) {
          console.log(val);
        }
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
