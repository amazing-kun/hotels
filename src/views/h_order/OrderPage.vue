<template>
  <div>
    <TopBar></TopBar>
    <div class="myElStep">
    <el-steps :active=active finish-status="success" simple >
      <!--        <el-step title="注册须知" ></el-step>-->
      <el-step title="查看房间" ></el-step>
      <el-step title="提交订单" ></el-step>
      <el-step title="订单付款" ></el-step>
      <el-step title="退房补款" ></el-step>
      <el-step title="确认完成" ></el-step>
    </el-steps>

    <div >
      <el-table
        :data="tableData"
        style="width: 100%;margin-top: 20px"
        max-height="450">
        <el-table-column
          prop="roomId"
          align="center"
          label="房间号"
          >
        </el-table-column>
        <el-table-column
          label="房间类型"
          align="center"
          >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
<!--              <p>房间类型: {{ scope.row.typeName }}</p>-->
              <p>房间床位数: {{ scope.row.bedNum }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.typeName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          prop="subAmount"
          label="小计"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="advance"
          label="预付费"
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          >
          <template slot-scope="scope">
            <el-input-number  v-model="tableData[scope.$index].num" @change="handleChange(scope.$index)"  :step="1" size="small" :min="1" :max="10" label="描述文字" placeholder="1" style="width: 50%"></el-input-number>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 300px;margin-left: 80%;">
      <el-button type="danger">提交订单</el-button>
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
          num:'1',

          //表格Table
           tableData: [

            {roomId: '103',
              typeName: '标准套间',
            num:'',
              bedNum: '单人床',
              subAmount: 200,
              advance: 200,
          }, {
               roomId: '103',
               typeName: '标准双人套间',
            num:'',
               bedNum: '双人床',
               subAmount: 200,
               advance: 200,
          }, {
               roomId: '103',
               typeName: '标准双人套间',
            num:'',
               bedNum: '双人床',
               subAmount: 200333,
               advance: 200,
          }, {
               roomId: '103',
               typeName: '大床房Plus',
            num:'',
               bedNum: '大床房',
               subAmount: 200333,
               advance: 200,
          }, {
               roomId: '103',
               typeName: '标准套间',
            num:'',
               bedNum: '双人床',
               subAmount: 200333,
               advance: 200,
          }, {
               roomId: '103',
               typeName: '标准套间',
            num:'',
               bedNum: '双人床',
               subAmount: 200333,
               advance: 200,
          }, {
               roomId: '103',
               typeName: '标准套间',
            num:'',
               bedNum: '双人床',
               subAmount: 200333,
               advance: 200,
          }
          ],
        };
      },

      methods: {
        next() {
          if (this.active++ > 2) this.active = 0;
        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },
        handleChange(index) {
          console.log('第'+index+'列 num='+this.tableData[index].num );
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
