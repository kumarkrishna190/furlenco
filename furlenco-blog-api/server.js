const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'furlenco-blog'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.send('this is working');
})


app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
       if (isValid) {
        return db.select('*').from('login')
        .where('email', '=', req.body.email)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(400).json('unable to get blogs'))
       } else {
        res.status(400).json('wrong email id or password')
        }
    })
    .catch(err => res.status(400).json('wrong email id or password'))
})


app.post('/register', (req, res)=> {

    const { name, email, password, phone_num } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
            name: name,
            phone_num: phone_num
        })
        .into('login')
        .returning('*')
        .then(loginEmail => {
            return trx('login')
                .returning('*')
                .then(user => {
                res.json(user[user.length - 1]) 
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {;
        res.status(400).json('email already exists');
    })
 })

app.post('/addblog', (req, res)=> {
    const { email, title, blog } = req.body;
    db.transaction(trx => {
        trx.insert({
            email: email,
            title: title,
            blog: blog,
            creation_date: new Date(),
            last_update: new Date()
        })
        .into('blog')
        .returning('*')
        .then(loginEmail => {
            return trx('blog')
                .returning('*')
                .then(blog => {
                res.json(blog[blog.length - 1]) 
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('unable to add blog');
    })
 })


app.get('/blog', (req, res) => {
    db.select('*').from('blog')
     .then(blog => {
        if (blog.length) {
            res.json(blog)
        } else {
            res.status(400).json('blog not found')
        }
    })
    .catch(err => res.status(400).json('something went wrong'))
})


app.get('/blog/:blog_id', (req, res) => {
    const { blog_id } = req.params;
    db.select('*').from('blog').where({blog_id})
     .then(blog => {
        if (blog.length) {
            res.json(blog[0])
        } else {
            res.status(400).json('blog not found')
        }
    })
    .catch(err => res.status(400).json('something went wrong'))
})
 

 app.put('/editblog', (req, res) => {
    const { id, title, blog } = req.body;
    db('blog').where('blog_id', '=', id)
    .update({
            'title': title,
            'blog': blog,
            'last_update': new Date()
    })
    .returning('*')
    .then(blog => {
        res.json(blog)
    })
    .catch(err => { res.status(400).json('unable to update');
    console.log(err);
    })
})

 app.post('/addcomment', (req, res)=> {
    const { blog_id, name, comment } = req.body;
    db.transaction(trx => {
        trx.insert({
            blog_id: blog_id,
            name: name,
            comment: comment,
            comment_date: new Date()
        })
        .into('comment')
        .returning('*')
        .then(comment => {
            return trx('comment')
                .returning('*')
                .then(comment => {
                res.json(comment) 
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('you are not allowed to comment');
    })
 })

app.get('/comment/:blog_id', (req, res) => {
    const { blog_id } = req.params;
    db.select('*').from('comment').where({blog_id})
     .then(comment => {
        if (comment.length) {
            res.json(comment)
        } else {
            res.status(400).json('comment not found')
        }
    })
    .catch(err => res.status(400).json('something went wrong'))
})



app.listen(3000, ()=> {

    console.log('app is running on port 3000');
})

