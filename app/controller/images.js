'use strict';

const Controller = require('egg').Controller;
const ejs = require('ejs');

class ImagesController extends Controller {
    async saveImages(){
        app.post('/uploadImg', function (req, res, next) {
            let form = new formidable.IncomingForm();
            let dir = "./public/image/";
            form.uploadDir =dir;
            form.parse(req, function(err, fields, files) {
                let oldPath = files.fileName.path; //fileName就是我们刚在前台模板里面配置的后台接受的名称；
                let extname = files.fileName.name; //获取图片名称
                //新的路径由组成：原父路径 + 拓展名
                let newPath = dir + extname;
                //改名     把之前存的图片换成真的图片的完整路径
                fs.rename(oldPath, newPath, function(err) {
                    if(err) {
                        res.send({isOk:false,err});
                    }
                    let resPath = newPath.replace("./public","http://localhost:3009"); //处理图片路径  让前端能访问
                    res.send({isOk:true,url:[resPath]}) //返回图片路径
                });
            });
        })
    }
    async saveAdvertising() {
        const parts = this.ctx.multipart({ autoFields: true });
        let files = {};
        let stream;
        while ((stream = await parts()) != null) {
          if (!stream.filename) {
            break;
          }
          const fieldname = stream.fieldname; // file表单的名字
    
          // 上传图片的目录
          const dir = await this.service.tools.getUploadFile(stream.filename);
          const target = dir.uploadDir;
          const writeStream = fs.createWriteStream(target);
    
          await pump(stream, writeStream);
    
          files = Object.assign(files, {
            [fieldname]: dir.saveDir,
          });
        }
        // const params = Object.assign(files, parts.field);
        // const params = Object.assign(files, parts.field);
        // if (params.action == 0) { // 添加分享
        //   await this.service.advertising.addAdvertising(params);
        // //   await this.service.operationLog.saveOperationLog(OPERATION_TYPE_CREATE, result, SYSTEM, SHARE);
        // } else if (params.action == 1) { // 修改分享
        // //   delete params.action;
        //   //   await this.service.operationLog.saveOperationLog(OPERATION_TYPE_UPDATE, params, SYSTEM, SHARE);
        //   await this.service.advertising.editAdvertising(params);
        // }

        // let resPath = newPath.replace("./public","http://localhost:3009"); //处理图片路径  让前端能访问
                    
        this.ctx.body = {
            isOk:true,
            // url:[resPath]
            url:files
        };
      }
    
}

module.exports = ImagesController;
