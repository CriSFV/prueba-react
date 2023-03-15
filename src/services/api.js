// https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json

const GetPodcast = () => {
  return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json')}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then((data) => {
      const resp = JSON.parse(data.contents);
      return resp.feed.entry
  }); 
}
export default GetPodcast;