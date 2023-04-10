import styles from "../styles/PodcastDetail.module.sass";
import cache from "../src/services/cache";
import PodcastCard from "./PodcastCard";
import { useEffect, useState } from "react";
import getApiInfo from "../src/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./Layout";


const PodcastDetail = () => {
  const [podcastToRender, setPodcastToRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const podcastId = router.query.id;

  useEffect(() => {
    const podcastList = cache.get(`podcast_${podcastId}`, []);
    if (podcastList.length === 0) {
      setLoading(true);
      getApiInfo.getPodcastInfo(podcastId).then((resp) => {
        setPodcastToRender(resp);
        podcastId && cache.set(`podcast_${podcastId}`, resp);
        setLoading(false);
      });
    } else {
      setPodcastToRender(podcastList);
      setLoading(false);
    }
  }, [podcastId]);

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
                href={`/podcast/${podcastId}/episode/${episode.trackId}`}
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
    <Layout isLoading={loading} title={"Episodes | Podcast"}>

    <div className={styles.podcastDetail__container}>
      <PodcastCard podcastId={podcastId} />
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
    </Layout>
  );
};

export default PodcastDetail;
