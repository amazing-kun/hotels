<template>
  <div>
    <TopBar></TopBar>
    <div class="myTable">
      <el-table
        stripe
        v-loading.fullscreen.lock="fullscreenLoading"
        style="width: 100%;margin-top: 20px"
        max-height="450"
        ref="multipleTable"
        :data="tableData.filter(data => !optionTypeName || data.typeName.toLowerCase().includes(optionTypeName.toLowerCase()))"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column> <!--多选框-->
        <el-table-column
          label="房间类型"
          align="center"
        >
          <template slot="header">

            <el-select v-model="optionTypeName" placeholder="-房间类型" filterable size="mini" style="width: 120px">
              <el-option
                v-for="item in tableData"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName">
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <el-popover trigger="focus" placement="right">
              <p>简介: {{ scope.row.introduction }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.typeName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column
          prop="bedNum"
          label="床位"
          align="center"
          :filters="[{ text: 1, value: 1 }, { text: 2, value: 2 },{ text: 3, value: 3 }, { text: 4, value: 4 }]"
          :filter-method="filterBedNum"
        >
        </el-table-column>
        <el-table-column
        prop="price"
        label="单价"
        align="center"
        show-overflow-tooltip>
      </el-table-column>

        <el-table-column
          label="剩余数量"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope"><el-tag size="medium" :type="scope.row.remainNum > 5 ? 'success' : 'danger'">{{ scope.row.remainNum }}</el-tag></template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 100px; margin-left: 75%">
        <el-button @click="submitOrder()" type="primary" style="margin-right: 20px" :loading= buttonLoading>
          选择房间
        </el-button>
        <el-button @click="toggleSelection()" type="danger">取消选择</el-button>
      </div>
    </div>

  </div>

</template>

<script>
    import TopBar from "../common/TopBar";
    export default {
        name: "TypeStatistics",
        components: {TopBar},
      data() {
        return {
          fullscreenLoading: false,

          search: '',

          optionTypeName: '',

          buttonLoading: false,


          tableData: [
            {
              typeId:1,
              typeName: '标准单人房',
              bedNum: 1,
              price: '288',
              remainNum: 8,
              introduction:'一段漂亮的简介',
            }, {
              typeId:1,
              typeName: '高级双床房',
              bedNum: 2,
              price: '488',
              remainNum: 3,
              introduction:'一段漂亮的简介',
            }, {
              typeId:1,
              typeName: '商务大床房',
              bedNum: 2,
              price: '388',
              remainNum: 0,
              introduction:'一段漂亮的简介',
            },

          ],
          multipleSelection: []
        }
      },

      methods: {
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

        filterBedNum(value, row) {
          return row.bedNum === value;
        },

        submitOrder(){
          this.buttonLoading = true;
          this.fullscreenLoading = true;
          let list = this.multipleSelection;
          setTimeout(() => {
            this.fullscreenLoading = false;
            this.$router.push({
              path: '/orderPage',
              name: 'OrderPage',
              params: {
                list: list,
              }
              /*query: {
                  key: 'key',
                  msgKey: this.msg
              }*/
            })
          }, 2000);
        },

      },
      created() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          const res3  = this.$http.get('/hotel/room/getTypeStatics');
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
    }
</script>

<style scoped>
  .myTable{
    width: 90%;
    margin-top: 20px;
    margin-right: 5%;
    align-content: center;
    margin-left: 5%;
  }
</style>
