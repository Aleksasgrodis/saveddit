const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = (req, res) => {
  const { body } = req;
  const { id, token } = JSON.parse(body);
  var config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(`https://oauth.reddit.com/api/unsave?id=t3_${id}`, config)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.log(error));
};
