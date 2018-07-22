require('dotenv').config();

const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Botkit = require("botkit");
const controller = Botkit.slackbot({
  debug: false
});

const bot = controller.spawn({
  token: process.env.SLACK_BOTS_TOKEN
}).startRTM();

controller.hears(
  ["(.*)"], "direct_message,direct_mention,mention", (bot, message) => {
    const params = { q: `${message.text} filter:images`, count: 1 };
    client.get('search/tweets', params, (error, tweets) => {
      if(error) {
        console.log(error);
        bot.reply(message, "An error has occured.");
        return;
      }
      if(tweets.statuses.length == 0) {
        bot.reply(message, "no data");
        return;
      }
      bot.reply(message, tweets.statuses[0].text);
    });
  }
);
