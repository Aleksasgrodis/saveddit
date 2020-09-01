// https://oauth.reddit.com

const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = (req, res) => {
  
  const { token, username, after } = JSON.parse(req.body);
  console.log(token, username, after)
  var config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(
    // `https://oauth.reddit.com/user/${username}/saved?limit=100&after=${after}`,
    `https://oauth.reddit.com/user/${username}/saved?limit=100`,
    config,
  )
    .then(response => response.json(response))
    .then(data => res.json(data))
    .catch(error => console.log(error));
};
