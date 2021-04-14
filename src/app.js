const fs = require ('fs');
const path = require ('path');
const express = require ('express');
const data = require('./data');

const accountRoutes = require('./routes/accounts');
const serviceRoutes = require('./routes/services');

const port = 3000;

const app = express();

const accounts = data.accounts;
const users = data.users;
const writeJSON = data.writeJSON;

app.set( 'view engine' , 'ejs');
app.set( 'views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    res.render('index', { title: "Account Summary" ,accounts: accounts});
});

app.get('/profile', function(req,res){
    res.render('profile',{user: users[0]});
});

app.use('/account',accountRoutes);
app.use('/services',serviceRoutes);

app.listen(port, () => {
    console.log(`PS Project Running on port ${port}!`);
})

