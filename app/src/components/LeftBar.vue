<template>
  <div @click="select" class="side_bar">
    <div :class="[selected ? 'select':'']" class="item">配置</div>
    <div :class="[selected ? '':'select']" class="item">管理</div>
  </div>
</template>
<style scoped>
.side_bar {
  display: inline-block;
  width: 12%;
  height: 100%;
  background: rgb(36,40,48);
  color: rgb(119,122,136);
  vertical-align: top;
}
.item {
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid rgb(55,59,65);
}
.select {
  background: rgb(26,138,255);
  color: rgb(255,255,255);
}
</style>
<script>
  export default {
    data () {
      return {
        radio: '',
        selected: true
      };
    },
    methods:{
      select(e){
        this.selected=!this.selected;
        this.$parent.$data.ship=this.selected;
        console.log(this.$parent.$data.ship)
      }
    }
  }
</script>