const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

module.exports = async (req, res) => {
  const code = req.query.code;
  const redirect_uri =
    process.env.NODE_ENV === 'production'
      ? 'https://saveddit.vercel.app/loading'
      : 'http://localhost:3000/loading';
  const data = qs.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,
  });
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
    body: data,
  };
  try {
    const response = await fetch(
      'https://www.reddit.com/api/v1/access_token',
      config,
    );
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
};
