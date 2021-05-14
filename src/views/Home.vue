<template>
    <div>
          <TopBar></TopBar>
    </div>

</template>

<script>

    import TopBar from "./common/TopBar";
    import LoginDialog from "./dialog/LoginDialog";
    export default {
        name: "Home",
      components: {LoginDialog, TopBar},

    }
</script>

<style lang="less" scoped>

</style>
