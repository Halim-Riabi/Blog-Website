const express = require('express');

const router = express.Router();

const Author = require('../models/author');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    let data = req.body;

    Author.findOne({email : data.email})
    .then(
        (author)=>{
            let valid = bcrypt.compareSync(data.password, author.password);
            if(!valid){
                res.send("email or password not valid !");
            }
            else{

                let payload = {
                    _id: author._id,
                    email: author.email,
                    fullname: author.name +' '+ author.lastname
                }
                let token = jwt.sign(payload, '123456789');
                res.send({mytoken : token})

            }
        }
    )
    .catch(
        err=>{
            res.send(err);
        }
    )

})

router.get('/all', (req, res)=>{

    Author.find({})
    .then(
        (authors)=>{
            res.status(200).send(authors)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )

})

router.get('/getbyid/:id', (req, res)=>{

    let id = req.params.id
    Author.findOne({_id:id})
    .then(
        (author)=>{
            res.status(200).send(author);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )

})

router.delete('/supprimer/:id', (req, res)=>{
    let id = req.params.id
    Author.findByIdAndDelete({_id:id})
    .then(
        (author)=>{
            res.status(200).send(author);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )

})

// router.put('/update/:id', (req, res)=>{

//     let id = req.params.id;
//     let data = req.body;
//     data.tags = data.tags.split(',');

//     if(filename.length > 0){
//         data.image = filename;
//     }

//     Author.findByIdAndUpdate({_id:id}, data)
//     .then(
//         (author)=>{
//             filename = '';
//             res.status(200).send(author);
//         }
//     )
//     .catch(
//         (err)=>{
//             res.status(400).send(err);
//         }
//     )

// })


module.exports = router;