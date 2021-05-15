<template>
    <div>
          <!-- <TopBar></TopBar> -->
          <!-- <RoomManage></RoomManage> -->
          <manage></manage>
          <RoomManage></RoomManage>
          
    </div>

</template>

<script>

    
    //  import TopBar from "./common/TopBar";
    
    
    //本来应该使用RoomManage，但发现无法引入，或者是哪里要注册的地方我没发现？
    import RoomManage from "./common/RoomManage";
    //备用引入manage
    import manage from "./manage/manage"
    
    
    import LoginDialog from "./dialog/LoginDialog";

    export default {
        name: "Home",
      components: {LoginDialog,RoomManage,manage},

    }
</script>

<style lang="less" scoped>

</style>
