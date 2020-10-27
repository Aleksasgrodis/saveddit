const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = (req, res) => {
  const code = req.query.code;
  var data = qs.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:3000/loading',
  });
  var config = {
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
