<template>
    <div id='app'>
        <Side></Side>
        <Board :ship="ship"></Board>
    </div>
</template>

<script>
    import Side from './components/Side.vue'
    import Board from './components/Board.vue'

    // With shell.openExternal(url) is how
    // external urls must be handled, not href
    const shell = require('electron').shell

    export default {
        data () {
          return {
            ship: true
          };
        },
        components: {
            Side,
            Board
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
    .el-tooltip__popper.is-light {
        padding: 2px;
    }
</style>
