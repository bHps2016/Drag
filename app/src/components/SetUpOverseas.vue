<template>
    <div class="item overseas">
	   <h4>国外</h4>
	   <el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit">
		  <el-form-item label="七牛资源域名">
		    	<el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item>
		    	<el-button @click="onSubmit">提交</el-button>
		    	<el-button @click="modify">修改</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
    data() {
		return {
			form: {
				name: 'hsx'
			}
		}
    },
    methods: {
		onSubmit() {
			this.$http.post('http://localhost:3000/setupoverseas/',this.form).then((response) => {
			    console.log(response.body)
			    console.log('holle')
			}, (response) => {
			    // error callback 
			});
			console.log('submit!');
		},
		modify(){
			console.log('modify!');
		}
    }
  }
</script>

<style scoped>
h4 {
	margin: 10px auto;
	color: grey;
	font-weight: normal;
	font-size: 16px;
}
</style>
