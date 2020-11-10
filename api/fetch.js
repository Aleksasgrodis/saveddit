const { qs } = require('url-parse');
const { default: fetch } = require('node-fetch');

const minifyReponse = array => {
  return array.map(
    ({
      author,
      archived,
      created_utc,
      domain,
      id,
      num_comments,
      over_18,
      permalink,
      score,
      subreddit_name_prefixed,
      subreddit,
      title,
      url,
    }) => ({
      author,
      archived,
      created_utc,
      domain,
      id,
      num_comments,
      over_18,
      permalink,
      score,
      subreddit_name_prefixed,
      subreddit,
      title,
      url,
    }),
  );
};

module.exports = async (req, res) => {
  const { token, username, afterListing } = JSON.parse(req.body);
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ` + token,
    },
  };

  try {
    const response = await fetch(
      `https://oauth.reddit.com/user/${username.toLowerCase()}/saved/?limit=100${
        afterListing ? `&after=${afterListing}` : ''
      }`,
      config,
    );
    const {
      data: { dist, after, children, before },
    } = await response.json();
    return res.json({
      dist,
      after,
      before,
      links: await minifyReponse(children.map(a => a.data)),
    });
  } catch (error) {
    return res.json(error);
  }
};
