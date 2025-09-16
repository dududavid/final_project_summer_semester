const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let project = [];
let nextID = 1;

if(!fs.existsSync('images')){
    fs.mkdirSync('images');
}
const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images/');
    },
    filename: (req,file,cb)=>{
        let id =req.params.id ? req.params.id : nextId;
        let finalFileName= `${id}${path.extname(file.originalname)}`;
        cb(null,finalFileName);
    }
});

router.get('/', (req, res) => {
    res.json(project);
})

router.post('/', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let project = {id,name};
    project[id] = project;
    res.json({message:"ok"});
})

module.exports = router;