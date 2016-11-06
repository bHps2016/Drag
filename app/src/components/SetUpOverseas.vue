<template>
    <div class="item overseas">
	   <h4>国外</h4>
	   <el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit">
		  <el-form-item label="Cloud name">
		    	<el-input :disabled="is_disable" v-model="form.cloud_name"></el-input>
		  </el-form-item>
		  <el-form-item label="API Key">
		    	<el-input :disabled="is_disable" v-model="form.api_key"></el-input>
		  </el-form-item>
		  <el-form-item label="API Secret">
		    	<el-input :disabled="is_disable" v-model="form.api_secret"></el-input>
		  </el-form-item>
		  <el-form-item  class='bt'>
		    	<el-button type="primary" :disabled="is_disable" @click="onSubmit">提交</el-button>
		    	<el-button :disabled="!is_disable" @click="modify">修改</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
    data() {
		return {
			form: {
				cloud_name: '',
				api_key: '',
				api_secret: ''
			},
			is_disable: false
		}
    },
    methods: {
		onSubmit() {
			this.$http.post('http://localhost:3333/setupoverseas/',this.form).then((response) => {
				this.is_disable = true;
			    localStorage.cloud_name=this.form.cloud_name;
			    localStorage.api_key=this.form.api_key;
			    localStorage.api_secret=this.form.api_secret;
			}, (response) => {
			    // error callback 
			});
			console.log('submit!');
		},
		modify(){
			this.is_disable=false;
			localStorage.is_disable=this.is_disable;
		}
    },
	mounted(){
		this.form.cloud_name=localStorage.cloud_name;
		this.form.api_key=localStorage.api_key;
		this.form.api_secret=localStorage.api_secret;
		this.is_disable=!!localStorage.is_disable;
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
.bt {
	margin-left: -100px !important;;
}
</style>
