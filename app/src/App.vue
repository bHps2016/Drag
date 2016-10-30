<template>
    <div id='app'>
        <Hello></Hello>
        <NavBar></NavBar>
    </div>
</template>

<script>

    import Hello from './components/Hello.vue'
    import NavBar from './components/NavBar.vue'

    // With shell.openExternal(url) is how
    // external urls must be handled, not href
    const shell = require('electron').shell

    export default {
        components: {
            Hello,
            NavBar
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

    html {
        height: 100%;
    }
    body {
        height: 100%;
        margin: 0;
    }
    #app {
        color: #2c3e50;
        font-family: Source Sans Pro, Helvetica, sans-serif;
        text-align: center;
    }
</style>
