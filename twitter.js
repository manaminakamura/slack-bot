require('dotenv').config();
export default () => {
    const Twitter = require('twitter');

    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    const params = { q: 'タピオカ filter:images', count: 1 };
    client.get('search/tweets', params, (error, tweets) => {
        return tweets
    });
}
