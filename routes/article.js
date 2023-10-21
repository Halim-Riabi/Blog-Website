const express = require('express');

const router = express.Router();

const Article = require('../models/article');
const multer = require('multer');

filename='';
const mystorage = multer.diskStorage({
    destination : './uploads',
    filename: (req, file, redirect)=>{
        let date = Date.now();

        let f1 = date + '.' + file.mimetype.split('/')[1];
        //78788768688767.png
        redirect(null , f1);
        filename = f1;
    }
})

const upload = multer({storage: mystorage})

router.post('/ajout', upload.any('image'), (req, res)=>{
    let data = req.body;
    let article = new Article(data);
    article.date = new Date();
    article.image = filename;
    article.tags = data.tags.split(',');

    article.save()
        .then(
            (saved)=>{
                filename='';
                res.status(200).send(saved);
            }
        )
        .catch(
            err=>{
                res.status(400).send(err);
            }
        )

})

router.get('/all', (req, res)=>{

})
router.get('/getbyid/:id', (req, res)=>{

})
router.get('/getbyidauthor/:id', (req, res)=>{

})
router.delete('/supprimer/:id', (req, res)=>{

})
router.put('/update/:id', (req, res)=>{

})


module.exports = router;