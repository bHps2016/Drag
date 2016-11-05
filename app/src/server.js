var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var query = require("querystring");
var fs = require('fs');
var qiniu = require('node-qiniu');

let server = () =>{
    var app = express();
    app.post('/upload', function(req, res){
        var form = new formidable.IncomingForm();
        
        form.encoding = 'utf-8';
        
        form.keepExtensions = true;
        
        form.parse(req, function (err, fields, files) {
            if(err) {
                res.send(err);
                return;
            }
            //  引入七牛 Node.js SDK

            // 设置全局参数，包括必须的 AccessKey 和 SecretKey，
            // 还可以设置其他如 CallbackURL 等参数，将会顺延至所有空间。
            qiniu.config({
                  access_key: 'T2f8MFcG0Wu4HVKpOCu8pAxbqMXO0f6pHnnlmI9y',
                  secret_key: '7AARzZSEZi_f0ctzGIRARfLobRzPcK_OFLvIGTlH'
            });

            var imagesBucket = new qiniu.Bucket('blog');
            
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
            imagesBucket.getFile('exampleKey', function(err, data) {
                if (err) {
                    return console.error(err);
                }
             
                console.log('data 为包含文件数据的 Buffer 对象')
            });
            var image = imagesBucket.image('exampleKey');
            // image.imageInfo(function(err, info) {
            //     if (err) {
            //         return console.error(err);
            //     }
             
            //     console.dir(info);
            // });
            image.imageView({
                mode    : 2,
                width   : 180,
                height  : 180,
                quality : 85,
                format  : 'jpg'
            }, function(err, imageData) {
                if (err) {
                    return console.error(err);
                }
             
                console.log('imageData 为处理过后的图像数据')
            });
            var picture = imagesBucket.key('exampleKey');
            var picUrl = picture.url();
            console.log(picUrl);
            res.send('success');
        });
    });
    app.post('/setupchina', function(req, res){
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata += postchunk;
        })

        //POST结束输出结果
        req.addListener("end",function(){
            res.write(JSON.stringify(postdata));
            fs.writeFile('app/src/setupchina.json', postdata)
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
            res.write(JSON.stringify(postdata));
            fs.writeFile('app/src/setupoverseas.json', postdata)
            res.end();
        })
    })
    app.listen(3000);  
    console.log('服务器端口：3000')
}
exports.server = server;