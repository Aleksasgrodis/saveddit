const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = (req, res) => {
  const { body } = req;
  const { token } = JSON.parse(body)
  var config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }

  };

  fetch(`https://oauth.reddit.com/api/v1/me`, config)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.log(error));
};
