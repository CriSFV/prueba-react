// https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json

const getPodcasts = async () => {
  return await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )}`
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      const resp = JSON.parse(data.contents);
      return resp.feed.entry.map((podcast) => {
        return {
          id: podcast.id.attributes["im:id"],
          title: podcast["im:name"].label,
          author: podcast["im:artist"].label,
          img: podcast["im:image"][2].label,
          summary: podcast.summary.label,
        };
      });
    });
};

const getPodcastInfo = async (id) => {
  // id podcast === collectionID en fetch
  if (id) {
    return await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const resp = JSON.parse(data.contents);
        return resp.results?.map((episode) => {
          return {
            wrapperType: episode.wrapperType,
            releaseDate: episode.releaseDate,
            trackTimeMillis: episode.trackTimeMillis,
            trackId: episode.trackId,
            trackName: episode.trackName,
            episodeUrl: episode.episodeUrl,
            description: episode.description,
          };
        });
      });
  }
};

const getApiInfo = {
  getPodcasts: getPodcasts,
  getPodcastInfo: getPodcastInfo,
};

export default getApiInfo;
