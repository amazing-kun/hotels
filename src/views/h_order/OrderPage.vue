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
                <el-tag size="medium">{{ scope.row.typeName }}</el-tag>
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

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" style="width: 70%;margin-left: 15%;">
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
          active: 0,
          fullscreenLoading: false,
          dialogFormVisible: false,

          //表单区域
          //表单区域
          ruleForm: {
            buyerName: '',
            buyerPhone: '',
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

          ///////

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
          // const res3  = this.$http.get('/hotel/room/getAllRoom');
          // res3.then(result3 =>{
          //   if(result3.data.success !== true) {
          //     this.active=0;
          //     return this.$message.error('数据获取失败');
          //   }else {
          //     this.active =0;
          //     this.tableData = result3.data.data.list;
          //     return this.$message.success('数据正在加载...');
          //   }
          // });
          this.tableData = this.$route.params.list;
          console.log(this.tableData[0]);
        }, 2000);
      },
      mounted() {

      },
      methods: {
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
