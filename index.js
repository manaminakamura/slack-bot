require("dotenv").config();
var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var Botkit = require("botkit");
var controller = Botkit.slackbot({
    debug: false
});
var bot = controller.spawn({
    token: process.env.SLACK_BOTS_TOKEN
}).startRTM();
controller.hears(["(.*)"], "direct_message,direct_mention,mention", function (bot, message) {
    var userId = process.env.TWITTER_TGT_USER_ID;
    var params = { q: message.text + " from:" + userId, count: 1 };
    client.get("search/tweets", params, function (error, tweets) {
        if (error) {
            console.log(error);
            bot.reply(message, "An error has occured.");
            return;
        }
        if (tweets.statuses.length == 0) {
            bot.reply(message, "No data");
            return;
        }
        bot.reply(message, tweets.statuses[0].text);
    });
});
