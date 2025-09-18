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
        let id =req.params.id ? req.params.id : nextID;
        let finalFileName= `${id}${path.extname(file.originalname)}`;
        cb(null,finalFileName);
    }
});
const upload = multer({storage: storage});

router.get('/', (req, res) => {
    res.json(project);
})

router.post('/',upload.single('myFile'), (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    let myFileName = req.file ? req.file.filename : null;
    let project = {id,name,description,myFileName};
    project[id] = project;
    res.json({message:"ok"});
})

module.exports = router;