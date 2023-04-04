import styles from "../styles/PodcastDetail.module.sass";
import cache from "../src/services/cache";
import PodcastCard from "./PodcastCard";
import { useEffect, useState } from "react";
import getApiInfo from "../src/services/api";
import PropTypes from "prop-types";
import Link from "next/link";

const PodcastDetail = (props) => {
  const [podcastToRender, setPodcastToRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const podcast = props.idPodcast;
  const { handleLoading } = props;
  useEffect(() => {
    handleLoading(loading); // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    setPodcastToRender(cache.get(`podcast_${podcast.id}`, null));
    if (podcastToRender === null) {
      getApiInfo.getPodcastInfo(podcast.id).then((resp) => {
        setPodcastToRender(resp);
        cache.set(`podcast_${podcast.id}`, resp);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [podcast]);

  const convertTime = (seconds) => {
    let hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    let minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = seconds % 60;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  };

  const printTable = () => {
    return podcastToRender?.map((episode) => {
      if (episode.wrapperType === "podcastEpisode") {
        const episodeDate = new Date(episode.releaseDate);
        const time = episode.trackTimeMillis / 1000;
        return (
          <tr
            key={episode.trackId}
            id={episode.trackId}
            className={styles.table_tr}
          >
            <td>
              <Link
                href={`/podcast/${podcast.id}/episode/${episode.trackId}`}
                className="list-decoration-none"
              >
                {episode.trackName}
              </Link>
            </td>
            <td>{episodeDate.toLocaleDateString()}</td>
            <td>{convertTime(time)}</td>
          </tr>
        );
      }
      return "";
    });
  };

  return (
    <div className={styles.podcastDetail__container}>
      <PodcastCard podcast={podcast} />
      <section>
        <h2 className={`box-shadow ${styles.detail__episodes}`}>
          Episodes: {podcastToRender?.length ? podcastToRender.length - 1 : "-"}{" "}
        </h2>
        <table className={`box-shadow ${styles.detail__table}`}>
          <thead>
            <tr>
              <th>
                <b>Title</b>
              </th>
              <th>
                <b>Date</b>
              </th>
              <th>
                <b>Duration</b>
              </th>
            </tr>
          </thead>
          <tbody>{printTable()}</tbody>
        </table>
      </section>
    </div>
  );
};
PodcastDetail.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

export default PodcastDetail;
