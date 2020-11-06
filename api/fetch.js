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

module.exports = (req, res) => {
  const { token, username, after } = JSON.parse(req.body);
  var config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ` + token,
    },
  };

  fetch(
    `https://oauth.reddit.com/user/${username.toLowerCase()}/saved/?limit=100${
      after ? `&after=${after}` : ''
    }`,
    config,
  )
    .then(response => response.json(response))
    .then(({ data }) => {
      const { dist, after, children, before } = data;
      return res.json({
        dist,
        after,
        before,
        links: minifyReponse(children.map(a => a.data)),
      });
    })
    .catch(error => console.log(error));
};
