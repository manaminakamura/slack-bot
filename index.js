require('dotenv').config();

if(!process.env.SLACK_BOTS_TOKEN) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

const Botkit = require("botkit");
const controller = Botkit.slackbot({
  debug: false
});

const bot = controller.spawn({
  token: process.env.SLACK_BOTS_TOKEN
}).startRTM();

controller.hears(
  ["hi"],
  "direct_message,direct_mention,mention",
  (bot, message) => { bot.reply(message, 'bye') }
);
