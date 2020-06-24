var Twit = require('twit');
var config = require('./config.js');
const randomItem = require('random-item');
var schedule = require('node-schedule');

var Twitter = new Twit(config);

var query = {
  q: "odio",
  //geocode: '-23.2927,-51.1732,1000km',
  since_id: null,
}

function retweet() {

  Twitter.get('search/tweets', query, (error, data, response) => {
    if (error) {
      console.log('Bot não pôde achar o último tweet, : ' + error);
    }
    else {

      var id ={
        id : data.statuses[0].id_str
      };

      query.since_id = data.statuses[0].id_str;
  
      Twitter.post('statuses/retweet/:id', id, (error, response) =>{
        if(error)
          console.log('Bot não pode retweetar, : ' + error);
        else
        console.log('Bot retweetou : ' + id.id);

      })
      }
  });
  console.log(query.since_id);
  
}

setInterval(retweet, 42 * 1000);
