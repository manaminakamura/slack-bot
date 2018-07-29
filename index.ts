require("dotenv").config();

const Twitter: any = require("twitter");

const client: any = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Botkit: any = require("botkit");
const controller: any = Botkit.slackbot({
    debug: false
});

const bot: any = controller.spawn({
    token: process.env.SLACK_BOTS_TOKEN
}).startRTM();

controller.hears(
    ["(.*)"], "direct_message,direct_mention,mention", (bot: any, message: any) : any => {
        const userId: any = process.env.TWITTER_TGT_USER_ID;
        const params: any = { q: `${message.text} from:${userId}`, count: 1 };
        client.get("search/tweets", params, (error: any, tweets: any) : any => {
            if(error) {
                console.log(error);
                bot.reply(message, "An error has occured.");
                return;
            }
            if(tweets.statuses.length == 0) {
                bot.reply(message, "No data");
                return;
            }
            bot.reply(message, tweets.statuses[0].text);
        });
    }
);
