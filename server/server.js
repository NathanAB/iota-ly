/* server.js */

/* Setup */

var express  = require('express');
var path = require('path');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var favicon = require('serve-favicon');
var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var model = require('./js/model.js');
var contentHelper = require('./js/content.js');
var sessionKeys = require('./sessionKeys.json');

var app = express();

/* Configuration */ 

app.use('/static', express.static(__dirname + '/../client'));                 // set the static files location /client/img will be /img for users
app.use(favicon(__dirname + '/../client/img/favicon.ico'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cookieParser());
app.use(cookieSession(sessionKeys));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

/**
 * This is back end code, structure the project better so that this
 * is not exposed on the front end.
 * 
 * e.g.
 * 
    ├── client/
    |   ├── css/
    |   └── fonts/
    |   └── etc...
    └── src/
        ├── server.js
        └── database/
            └── model.js
 */
var ContentProvider = model.ContentProvider;
var ContentProvider = new ContentProvider();

var Account = model.User;
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var ContentPoster = contentHelper.ContentPoster;
var ContentPoster = new ContentPoster();

/* API */
app.get('/api/contents', function(req, res) {
    ContentProvider.findContents(req.user._id, function(err, contents){
        if (err)
            res.send(err)

        res.json(contents); 
    });
});

app.post('/api/contents', function(req, res) {

    if(req.body.text)
        ContentPoster.post(req.user._id, req.body.text);
    
    //Send back all contents   
    ContentProvider.findContents(req.user._id, function(err, contents){
        if (err)
            res.send(err)

        res.json(contents); 
    });
});

// delete content
app.delete('/api/contents/:content_id', function(req, res) {
    ContentProvider.remove({
        _id : req.params.content_id
    }, function(err){
        if(err)
            res.send(err);
         
        //Send back all contents   
        ContentProvider.findContents(function(err, contents){
            if (err)
                res.send(err)

            res.json(contents); 
        });
    });
});

/* Routes */

app.get('/register', function(req, res) {
    return writePage(res, "client/register.html");
});

app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.email }), req.body.password, function(err, account) {
        if (err) {
            //TODO Send back errors
            //return res.render('register', { account : account });
            return writePage(res, "client/register.html");
        }
        res.redirect('/');
    });
});

app.get('/login', function(req, res) {
    return writePage(res, "client/login.html");
});

app.post('/login', passport.authenticate('local'), function(req, res, next) {
    //TODO Send back errors
    res.redirect('/');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('*', function(req, res) {
    if(req.user) {
        if(req.url === "/"){
            //console.log(req.user);
            return writePage(res, "client/index.html");
        }
    
        var stringlet = req.url.slice(1);
        //console.log('URL Put Content Request: ' + stringlet);
        
        if(stringlet && stringlet.indexOf("content.content") < 0){
            ContentPoster.post(req.user._id, stringlet);
        }
        
        res.redirect('/');
    
    } else {
        // No user logged in, check whether to do a content-login
        if(req.url === "/"){
            return writePage(res, "client/login.html");
        } else {
            //TODO Write post content after login prompt
            res.redirect('/');
        }
    }
});
    
/* Listen */
app.listen(process.env.PORT || 3001);
console.log('App listening on port ' + (process.env.PORT || 3001));

/* Helper Functions */
function writePage(res, path) {
    fs.readFile(path, 'binary', function(err, file) {
        if(err) {  
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
            return;
        }
        
        res.writeHead(200);
        res.write(file, "binary");
        res.end();
        return;
    });
}

function isLoggedIn(req, res, next) {
    if (req.user)
        return next();
    res.redirect('/login');
}