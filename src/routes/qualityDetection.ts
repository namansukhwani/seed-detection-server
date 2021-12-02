import express from 'express';
import path from 'path';
import Multer from 'multer'
import { checkIfAuthenticated } from '../services/firebaseAuthService';
import { uploadeFileFirestore } from '../services/firebaseUploadService';
import firebase,{db} from '../services/Firebase.service'
import axios from 'axios';
import moment from 'moment';
import { maxQualityMapper, QualityMapping, qualityResponse } from '../data/QualityMapping';

var qualityDetectionRouter = express.Router();

const mlServiceUrl="https://seed-detection-ml-server.herokuapp.com/getQuality"

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("Error: Images Only!");
    }
}

const multer = Multer({
    storage: Multer.memoryStorage(),
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb)
    }
})

qualityDetectionRouter.post('/',checkIfAuthenticated,multer.single('file'), (req:any, res, next) => {
    let file = req.file;
    if (file) {
        uploadeFileFirestore(file, req.authId)
        .then(url => {
            const newResult={
                imageUrl:url,
                requestTime:firebase.firestore.Timestamp.now(),
                response:false
            }

            db.collection('user').doc(req.authId).collection('results').add(newResult)
            .then(async value=>{
                axios.post(mlServiceUrl,{
                    url:url
                })
                .then(response=>{
                    const responseMapped=qualityResponse(response)
                    const qualityResponseMapping={
                        averageQuality:responseMapped,
                        grade:QualityMapping[responseMapped],
                        maximumQualityInGroup:maxQualityMapper(response)
                    }

                    const updateResult={
                        timeTaken:moment(newResult.requestTime.toDate()).diff(moment(),'milliseconds'),
                        responseTime:firebase.firestore.Timestamp.now(),
                        responseValue:qualityResponseMapping,
                        response:true
                    }

                    db.collection('user').doc(req.authId).collection('results').doc(value.id).update(updateResult)

                    res.statusCode=200
                    res.send({
                        status:true,
                        data:{
                            quality:qualityResponseMapping,
                            result:{
                                ...newResult,
                                ...updateResult
                            }
                        }
                    })
                })
                .catch()
            })
            .catch(err=>next(err))
        })
        .catch(err=>{
            console.log(err);
            res.statusCode = 401;
            res.json({ status: false, err: 'unable to upload the image' });
        }   
        )
    }
    else{
        res.statusCode = 401;
        res.json({ status: false, err: 'file not found for upload' });
    }
})

qualityDetectionRouter.post('/getResults', (req, res, next) => {
    let file = req.file;
    if (file) {}
})

export default qualityDetectionRouter
