const { default: fetch } = require('node-fetch')

module.exports = async (req, res) => {
  const { body } = req
  const { id, token } = JSON.parse(body)
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(
      `https://oauth.reddit.com/api/unsave?id=t3_${id}`,
      config,
    )
    const data = await response.json()
    return res.json(data)
  } catch (error) {
    return res.json(error)
  }
}
