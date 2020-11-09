const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = (req, res) => {
  const token = req.query.token;
  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: token,
  });
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
    body: data,
  };
  fetch('https://www.reddit.com/api/v1/access_token', config)
    .then(response => response.json(response))
    .then(data => res.json(data))
    .catch(error => console.log(error));
};
