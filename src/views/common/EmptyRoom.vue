<template>
<div>
  <!-- 在表头这里绑定搜索的数据源 -->
  <TopBar></TopBar>
  <el-table
    ref="multipleTable"
    :data="tableData.filter((
            data => !search ||
             data.state.toLowerCase().includes(search.toLowerCase()))

             )"
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
      prop="type"
      label="房间类型"
      width="100"
      :filters="[{ text: '单人房', value: '单人房' }, { text: '双人房', value: '双人房' },{text: '棋牌套房',value: '棋牌套房'}]"
      :filter-method="filterTag_type"
      filter-placement="bottom-end">
      <!--往表格中渲染数据  -->
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.type === '单人房' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.type}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="room"
      label="房间号"
      width="100"
      :filters="[{ text: '1', value: '1' }, { text: '2', value: '2' },{text: '310',value: '310'}]"
      :filter-method="filterTag_room"
      filter-placement="bottom-end">
      <!--往表格中渲染数据  -->
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.room === '1' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.room}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="bedNum"
      label="床位"
      width="100"
      :filters="[{ text: '1', value: '1' }, { text: '2', value: '2' },{text: '3',value: '3'}]"
      :filter-method="filterTag_bedNum"
      filter-placement="bottom-end">
      <!--往表格中渲染数据  -->
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state === '1' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.bedNum}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="state"
      label="房间状态"
      width="100"
      :filters="[{ text: '空闲', value: '空闲' }, { text: '预定', value: '预定' },{text: '使用',value: '使用'}]"
      :filter-method="filterTag_state"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state === '空闲' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="introduction"
      label="简介"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="price"
      label="价格"
      width="100"
      :filters="[{ text: '300', value: '300' }, { text: '500', value: '500' }]"
      :filter-method="filterTag_price"
      filter-placement="bottom-end">
      <!-- 填充数据 -->
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.price === '500' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.price}}</el-tag>
      </template>
    </el-table-column>

    <!-- 功能区 -->
   <el-table-column
      align="right">

        <!--入住按钮  -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleRegister(scope.$index, scope.row)">入住</el-button>
      </template>
    </el-table-column>




  </el-table>

    <!-- 分页,没想到怎么绑定数据
    <el-pagination
      layout="sizes,prev, pager, next"
      :current-page="page"
      :total="total"
      :page-size="limit">
    </el-pagination> -->

    <!-- 订单dialogue -->
    <template>
      <el-dialog
        title="入住登记"
        :visible.sync="registerVIsible"
        width="30%"
        :before-close="handleClose">

            <el-form ref="form"  label-width="80px">
            <el-form-item label="客人姓名">
              <el-input v-model="name" ></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
              <el-input v-model="id"></el-input>
            </el-form-item>
            <el-form-item label="房间号码">
              <el-input v-model="roomNum"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="tel"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="notes"></el-input>
            </el-form-item>
          </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="registerVIsible = false">取 消</el-button>
        <el-button type="primary" @click="addOrder()">确 定</el-button>
      </span>
     </el-dialog>
    </template>


</div>
</template>


<script>
  import Room from "./RoomManage";
  import TopBar from "./TopBar";

  export default {
    components: {Room,TopBar},
    data() {
      return {
        //临时的订单信息(其实可以考虑用一个对象存储，待修改)
        name: '',       //姓名
        id: '',         //身份证
        roomNum: '',    //房号
        tel: '',        //号码
        notes: '',      //备注
        registerVIsible: false,     //控制订单信息的dialogue
        //分页（没想好怎么做，待做）
        page: 1,      //当前页码,用于翻页
        total: 4,     //总记录数,用于渲染分页
        limit: 3,     //每页记录数

        //客房数据
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          introduction: '上海市普陀区金沙江路 1518 弄',
          price: '300',
          state: '空闲',
          bedNum: '3',
          room: '310',
          type: '套房'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          introduction: '上海市普陀区金沙江路 1517 弄',
          price: '500',
          state: '空闲',
          bedNum: '3',
          room: '310',
          type: '棋牌套房'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          introduction: '上海市普陀区金沙江路 1519 弄',
          price: '300',
          state: '使用',
          bedNum: '3',
          room: '310',
          type: '棋牌套房'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          introduction: '上海市普陀区金沙江路 1516 弄',
          price: '500',
          state: '预定',
          bedNum: '3',
          room: '310',
          type: '棋牌套房'
        }],
        //订单数据
        order: [{
            name: 'a',    //用户姓名
            id: '1',      //身份证
            roomNum: '11',  //房号
            tel: '111',     //电话号码
            notes: '1111',  //备注
           },{
            name: 'b',
            id: '2',
            roomNum: '22',
            tel: '222',
            notes: '2222',
           }
        ],
        multipleSelection: [],
        //默认搜索状态为空闲的客房
        search: ''
      }
    },
    //初始化页面时候加载数据
      created() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          const res3  = this.$http.get('/hotel/room/getEmptyRoom');
          
          res3.then(result3 =>{
            if(result3.data.success !== true) {
              return this.$message.error('数据获取失败');
            }else {
              //这个list后台发送过来的
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
      filterTag_state(value, row) {
        return row.state === value;
      },
      filterTag_bedNum(value, row) {
        return row.bedNum === value;
      },
      filterTag_room(value, row) {
        return row.room === value;
      },
      filterTag_type(value, row) {
        return row.type === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      //入住处理
      handleRegister(index, row) {
        //弹出弹框
        this.registerVIsible=true;
        //更新房间状态
        row.state='使用'
        console.log(row.state);
      },
      addOrder(){
        //添加订单
        this.order.push({
            name: this.name,
            id: this.id,
            roomNum: this.roomNum,
            tel: this.tel,
            notes: this.notes,
        });
        //数据归零
            this.name='',
            this.id='',
            this.roomNum='',
            this.tel='',
            this.notes='',

        //关闭弹窗
        this.registerVIsible=false
        //在控制台查看订单是否添加成功
        console.log(this.order);
        //将更改的数据发送出去

          const res2  =this.$http.post('/hotel/h-order/addorders',this.order);

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
      handleClose(){
        //可以在这里增加确认关闭的功能（待做）
      },
      // 数据处理
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }

    }
  }
</script>

