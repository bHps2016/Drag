<template>
	<div class="manage">
		<div class="search">
			<el-input placeholder="请输入内容" style="width: 300px;">
				<el-button slot="append" icon="search"></el-button>
			</el-input>
		</div>
		<div class="preview">
			<div v-for="(item, index) in img" class="item_cont">
				<img :src="item.url">
				<div class="img_msg">
					<div class="img_info">
		    			<div class="name">Size:{{ item.size }}KB</div>
		    			<div class="name">Name:{{ item.name }}</div>
		    		</div>
		        	<div @click="copy(1,$event)" class="link">
		        		<a href="https://vuefe.cn/guide/class-and-style.html">
		        			<span class="link_cont">{{ item.url }}</span>
		        		</a>
		        		<el-tooltip  effect="light" placement="top">
						  	<div slot="content">Copy</div>
						  	<el-button class='cp_bt'>
						  		<i class="el-icon-document"></i>
						  	</el-button>
						</el-tooltip>
		        	</div>
		        	<div @click="copy(2,$event)" class="link">
		        		<span class="link_cont">&lt;img src="{{ item.url }}"&gt;</span>
		        		<el-tooltip  effect="light" placement="top">
						  	<div slot="content">Copy</div>
						  	<el-button class='cp_bt'>
						  		<i class="el-icon-document"></i>
						  	</el-button>
						</el-tooltip>
		        	</div>
		        	<div @click="copy(3,$event)" class="link">
		        		<span class="link_cont">![]({{ item.url }})</span>
		        		<el-tooltip  effect="light" placement="top">
						  	<div slot="content">Copy</div>
						  	<el-button class='cp_bt'>
						  		<i class="el-icon-document"></i>
						  	</el-button>
						</el-tooltip>
		        	</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
var img = [
	{
		name: 'hsx',
		url: 'http://www.benbenla.cn/images/20130104/benbenla-04d.jpg',
		size: '1024'
	},
	{
		name: 'sj',
		url: 'http://img4.imgtn.bdimg.com/it/u=2289083762,978781862&fm=21&gp=0.jpg',
		size: '2024'
	},
	{
		name: 'lk',
		url: 'http://dl.bizhi.sogou.com/images/2013/07/17/346898.jpg',
		size: '3024'
	}
]
export default {
    data () {
        return {
            img: img,
            url: '',
            name: ''
        };
    },
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
}
</script>
<style>
.search {
	display: inline-block;
	padding-top: 20px;
	padding-bottom: 20px;
}
.preview {
	font-size: 0;
}
.item_cont {
	width: 100%;
	padding: 2% 2%;
	border-bottom: 1px solid silver;
}
img {
	width: 36%;
	vertical-align: middle;
}
.img_msg {
	display: inline-block;
	vertical-align: middle;
	width: 64%;
	padding-left: 4%;
	font-size: 14px;
	text-align: left;
}
.preview {
	margin: 0 auto 20px;
	border: 1px solid silver;
	overflow: hidden;
	text-align: left;
	font-family: Monaco,'Courier New', monospace;
}
.cp_bt {
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
.preview .name,.preview .link_cont{
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
.preview .name {
	border: 0;
	background: #fff;
}
</style>