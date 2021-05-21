<template>
<div>
  <!-- 在表头这里绑定搜索的数据源 -->
  <el-table
    ref="multipleTable"
    :data="tableData.filter(data => !search || data.type.toLowerCase().includes(search.toLowerCase()))"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    :default-sort="{prop: 'room',order:'descending'}"
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
      :filters="[{ text: '总统套房', value: '总统套房' }, { text: '双人房', value: '双人房' },{text: '棋牌套房',value: '棋牌套房'},
                {text: '单人房',value: '单人房'},{text: '家庭套房',value: '家庭套房'}]"
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
      show-overflow-tooltip
      align="center"
      width=300>
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
          :type="scope.row.roomState === '1' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.bedNum}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="roomState"
      label="房间状态"
      width="100"
      :filters="[{ text: '空闲', value: '空闲' }, { text: '预定', value: '预定' },{text: '使用',value: '使用'}]"
      :filter-method="filterTag_roomState"
      filter-placement="bottom-end">     
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.roomState === '空闲' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.roomState}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="introduction"
      label="简介"
      show-overflow-tooltip
      align="center">
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
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除 </el-button>
          
          
      </template>


    </el-table-column>  


  </el-table>

    <!-- 分页,没想到怎么绑定数据 -->
    <!-- 一个想法是，获取后台数据的数量，然后显示？（待完善） -->
    <!-- <el-pagination
      layout="sizes,prev, pager, next"
      :current-page="page"
      :total="total"
      :page-size="limit">
    </el-pagination> -->

        
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
              <el-input v-model="roomState"></el-input>
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
        <el-button type="primary" @click="handleAddButton()">确 定</el-button>
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
              <el-input v-model="roomState"></el-input>
            </el-form-item>   
            <el-form-item label="价格">
              <el-input v-model="price"></el-input>
            </el-form-item>  
            <el-form-item label="简介">
              <el-input v-model="introduction"></el-input>
            </el-form-item>                               
          </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancle()">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">修改</el-button>
      </span>
     </el-dialog>
    </template>



</div>
</template>


<script>
  export default {
    data() {

      return {
        //暂用数据
        introduction: '',
        price: '',
        roomState: '',
        bedNum: '',
        room: '',
        type: '',
        //暂用数据2
        introductionA: '',
        priceA: '',
        roomStateA: '',
        bedNumA: '',
        roomA: '',
        typeA: '',        
        //要修改数据的行数
        index: null,
        //添加框的控制
        dialogVisible: false,
        //修改框的控制
        editDialogu: false,  

        page: 1,      //当前页码,用于翻页
        total: 4,     //总记录数,用于渲染分页
        limit: 3,     //每页记录数
        tableData: [
          // {
          //   roomId: 101,
          //   roomStatus: 0,
          //   roomType: {
          //      typeId: 1,
          //      typeName: 'name1',
          //      bedNum: 1,
          //      price: 288,
          //      introduction: '简介'
          //   }

          // },
          {

          name: '王小虎',
          introduction: '直白的简介',
          price: '300',
          roomState: '空闲',
          bedNum: '3',
          room: '340',
          type: '双人房'
        }, {

          name: '王小虎',
          introduction: '文雅的简介',
          price: '500',
          roomState: '预定',
          bedNum: '3',
          room: '330',
          type: '棋牌套房'
        }, {

          name: '王小虎',
          introduction: '复杂的简介',
          price: '300',
          roomState: '使用',
          bedNum: '3',
          room: '320',
          type: '双人房'
        }, {

          name: '晓东',
          introduction: ' 简单的简介',
          price: '300',
          roomState: '使用',
          bedNum: '3',
          room: '320',
          type: '单人房'
        }, {

          name: '王小虎',
          introduction: '想不出词的简介',
          price: '300',
          roomState: '使用',
          bedNum: '3',
          room: '320',
          type: '棋牌套房'
        }, {

          name: '王小虎',
          introduction: '精彩绝伦的简介',
          price: '300',
          roomState: '使用',
          bedNum: '3',
          room: '320',
          type: '双人房'
        }, {

          name: '王小虎',
          introduction: '平淡的简介',
          price: '300',
          roomState: '使用',
          bedNum: '3',
          room: '320',
          type: '双人房'
        }, {

          name: '王小虎',
          introduction: '让人看不懂的简介',
          price: '300',
          roomState: '使用',
          bedNum: '3',
          room: '320',
          type: '双人房'
        }, {

          name: '王小虎',
          introduction: '简介',
          price: '500',
          roomState: '使用',
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
          const res3  = this.$http.get('/hotel/room/getAllRoom');

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
      filterTag_roomState(value, row) {
        return row.roomState === value;
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
      handleAddButton(){
         
          this.tableData.unshift({ type: this.type, room: this.room,introduction: this.introduction,
          price: this.price,roomState:this.roomState,bedNum:this.bedNum });
          this.type='',this.room='',this.introduction='',this.price='',this.roomState='',this.bedNum='';
          this.dialogVisible=false;
          this.editDialogu=false;
          this.tableData.splice(index, 1);
      },


        handleAdd() {
        this.$confirm('确定修改该房间信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleAddSure();
            this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
            this.$message({
            type: 'success',
            message: '修改失败!'
          });
        });
      },
      handleAddSure(){
          this.tableData.splice(this.index, 1);
          this.tableData.unshift({ type: this.type, room: this.room,introduction: this.introduction,
          price: this.price,roomState:this.roomState,bedNum:this.bedNum });
          this.type='',this.room='',this.introduction='',this.price='',this.roomState='',this.bedNum='';
          this.dialogVisible=false;
          this.editDialogu=false;
         
      },
      handleCancle(){
          this.tableData.splice(this.index, 1);
          this.tableData.unshift({ type: this.typeA, room: this.roomA,introduction: this.introductionA,
          price: this.priceA,roomState:this.roomStateA,bedNum:this.bedNumA });
          this.type='',this.room='',this.introduction='',this.price='',this.roomState='',this.bedNum='';
          this.dialogVisible=false
          this.editDialogu=false
          
      },
      handleEdit(index, row) {
        //房间修改,现在的做法是先将数据复制，然后删除，最后添加新的记录（只想出这个办法，有思路再改）
        //网上看到有一种方法是让后端重新渲染，不会；
        //忽然有一个想法，增加一个唯一的id，然后修改时将修改后的数据发送到后台，并且重新渲染（待做）
          this.price=row.price,this.type=row.type,this.room=row.room,this.introduction=row.introduction,
          this.roomState=row.roomState,this.bedNum=row.bedNum;  
          //备用数据（取消时使用）    
          this.priceA=row.price,this.typeA=row.type,this.roomA=row.room,this.introductionA=row.introduction,
          this.roomStateA=row.roomState,this.bedNumA=row.bedNum;
           
          //传递要修改的数据
          this.index=index;

          this.editDialogu=true; 
          // this.tableData.splice(index, 1);
          


        //console.log(row.price)
          
      },


      //房间删除,主要是使用splice函数
      handleDelete(index,row) {
        this.$confirm('确定删除该房间吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDeleteSure(index,row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleDeleteSure(index, row) {
       this.tableData.splice(index, 1);
       //发生错误会影响弹出的提示
          // const res2  =this.$http.post('/hotel/h-order/updateRoom',this.tableData);

          // res2.then(result2 =>{
            
          //   if(result2.data.success !== true) {
          //     this.active--;
          //     return this.$message.error('更新失败');
          //   }else {
          //     this.active++;
          //     return this.$message.success('更新成功');
          //   }
          // });      
      },
      handleClose(){

      }

    }
  }
</script>

