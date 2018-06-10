var express = require('express');
var teamsJson = require('./data/teams.json')
var correspondanceId = require('./data/correspondanceId.json');
var games = require('./data/games.json');
var http = require('http');

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
.get('/course/ranking', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    var options = {
        host: 'api.football-data.org',
        port: 80,
        path: '/v1/competitions/467/leagueTable',
        headers: {'X-Auth-Token' : 'ee1bca07af444f0fa79251b6ed179e32'}
    }
    http.get(options, (resp) => {
        let groups = '';
        
        resp.on('data', (chunk) => {
            groups += chunk;
        });
        
        resp.on('end', () => {
            groups = JSON.parse(groups);
            res.render('ranking.ejs', {groups : groups, correspondanceId : correspondanceId, teams : teamsJson});
        });
        
        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})
.get('/course/fixtures', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.render('fixtures.ejs', {games : games, correspondanceId : correspondanceId, teams : teamsJson});
})
.get('/pronostic', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.render('pronostics.ejs');
})
.get("/contact",function(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.render("contact.ejs");
    
})
.use("/public", express.static(__dirname + '/public'))
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

app.listen(80);