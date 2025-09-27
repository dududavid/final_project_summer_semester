const express = require('express');
const router = express.Router();
const multer =require('multer');
const path = require('path');
const fs = require('fs');

let projects = [];
let nextID =1;

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

router.get('/',(req,res)=>{
    res.json(projects);
});

router.get('/:id', (req, res) => {
    let id = Number(req.params.id);
    let project = projects.find(p => p.id === id);
    if (!project) return res.status(404).json({ message: "פרויקט לא נמצא" });
    res.json(project);
});

router.post('/', (req, res, next) => {req.newId = nextID++;
    next();
},
    upload.single('myFile'), (req, res) => {
    let id = req.newId;
    let name = req.body.name;
    let description = req.body.description;
    let myFileName = req.file ? req.file.filename : null;

    let project = { id, name, description, myFileName, votes: 0, voters: [] };
    projects.push(project);

    res.json({ message: "ok", project });
});


router.delete('/:id', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.json({ message: "לא חוקי" });
    let index = projects.findIndex(p => p.id === id);
    if (index === -1) return res.json("לא קיים");
    let project = projects[index];
    projects.splice(index, 1);
    if (project.myFileName && fs.existsSync(path.join('images', project.myFileName))) {
        fs.unlinkSync(path.join('images', project.myFileName));
    }
    res.json({ message: "נמחק בהצלחה" });
});

router.patch('/:id', upload.single('myFile'), (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.json({ message: "מזהה לא חוקי" });

    let project = projects.find(p => p.id === id);
    if (!project) return res.json({ message: "פרויקט לא קיים" });

    let oldFileName = project.myFileName;
    let newFileName = req.file ? req.file.filename : null;

    if (oldFileName && newFileName && newFileName !== oldFileName) {
        if (fs.existsSync(path.join('images', oldFileName))) {
            fs.unlinkSync(path.join('images', oldFileName));
        }
        project.myFileName = newFileName;
    }

    if (req.body.name) project.name = req.body.name;
    if (req.body.description) project.description = req.body.description;

    res.json({ message: "עודכן בהצלחה", project });
});



module.exports =router;