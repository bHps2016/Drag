<template>
<div class="block">
  <span class="demonstration">hover 显示颜色</span>
  <span class="wrapper">
    <el-button :plain="true" type="success">成功按钮</el-button>
    <el-button :plain="true" type="warning">警告按钮</el-button>
    <el-button :plain="true" type="danger">危险按钮</el-button>
    <el-button :plain="true" type="info">信息按钮</el-button>
  </span>
</div>
</template>

<script>
  export default {
    data () {
      return {
        radio: ''
      };
    }
  }
</script>