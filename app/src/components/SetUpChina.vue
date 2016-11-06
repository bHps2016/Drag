<template>
    <div class="item china">
	    <h4>国内</h4>
		<el-form ref="form" :rules="dynamicRule" :model="form" label-width="100px">
			<el-form-item label="七牛资源域名">
				<el-input :disabled="is_disable" v-model="form.src_url" placeholder="请输入内容">
					<template slot="prepend">Http://</template>
					<template slot="append">.com</template>
				</el-input>
			</el-form-item>
			<el-form-item label="AccessKey">
				<el-input :disabled="is_disable" v-model="form.accesskey"></el-input>
			</el-form-item>
			<el-form-item label="SecretKey">
				<el-input :disabled="is_disable" v-model="form.sceretkey"></el-input>
			</el-form-item>
			<el-form-item label="BucketName">
				<el-input :disabled="is_disable" v-model="form.bucketname"></el-input>
			</el-form-item>
			<el-form-item class='bt'>
				<el-button :disabled="is_disable" @click.native.prevent="onSubmit">提交</el-button>
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
				src_url: '',
				accesskey: '',
				sceretkey: '',
				bucketname: ''
			},
			is_disable: false,
			dynamicRule: {
	          accesskey: [
	            { required: true }
	          ]
	        }
		}
    },
    methods: {
		onSubmit() {
			this.$http.post('http://localhost:3000/setupchina/',this.form).then((response) => {
				this.is_disable=true;
			    localStorage.src_url=this.form.src_url;
			    localStorage.accesskey=this.form.accesskey;
			    localStorage.sceretkey=this.form.sceretkey;
			    localStorage.bucketname=this.form.bucketname;
			    localStorage.is_disable=this.is_disable;
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
		this.form.src_url=localStorage.src_url;
	    this.form.accesskey=localStorage.accesskey;
	    this.form.sceretkey=localStorage.sceretkey;
	    this.form.bucketname=localStorage.bucketname;
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
