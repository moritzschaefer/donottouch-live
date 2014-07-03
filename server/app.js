var express = require('express');
var redis = require('redis');
var db = redis.createClient();
var app = express();
var _ = require('underscore');

app.use(express.json());
app.use(express.urlencoded());

db.set("count", 0);

app.post('/', function(req, res) {
    db.incr("count", function(err, val) {
        db.del(val);
        db.hmset(val, {x: '-1', y: '-1'});
        res.json({id: val});
    });
});

app.get('/', function(req, res) {
    db.get("count", function(err, count) {
        var multi = db.multi();
        for (var i = 1, len = count; i <= len; i++) {
            multi.hgetall(i, function(err, positions) {
            });
        }
        multi.exec(function( err, replies ) {
            res.json(replies);
        });
    });
});
app.put('/:id', function(req, res) {
    db.hmset(req.params.id, {x: req.body.x, y: req.body.y});
    res.send({});
});
app.use(express.static(__dirname + '/client'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


