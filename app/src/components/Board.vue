<template>
    <div class='board'>
        <img :class="[ship ? 'select':'']" class="logo" src="../assets/qiniu_logo.png">
        <img :class="[ship ? '':'select']" class="logo" src="../assets/cloudinary.png">
        <div v-show='ship' class="china">
	        <el-upload
	        	class="drag_area"
				action="http://localhost:3333/uploadchina/"
				type="drag"
				:multiple="false"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:on-success="handleSuccess"
				:on-error="handleError"
			>
			  	<i class="el-icon-upload"></i>
			  	<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
			  	<div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
			</el-upload>
		</div>
		<div v-show='!ship' class="overseas">
	        <el-upload
	        	id="drag_area"
	        	class="drag_area"
				action="http://localhost:3333/uploadoverseas/"
				type="drag"
				:multiple="false"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:on-success="handleSuccess"
				:on-error="handleError"
			>
			  	<i class="el-icon-upload"></i>
			  	<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></em></div>
			  	<div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
			</el-upload>
		</div>
        <div v-show='src&&ship'>
	        <img class="preview" :src="src">
	        <div class="link_area">
	        	<div class="area_head">图片信息</div>
	        	<div class="info">
	    			<div class="name">Size:{{ size }}KB</div>
	    			<div class="name">Name:{{ name }}</div>
	    		</div>
	        	<div @click="copy(1,$event)" class="link">
	        		<a :href="src">
	        			<span class="link_cont">{{ src }}</span>
	        		</a>
	        		<el-tooltip  effect="light" placement="top">
					  	<div slot="content">Copy</div>
					  	<el-button>
					  		<i class="el-icon-document"></i>
					  	</el-button>
					</el-tooltip>
	        	</div>
	        	<div @click="copy(2,$event)" class="link">
	        		<span class="link_cont">{{ code }}</span>
	        		<el-tooltip  effect="light" placement="top">
					  	<div slot="content">Copy</div>
					  	<el-button>
					  		<i class="el-icon-document"></i>
					  	</el-button>
					</el-tooltip>
	        	</div>
	        	<div @click="copy(3,$event)" class="link">
	        		<span class="link_cont">![]({{ src }})</span>
	        		<el-tooltip  effect="light" placement="top">
					  	<div slot="content">Copy</div>
					  	<el-button>
					  		<i class="el-icon-document"></i>
					  	</el-button>
					</el-tooltip>
	        	</div>
	        </div>
        </div>
        <div v-show='ov_src&&!ship'>
	        <img class="preview" :src="ov_src">
	        <div class="link_area">
	        	<div class="area_head">图片信息</div>
	        	<div class="info">
	    			<div class="name">Size:{{ ov_size }}KB</div>
	    			<div class="name">Name:{{ ov_name }}</div>
	    		</div>
	        	<div @click="copy(1,$event)" class="link">
	        		<a :href="ov_src">
	        			<span class="link_cont">{{ ov_src }}</span>
	        		</a>
	        		<el-tooltip  effect="light" placement="top">
					  	<div slot="content">Copy</div>
					  	<el-button>
					  		<i class="el-icon-document"></i>
					  	</el-button>
					</el-tooltip>
	        	</div>
	        	<div @click="copy(2,$event)" class="link">
	        		<span class="link_cont">{{ ov_code }}</span>
	        		<el-tooltip  effect="light" placement="top">
					  	<div slot="content">Copy</div>
					  	<el-button>
					  		<i class="el-icon-document"></i>
					  	</el-button>
					</el-tooltip>
	        	</div>
	        	<div @click="copy(3,$event)" class="link">
	        		<span class="link_cont">![]({{ ov_src }})</span>
	        		<el-tooltip  effect="light" placement="top">
					  	<div slot="content">Copy</div>
					  	<el-button>
					  		<i class="el-icon-document"></i>
					  	</el-button>
					</el-tooltip>
	        	</div>
	        </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello Vue!',
          	code: '',
          	ov_code: '',
          	selected: ' ',
          	src: '',
          	ov_src: '',
          	size: '',
          	ov_size: '',
          	name: '',
          	ov_name: ''
        }
    },
    props: ['ship'],
    methods: {
    	copy(i,e){
    	 	var target = e.target;
    	 	if (target.className!='el-icon-document') {
    	 		return;
    	 	}
    	 	var link = document.getElementsByClassName("link_cont")[i-1];
	        var aux = document.createElement("input");
			// 获取复制内容
			var content = link.innerText || link.textContent;
			// 设置元素内容
			aux.setAttribute("value", content);
			// 将元素插入页面进行调用
			document.body.appendChild(aux);
			// 复制内容
			aux.select();
			// 将内容复制到剪贴板
			document.execCommand("copy");
			// 删除创建元素
			document.body.removeChild(aux);
    	},
    	handleRemove(file, fileList) {
	        //console.log(file, fileList);
	    },
	    handlePreview(file) {
	        //console.log(file);
	    },
	    handleSuccess(file, fileList) {
	    	if (this.ship) {
	    		var sr=fileList.response;
		    	this.name = fileList.name;
		    	this.src = 'http://'+sr+'/'+encodeURI(fileList.name);
		    	this.size = Math.floor(fileList.size/1024);
		    	this.code = '<img src="'+this.src+'">';
	    	} else {
	    		this.ov_name = fileList.name;
		    	this.ov_src = encodeURI(fileList.response.url);
		    	this.ov_size = Math.floor(fileList.response.bytes/1024);
		    	this.ov_code = '<img src="'+this.ov_src+'">';
	    	}
	    },
	    handleError(file) {
	        //console.log(file);
	    }
    },
    mounted: function () {
    	var self = this;
    	var preDefault = (e) => {
        	e.preventDefault(); 
        }
        var doc=document;
        doc.addEventListener('dragenter', preDefault,false);
        doc.addEventListener('drop', preDefault,false);
        doc.addEventListener('dragover', preDefault,false);
        doc.addEventListener('dragleave', preDefault,false);
	}
}
</script>
<style scoped>
.board {
	display: inline-block;
	width: 78%;
	height: 100%;
	overflow: scroll;
	vertical-align: top;
	font-size: 14px;
}
.logo {
	height: 4.2%;
	margin: 1.5% 0;
}
.preview {
	width: 80%; 
	border: 1px solid silver;
	border-radius: 5px;
	margin: 36px auto 36px;
}
.link_area {
	width: 80%;
	padding: 10px 10px;
	margin: 0 auto 20px;
	border: 1px solid silver;
	overflow: hidden;
	text-align: left;
	font-family: Monaco,'Courier New', monospace;
}
.el-button {
	padding: 0;
	border: 0;
}
.logo {
	display: none;
}
.select {
	display:inline-block;
}
.link i {
	vertical-align: middle;
	color: silver;
}
.link i:hover {
	color: grey;
}
.name,.link_area span{
	display: inline-block;
	vertical-align: middle;
	width: calc(100% - 28px);
	margin: 5px 0;
	border: 1px solid silver;
	background: rgb(241,246,232);
	white-space: nowrap;
	overflow: scroll;
}
.name::-webkit-scrollbar,span::-webkit-scrollbar {
	display:none
}
.area_head {
	font-size: 16px;
	color: silver;
	text-align: center;
	padding-bottom: 10px;
}
.name {
	border: 0;
	background: #fff;
}
</style>
