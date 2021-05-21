<template>
<div>
  <!-- 在表头这里绑定搜索的数据源 -->
  <el-table
    ref="multipleTable"
    :data="tableData.filter(
            data => !search ||
             data.orderState.toLowerCase().includes(search.toLowerCase()))"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    
    <!-- 选择框 -->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
    <!-- 顶部框 -->
    <el-table-column
      prop="orderType"
      label="订单类型"
      width="100"
      :filters="[{ text: '总统套房', value: '总统套房' }, { text: '双人房', value: '双人房' },{text: '棋牌套房',value: '棋牌套房'},
                {text: '单人房',value: '单人房'},{text: '家庭套房',value: '家庭套房'}]"
      :filter-method="filterTag_orderType"
      filter-placement="bottom-end">
      <!--往表格中渲染数据  -->
      <template slot-scope="scope">
        <el-tag
          :orderType="scope.row.orderType === '单人房' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.orderType}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="orderNum"
      label="订单号"
      show-overflow-tooltip
      width=300
      align="center"
      >
    </el-table-column>

    <el-table-column
      prop="orderState"
      label="订单状态"
      width="100"
      :filters="[{ text: '进行中', value: '进行中' }, { text: '已结束', value: '已结束' }]"
      :filter-method="filterTag_orderState"
      filter-placement="bottom-end">     
      <template slot-scope="scope">
        <el-tag
          :orderType="scope.row.orderState === '空闲' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.orderState}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="userName"
      label="客户姓名"
      show-overflow-tooltip
      align="center">
    </el-table-column>

    <el-table-column
      prop="price"
      label="价格"
      show-overflow-tooltip
      width=300
      align="center">
    </el-table-column>
    
    <!-- 功能区 -->
   <el-table-column
      align="right"
      label="订单管理">

        <!--退房按钮  -->
      <template slot-scope="scope">

        <el-button
          size="mini"          
          @click="handleOff(scope.$index, scope.row)">退房</el-button>

          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改订单</el-button>

        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除订单</el-button>

      </template>




    </el-table-column>  

  </el-table>

    

  <!--修改功能的dialogue  -->
    <template>
      <el-dialog
        title="修改订单"
        :visible.sync="editDialogu"
        width="30%"
        :before-close="handleClose">
      
            <el-form ref="form"  label-width="80px">
            <el-form-item label="订单类型">
              <el-input v-model="orderType" ></el-input>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input v-model="orderNum"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-input v-model="orderState"></el-input>
            </el-form-item>   
            <el-form-item label="价格">
              <el-input v-model="price"></el-input>
            </el-form-item>  
            <el-form-item label="用户">
              <el-input v-model="userName"></el-input>
            </el-form-item>                               
          </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancle()">取 消</el-button>
        <el-button type="primary" @click="handleSure()">修改</el-button>
      </span>
     </el-dialog>
    </template>



</div>
</template>


<script>
  export default {
    data() {
      return {
        //临时的订单信息(其实可以考虑用一个对象存储，待修改)  
          userName: null,
          price: null,
          orderState:null,
          orderNum: null,
          orderType: null, 
          //备用数据（取消时使用）    
          userNameA: null,
          priceA: null,
          orderStateA:null,
          orderNumA: null,
          orderTypeA: null, 
          //订单修改dialogue
          editDialogu:false,

        //分页（没想好怎么做，待做）
        page: 1,      //当前页码,用于翻页
        total: 4,     //总记录数,用于渲染分页
        limit: 3,     //每页记录数
        //第几个订单
        index: null,
        //订单数据
        tableData: [{
          userName: '李四',
          price: '￥3200',
          orderState: '进行中',
          orderNum: '2028147392',
          orderType: '总统套房'
        }, {        
          userName: '周兄',
          price: '￥1200',
          orderState: '进行中',
          orderNum: '20289843734',
          orderType: '双人房'
        },{        
          userName: '周小海',
          price: '￥2100',
          orderState: '进行中',
          orderNum: '20289843734',
          orderType: '单人房'
        },{        
          userName: '周大海',
          price: '￥1232',
          orderState: '已结束',
          orderNum: '20289843734',
          orderType: '双人房'
        },{
          userName: '张三',
          price: '￥1223',
          orderState: '进行中',
          orderNum: '2934833729',
          orderType: '棋牌套房'
        }, ,{        
          userName: '莉丝',
          price: '￥1654',
          orderState: '已结束',
          orderNum: '203439843734',
          orderType: '单人房'
        },{        
          userName: '何晓',
          price: '￥1856',
          orderState: '进行中',
          orderNum: '2098443533734',
          orderType: '单人房'
        },{        
          userName: '何源',
          price: '￥1467',
          orderState: '已结束',
          orderNum: '20278843734',
          orderType: '双人房'
        },{        
          userName: '周小海',
          price: '￥1498',
          orderState: '进行中',
          orderNum: '20289843734',
          orderType: '单人房'
        },{        
          userName: '赵三',
          price: '￥1594',
          orderState: '已结束',
          orderNum: '202898324734',
          orderType: '棋牌套房'
        }, {        
          userName: '王五',
          price: '￥1394',
          orderState: '进行中',
          orderNum: '20282342434',
          orderType: '单人房'
        }, {        
          userName: '周大海',
          price: '￥1959',
          orderState: '已结束',
          orderNum: '20289843734',
          orderType: '双人房'
        }, {
          userName: '王小明',
          price: '￥1665',
          orderState: '已结束',
          orderNum: '20182793829',
          orderType: '家庭套房'
        }],
        multipleSelection: [],      
        search: ''
      }
    },
    created() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          const res3  = this.$http.get('/hotel/room/getAllOrders');

          res3.then(result3 =>{
            if(result3.data.success !== true) {

              return this.$message.error('数据获取失败');
            }else {
              
              this.tableData = result3.data.data.list;
              return this.$message.success('数据正在加载...');

            }
          });
        }, 2000);
      },
    methods: {

      // 多选框
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      
      // 标签筛选功能
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag_price(value, row) {
        return row.price === value;
      },
      filterTag_orderState(value, row) {
        return row.orderState === value;
      },           
      filterTag_orderNum(value, row) {
        return row.orderNum === value;
      },    
      filterTag_orderType(value, row) {
        return row.orderType === value;
      },    
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      
      //退房的确认
      handleOff(index,row) {
        this.$confirm('你正在进行退房操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleOffSure(index,row);
          
          this.$alert('退房成功，订单已结束！', '提示', {
          confirmButtonText: '确定',
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退房'
          });          
        });
      },
      handleOffSure(index, row) {
        row.orderState='已结束'
        console.log(row);
      },
      //
      handleEdit(index, row) {
          this.userName=row.userName,
          this.price=row.price,
          this.orderState=row.orderState,
          this.orderNum=row.orderNum,
          this.orderType=row.orderType, 
          //备用数据（取消时使用）    
          this.userNameA=row.userName,
          this.priceA=row.price,
          this.orderStateA=row.orderState,
          this.orderNumA=row.orderNum,
          this.orderTypeA=row.orderType, 
           
          //传递要修改的数据
          this.index=index;

          this.editDialogu=true; 
          
      },
      //修改的取消按钮
      handleCancle(){
          this.tableData.splice(this.index, 1);
          this.tableData.unshift({
                userName: this.userNameA,
                price: this.priceA,
                orderState: this.orderStateA,
                orderNum: this.orderNumA,
                orderType: this.orderTypeA,             
          });
           this.editDialogu=false; 
      },
      //修改的确认按钮
      handleSure(){
          this.tableData.splice(this.index, 1);
          this.tableData.unshift({
                userName: this.userName,
                price: this.price,
                orderState: this.orderState,
                orderNum: this.orderNum,
                orderType: this.orderType,             
          });
           this.editDialogu=false; 
      },      
      //删除功能  
      handleDelete(index,row) {
        this.$confirm('确定删除该订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDeleteSure(index,row);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleDeleteSure(index, row) {
       this.tableData.splice(index, 1);
          const res2  =this.$http.post('/hotel/h-order/updateOrder',this.tableData);

          res2.then(result2 =>{
            
            if(result2.data.success !== true) {
              this.active--;
              return this.$message.error('更新失败');
            }else {
              this.active++;
              return this.$message.success('更新成功');
            }
          });      
      },

    }
  }
</script>

