import path from 'path';
import {Request, Response, NextFunction} from 'express'
// import {ExReq} from  '../types/request'
import fileUpload, { UploadedFile } from 'express-fileupload';

const fileMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.files);
        if(req.files) {
        let file = req.files.file as UploadedFile;
            let ext = path.extname(file.name);
            let newName = file.md5 + ext;
            file.mv("./images/" + newName);
            req.body.image = path.relative('/', './images/') + '/' + newName;
            next();
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("some error with file");
    }
}

export default fileMiddleware;

