const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = async (req, res) => {
  const { body } = req;
  const { token } = JSON.parse(body);
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`https://oauth.reddit.com/api/v1/me`, config);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
};
