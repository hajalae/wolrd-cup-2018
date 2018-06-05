var express = require('express');
var teamsJson = require('./data/teams.json')

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('landingPage.ejs');
})
.get('/home', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.render('home.ejs');
})
.get('/teams', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.render('teams.ejs', {teams : teamsJson});
})
.get('/teams/:nameTeam', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    let teamObject = undefined;
    for(let i=0; i<teamsJson.teams.length; i++)
    {
        if(teamsJson.teams[i].name === req.params.nameTeam){
            teamObject = teamsJson.teams[i]
        }
    }
    if(teamObject == undefined)
    {
        res.status(404).send('Page introuvable !');
    }
    else
    {
        res.render('teamsDescription.ejs', {team: teamObject});
    }
})
.get('/fixtures', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Fixtures</h1>');
})
.get('/pronostic', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.render('pronostics.ejs');
})
.use("/public", express.static(__dirname + '/public'))
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

app.listen(80);