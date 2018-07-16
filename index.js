if(!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

const Botkit = require("botkit");
const controller = Botkit.slackbot({
  debug: false
});

const bot = controller.spawn({
  token: process.env.token
}).startRTM();

controller.hears(
  ["hi"],
  "direct_message,direct_mention,mention",
  (bot, message) => { bot.reply(message, 'bye') }
);
