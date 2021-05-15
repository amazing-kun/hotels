<template>
    <div>
          <TopBar></TopBar>

          <Room></Room>
          
     
    </div>

</template>

<script>

    
     import TopBar from "./common/TopBar";
    
    
    //本来应该使用RoomManage，但发现无法引入，或者是哪里要注册的地方我没发现？(可能是个人电脑问题)
    // import RoomManage from "./common/RoomManage";
    //备用引入manage
    // import manage from "./manage/manage"
    
  
    import LoginDialog from "./dialog/LoginDialog";
    import Room from './common/RoomManage';

    export default {
        name: "Home",
      components: {LoginDialog,Room,TopBar},

    }
           
</script>

<style lang="less" scoped>

</style>
