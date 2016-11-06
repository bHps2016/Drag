var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var qiniu = require('node-qiniu');
var nconf = require('nconf');
var cloudinary = require('cloudinary');

//获取配置文件

//国内配置文件
var setupchina = nconf.use('file', { file: './app/src/setupchina.json' });
var sr = setupchina.get('src_url');
var ak = setupchina.get('accesskey');
var sk = setupchina.get('sceretkey');
var bn = setupchina.get('bucketname');

//国外配置文件
var setupoverseas = nconf.use('file', { file: './app/src/setupoverseas.json' });
var cn = setupoverseas.get('cloud_name');
var apk = setupoverseas.get('api_key');
var at = setupoverseas.get('api_secret');

qiniu.config({
    access_key: ak,
    secret_key: sk
});

cloudinary.config({ 
  cloud_name: cn, 
  api_key: apk, 
  api_secret: at 
});

var imagesBucket = new qiniu.Bucket(bn);


let server = () =>{
    var app = express();
    app.post('/uploadchina', function(req, res){
        var form = new formidable.IncomingForm();
        
        form.encoding = 'utf-8';
        
        form.keepExtensions = true;
        
        form.parse(req, function (err, fields, files) {
            if(err) {
                res.send(err);
                return;
            }

            // console.log(files)
            //  引入七牛 Node.js SDK

            // 设置全局参数，包括必须的 AccessKey 和 SecretKey，
            // 还可以设置其他如 CallbackURL 等参数，将会顺延至所有空间。
            
            imagesBucket.putFile(files.file.name, files.file.path).then(
                function(reply) {
                    // 上传成功 
                    console.log(reply);
                },
                function(err) {
                    // 上传失败 
                    console.error(err);
                }
            )
            res.send(sr);
        });
    });
    app.post('/uploadoverseas', function(req, res){
        var form = new formidable.IncomingForm();
        
        form.encoding = 'utf-8';
        
        form.keepExtensions = true;
        
        form.parse(req, function (err, fields, files) {
            if(err) {
                res.send(err);
                return;
            }
            cloudinary.uploader.upload(files.file.path, function(result) { 
               res.send(result);
            });
        });
    });
    app.post('/search_china', function(req, res){
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata += postchunk;
        })
        req.addListener("end",function(){
            console.log(postdata)
            var picture = imagesBucket.key(postdata);
            var obj={};
            picture.stat(function(err, stat) {
                if (err) {
                    console.error(err);
                    return;
                }
                // *
                // * {
                // *   hash     : <FileEtag>, // string 类型，文件的Hash值
                // *   fsize    : <FileSize>, // int 类型，文件的大小(单位: 字节)
                // *   mimeType : <MimeType>, // string 类型，文件的媒体类型，比如"image/gif"
                // *   putTime  : <PutTime>   // int64 类型，文件上传到七牛云的时间(Unix时间戳)
                // * }
                
                obj.url = 'http://'+ sr + '/' + postdata;
                obj.size = stat.fsize;
                obj.name = stat.name;
                console.log(obj)
            });
            setTimeout(function(){
                res.send(obj);
                res.end();
            }, 600)
        })
    })
    app.post('/setupchina', function(req, res){
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata += postchunk;
        })

        //POST结束输出结果
        req.addListener("end",function(){
            fs.writeFile('./app/src/setupchina.json', postdata)
            res.end();
        })
    })
    app.post('/setupoverseas', function(req, res){
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata += postchunk;
        })
        //POST结束输出结果
        req.addListener("end",function(){
            fs.writeFile('./app/src/setupoverseas.json', postdata)
            res.end();
        })
    })
    app.listen(3333);  
    console.log('服务器端口：3333')
}
server();