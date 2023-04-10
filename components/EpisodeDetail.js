import PodcastCard from "./PodcastCard";
import cache from "../src/services/cache";
import { useEffect, useState } from "react";
import styles from "../styles/PodcastDetail.module.sass";
import { useRouter } from "next/router";
import sanitizeHTML from "sanitize-html";

const EpisodeDetail = (props) => {
  const [episode, setEpisode] = useState({});
  const { handleLoading } = props;
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id, trackId } = router.query;

  useEffect(() => {
    handleLoading(loading); // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    const episodeToRender = cache.get(`podcast_${id}`)
      ? cache
          .get(`podcast_${id}`)
          .filter((x) => x.trackId === parseInt(trackId))
      : "";
    setEpisode(episodeToRender[0]);
    setLoading(false);
  }, [id, trackId]);

  const printDescriptionEpisode = (description) => {
    return sanitizeHTML(description);
  };

  return (
    <div className={styles.podcastDetail__container}>
      <PodcastCard podcastId={id} />
      <section className={styles.podcast}>
        <h2>{episode ? episode.trackName : ""}</h2>
        <p id="episodeDescription">
          {printDescriptionEpisode(episode ? episode.description : "")}
        </p>
        <audio
          className={styles.Podcastaudio__controls}
          src={episode ? episode.episodeUrl : ""}
          controls
        ></audio>
      </section>
    </div>
  );
};
export default EpisodeDetail;
