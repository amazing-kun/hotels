<template>
<div>
  <!-- 在表头这里绑定搜索的数据源 -->
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
        <el-input
          v-model="search"
          size="mini"
          placeholder="搜索房间类型"/>
      </template>
      <!-- <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template> -->
    </el-table-column>  



  </el-table>

    <!-- 分页,没想到怎么绑定数据 -->
    <el-pagination
      layout="sizes,prev, pager, next"
      :current-page="page"
      :total="total"
      :page-size="limit">
    </el-pagination>
  

</div>
</template>


<script>
  export default {
    
    data() {
      return {
        
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

