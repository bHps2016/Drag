<template>
    <div id='app'>
        <LeftBar></LeftBar>
        <!-- <SetUp></SetUp> -->
        <Manage></Manage>
    </div>
</template>

<script>
    import LeftBar from './components/LeftBar.vue'  
    import SetUp from './components/SetUp.vue'
    import Manage from './components/Manage.vue'

    // With shell.openExternal(url) is how
    // external urls must be handled, not href
    const shell = require('electron').shell

    export default {
        data () {
          return {
            
          };
        },
        components: {
            SetUp,
            Manage,
            LeftBar
        },
        methods: {
          link: (url) => {
            shell.openExternal(url)
          }
        }
    }
</script>

<style>
@import url('../../node_modules/element-ui/lib/theme-default/index.css');
* {
    box-sizing: border-box;
}
html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
}
#app {
    height: 100%;
    color: #2c3e50;
    font-size: 0;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}
.manage,.set_up {
    display: inline-block;
    width: 88%;
    height: 100%;
    overflow: scroll;
    vertical-align: top;
    font-size: 14px;
}
.el-form-item__content {
    line-height: 32px;
}
</style>
