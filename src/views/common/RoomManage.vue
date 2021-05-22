<template>
<div>
  <!-- 在表头这里绑定搜索的数据源 -->
  <TopBar></TopBar>
  <el-table
    ref="multipleTable"
    :data="tableData.filter(data => !search || data.type.toLowerCase().includes(search.toLowerCase()))"
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

      <template slot="header" >

          <!--添加按钮  -->
        <el-button type="text" @click="dialogVisible=true">添加</el-button>


        <el-input
          v-model="search"
          size="mini"
          placeholder="搜索房间类型"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>


      </template>


    </el-table-column>


  </el-table>

    <!-- 分页,没想到怎么绑定数据 -->
    <!-- 一个想法是，获取后台数据的数量，然后显示？（待完善） -->
    <el-pagination
      layout="sizes,prev, pager, next"
      :current-page="page"
      :total="total"
      :page-size="limit">
    </el-pagination>


     <!--添加功能的dialogue  -->
    <template>
      <el-dialog
        title="添加房间"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

            <el-form ref="form"  label-width="80px">
            <el-form-item label="房间类型">
              <el-input v-model="type" ></el-input>
            </el-form-item>
            <el-form-item label="房间号码">
              <el-input v-model="room"></el-input>
            </el-form-item>
            <el-form-item label="床位">
              <el-input v-model="bedNum"></el-input>
            </el-form-item>
            <el-form-item label="房间状态">
              <el-input v-model="state"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="price"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="introduction"></el-input>
            </el-form-item>
          </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </span>
     </el-dialog>
    </template>



  <!--修改功能的dialogue  -->
    <template>
      <el-dialog
        title="添加房间"
        :visible.sync="editDialogu"
        width="30%"
        :before-close="handleClose">

            <el-form ref="form"  label-width="80px">
            <el-form-item label="房间类型">
              <el-input v-model="type" ></el-input>
            </el-form-item>
            <el-form-item label="房间号码">
              <el-input v-model="room"></el-input>
            </el-form-item>
            <el-form-item label="床位">
              <el-input v-model="bedNum"></el-input>
            </el-form-item>
            <el-form-item label="房间状态">
              <el-input v-model="state"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="price"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="introduction"></el-input>
            </el-form-item>
          </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogu = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">修改</el-button>
      </span>
     </el-dialog>
    </template>



</div>
</template>


<script>
  import TopBar from "./TopBar";
  export default {
    name:"RoomManage",
    components: {TopBar},
    data() {

      return {
        //暂用数据
        introduction: '',
        price: '',
        state: '',
        bedNum: '',
        room: '',
        type: '',

        //添加框的控制
        dialogVisible: false,
        //修改框的控制
        editDialogu: false,

        page: 1,      //当前页码,用于翻页
        total: 4,     //总记录数,用于渲染分页
        limit: 3,     //每页记录数
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
        multipleSelection: [],
        search: ''
      }
    },
      created() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          const res3  = this.$http.get('/hotel/room/getRooms');

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

      // 房间添加
      //思路：首先写一个dialogue，然后在data里面添加对应的数据以及控制dialogue的dialoguevisible，记得进行绑定；
      //然后添加handleadd事件,该事件是将绑定的数据添加到总数据中（使用push），然后关闭dialogue；最后添加一个button，
      //点击事件设为弹出dialogue（设置visible的值即可），并且将dialogue的确认按钮和handleadd事件进行绑定，
      //最后将数据清空，完成。
      handleAdd(){
          this.tableData.push({ type: this.type, room: this.room,introduction: this.introduction,
          price: this.price,state:this.state,bedNum:this.bedNum });
          this.type='',this.room='',this.introduction='',this.price='',this.state='',this.bedNum='';
          this.dialogVisible=false
          this.editDialogu=false
      },
      handleEdit(index, row) {
        //房间修改,现在的做法是先将数据复制，然后删除，最后添加新的记录（只想出这个办法，有思路再改）
        //网上看到有一种方法是让后端重新渲染，不会；
        //忽然有一个想法，增加一个唯一的id，然后修改时将修改后的数据发送到后台，并且重新渲染（待做）

          this.price=row.price,this.type=row.type,this.room=row.room,this.introduction=row.introduction,
          this.state=row.state,this.bedNum=row.bedNum
          this.editDialogu=true;
          this.tableData.splice(index, 1);



        //console.log(row.price)

      },


      //房间删除,主要是使用splice函数
      handleDelete(index, row) {
       this.tableData.splice(index, 1);
          const res2  =this.$http.post('/hotel/h-order/updateRoom',this.tableData);

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

      }

    }
  }
</script>

