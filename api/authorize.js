const { default: fetch } = require('node-fetch')

module.exports = async (req, res) => {
  const { seed } = req.body
  const redirectUri =
    process.env.NODE_ENV === 'production'
      ? 'https://saveddit.vercel.app/loading'
      : 'http://localhost:3000/loading'

  try {
    const response = await fetch(
      `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=${seed}&redirect_uri=${redirectUri}&duration=permanent&scope=vote history identity read save`,
    )
    return res.json({ url: response.url })
  } catch (error) {
    return res.json({ error })
  }
}
