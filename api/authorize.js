const { default: fetch } = require('node-fetch');

module.exports = (req, res) => {
  const seed = req.body.seed;
  const redirect_uri =
    process.env.NODE_ENV === 'production'
      ? 'https://saveddit.vercel.app/loading'
      : 'http://localhost:3000/loading';
  fetch(
    `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=${seed}&redirect_uri=${redirect_uri}&duration=permanent&scope=vote history identity read save`,
  ).then(response => res.json({ url: response.url }));
};
