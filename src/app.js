const fs = require ('fs');
const path = require ('path');
const express = require ('express');

const port = 3000;

const accountData = fs.readFileSync(path.join(__dirname,'/json/accounts.json'), "utf-8");
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname,'/json/users.json'), "utf-8");
const users = JSON.parse(userData);

const app = express();

app.set( 'view engine' , 'ejs');
app.set( 'views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    res.render('index', { title: "Account Summary" ,accounts: accounts});
});

app.get('/savings', function(req,res){
    res.render('account',{account: accounts.savings});
});

app.get('/checking', function(req,res){
    res.render('account',{account: accounts.checking});
});

app.get('/credit', function(req,res){
    res.render('account',{account: accounts.credit});
});

app.get('/profile', function(req,res){
    res.render('profile',{user: users[0]});
});

app.get('/transfer', function(req,res){
    res.render('transfer');
});

app.get('/payment', function(req,res){
    res.render('payment', {account: accounts.credit});
});

app.post('/payment',function(req,res){
    accounts.credit.balance -= parseFloat(req.body.amount);
    accounts.credit.available += parseFloat(req.body.amount);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf-8');
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.post('/transfer',function(req,res){
    accounts[req.body.from].balance -= parseFloat(req.body.amount);
    accounts[req.body.to].balance += parseFloat(req.body.amount);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf-8');
    res.render('transfer', {message: "Transfer Completed"});
});

app.listen(port, () => {
    console.log(`PS Project Running on port ${port}!`);
})

