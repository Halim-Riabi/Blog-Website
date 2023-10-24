const express = require('express');
const articleApi = require('./routes/article');
const authorApi = require('./routes/author');
require('./config/connect');


const app = express();

app.use('/article', articleApi);
app.use('/author', authorApi);

app.use('/getimage', express.static('.uploads'));

app.listen(3001, ()=>{
    console.log('server work');
})