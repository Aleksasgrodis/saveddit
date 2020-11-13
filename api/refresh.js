const { qs } = require('url-parse')
const { default: fetch } = require('node-fetch')

module.exports = async (req, res) => {
  const { token } = req.query
  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: token,
  })
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
    body: data,
  }
  try {
    const response = await fetch(
      'https://www.reddit.com/api/v1/access_token',
      config,
    )
    const result = await response.json()
    return res.json(result)
  } catch (error) {
    return res.json(error)
  }
}
