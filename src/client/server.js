var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
})
.get('/home', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Home</h1>');
})
.get('/teams', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Teams</h1>');
})
.get('/teams/:nameTeam', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.render('teams/'+req.params.nameTeam+'.ejs', {nameTeam: req.params.nameTeam});
})
.get('/fixtures', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Fixtures</h1>');
})
.get('/pronostic', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Pronostic</h1>');
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(80);