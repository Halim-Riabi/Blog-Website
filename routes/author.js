const express = require('express');

const router = express.Router();

const Author = require('../models/author');
const multer = require('multer');
const bcrypt = require('bcrypt');

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


router.post('/register', upload.any('image'),(req, res)=>{

    data = req.body;
    author = new Author(data);

    author.image= filename;
    // cryptage password
    salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password , salt);
    
    author.save()
    .then(
        (savedAuthur)=>{
            filename="";
            res.status(200).send(savedAuthor);
        }
    )
    .catch(
        err=>{
            res.send(err)
        }
    )

    
})

router.post('/login', (req, res)=>{

})

router.get('/all', (req, res)=>{

})

router.get('/getbyid/:id', (req, res)=>{

})

router.delete('/supprimer/:id', (req, res)=>{

})

router.put('/update/:id', (req, res)=>{

})


module.exports = router;