<template>
    <div class='board'>
        <img :class="[ship ? 'select':'']" class="logo" src="../assets/qiniu_logo.png">
        <img :class="[ship ? '':'select']" class="logo" src="../assets/webpack.png">
        <div id="drag_area" class="drag_area">将图片拖拽到此处上传</div>
        <div v-if='src'>
	        <img class="preview" :src="src">
	        <div class="link_area">
	        	<div class="area_head">图片信息</div>
	        	<div class="info">
	    			<div class="name">Size:{{ size }}KB</div>
	    			<div class="name">Name:{{ name }}</div>
	    		</div>
	        	<div @click="copy(1,$event)" class="link">
	        		<a href="https://vuefe.cn/guide/class-and-style.html">
	        			<span class="link_cont">{{ res_url }}</span>
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
	        		<span class="link_cont">![]({{ res_url }})</span>
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
          	selected: ' ',
          	src: '',
          	size: '',
          	name: '',
          	res_url: ''
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
    	 	console.log(link)
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
        var drag_area = document.getElementById("drag_area");
        console.log(drag_area)
        drag_area.addEventListener("drop", function(e){
        	e.preventDefault();
        	e.preventDefault(); //取消默认浏览器拖拽效果 
	        var fileList = e.dataTransfer.files; //获取文件对象 
	        //检测是否是拖拽文件到页面的操作 
	        if(fileList.length == 0){ 
	            return false; 
	        } 
	        //检测文件是不是图片 
	        if(fileList[0].type.indexOf('image')!==-1){ 
	            //拖拉图片到浏览器，可以实现预览功能 
	            var img = window.URL.createObjectURL(fileList[0]); 
	            var filename = fileList[0].name; //图片名称 
	            var filesize = Math.floor((fileList[0].size)/1024); 
	            self.size = filesize;
	            self.name = filename;
	            self.src = "http://pics.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg";
	            var url = "http://pics.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg";
	            console.log("发送一个Ajax!");
	            var xhr = new XMLHttpRequest(); 
		        xhr.open("post", url , true); 
		        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		        xhr.onload = function (res,err) {
		        	self.res_url = res.currentTarget.responseURL;
		        	self.code = '<img src="'+self.res_url+'">';
		        	console.log(self.res_url);
		        } 
		        var fd = new FormData(); 
		        fd.append('mypic', fileList[0]); 
		             
		        xhr.send(fd); 
        	}
        }, false)

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
.drag_area {
	width: 80%;
	height: 100px;
	margin: 0 auto;
	color: silver;
	border: 1px dashed currentColor; 
	border-radius: 5px;
	line-height: 100px;
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
