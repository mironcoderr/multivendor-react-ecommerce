const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/User');
const Brand = require('./model/Brand');
const Category = require('./model/Category');
const app = express();

mongoose.connect('mongodb+srv://mironcoder:mironcoder123@cluster0.lq0ou.mongodb.net/tralicomdb?retryWrites=true&w=majority', ()=> console.log('DB Connected'));

app.use(cors());
app.use(express.json());

app.post('/register', function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: hash,
            checkbox: req.body.checkbox,
        }
        const data = new User(userData);
        data.save();
    });
});

app.post('/login', async function(req, res) {
    const userData = await User.find({ email: req.body.email });

    if(userData[0]) {
        bcrypt.compare(req.body.password, userData[0].password, function(err, result) {
            if(result) res.send({ 
                currentUser: userData[0], 
                successMsg: 'Account logged in successfully', 
            });
            else res.send({ alert: 'Password does not match' });
        });
    }
    else res.send({ alert: 'Email could not be found' });
});

app.put('/vendor/:userId', (req, res)=> {
    User.findByIdAndUpdate(req.params.userId, { isVendor: true }, { new: true }, (err, docs)=> {
        if(err) console.log(err);
        else res.send(docs);
    });
});

app.post('/brand', (req, res)=> {
    const brandData = { brand: req.body.brand }
    const data = new Brand(brandData);
    res.send(data);
    data.save();
});

app.get('/brand', async (req, res)=> {
    const data = await Brand.find({});
    res.send(data);
});

app.post('/category', (req, res)=> {
    const categoryData = { category: req.body.category }
    const data = new Category(categoryData);
    res.send(data);
    data.save();
});

app.get('/category', async (req, res)=> {
    const data = await Category.find({});
    res.send(data);
});

app.get('/', (req, res)=>  res.send('Hello Data Server'));
app.listen('8000', ()=> console.log('Data Server Running...'));