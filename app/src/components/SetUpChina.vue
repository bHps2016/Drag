<template>
    <div class="item china">
	    <h4>国内</h4>
		<el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit">
			<el-form-item label="七牛资源域名">
				<el-input placeholder="请输入内容">
					<template slot="prepend">Http://</template>
					<el-input v-model="form.name"></el-input>
					<template slot="append">.com</template>
				</el-input>
			</el-form-item>
			<el-form-item label="AccessKey">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="SecretKey">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="BucketName">
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
				src_url: 'oev2d4dz7.bkt.clouddn.com',
				accesskey: 'T2f8MFcG0Wu4HVKpOCu8pAxbqMXO0f6pHnnlmI9y',
				sceretkey: '7AARzZSEZi_f0ctzGIRARfLobRzPcK_OFLvIGTlH',
				bucketname: 'blog'
			}
		}
    },
    methods: {
		onSubmit() {
			this.$http.post('http://localhost:3000/setupchina/',this.form).then((response) => {
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
