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
        db.del(val); // TODO: delete everything on startup rather than here
        db.hmset(val, {id: val, x: '-1', y: '-1', timestamp: new Date().getTime()});
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
            // process replies
            var oldest = new Date().getTime()-(1000*50); // disconnect after 50 seconds
            for (var reply in replies) {
                try {
                    if(replies[reply] && replies[reply].timestamp < oldest) {
                        console.log("drop due to inactivity:" + replies[reply].id);
                        db.del(replies[reply].id);
                    }
                } catch (e) {
                    console.log("why?:" + e);

                }
            }
            // filter replies:
            replies = _.filter(replies, function(reply) {
                if(reply) {
                    return true;
                } else {
                    return false;
                }
            });
            res.json(replies);
        });
    });
});
app.put('/:id', function(req, res) {
    // if it doesn't exist it will be created
    db.hgetall(req.params.id, function(err, position) {

        try {
            if(req.body.x != position.x || req.body.y != position.y) {
                db.hmset(req.params.id, {id: req.params.id, x: req.body.x, y: req.body.y, timestamp: new Date().getTime()});
            }
        } catch (e) {
            //console.log("error in put: " + e + " redis error: " + err);
            res.status(500);
        }
        res.send({});
    });
});
app.use(express.static(__dirname + '/client'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


