var request = require('request');
// var config = require('./config');
var express = require('express');
var router = express.Router();

functions = {
        DJsearch: function(req, res) {
           console.log(req.body);
        //     var searchquery = req.body.query;
        //     var encsearchquery = encodeURIComponent(searchquery);
        //     var bearerheader = 'Bearer ' + config.bearertoken;
        //     request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encsearchquery +
        //     '&result_type=recent&count=100&include_entities=true&since_id=0', {headers: {Authorization: bearerheader}}, function(error, body, response) {
        //         if(error)
        //         console.log(error);
        //         else {
                
        //             res.json({success: true, data:JSON.parse(body.body)});
                    
        //         }
        //     })

        }
}
module.exports = functions;