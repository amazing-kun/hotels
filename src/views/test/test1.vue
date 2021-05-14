<!--仅作测试-->
<template>

    <el-button type="danger">危险按钮</el-button>
    
    
</template>



<script>
  export default {
    data() {
      return {
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>