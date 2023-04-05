import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/PodcastDetail.module.sass";

const PodcastCard = (props) => {
  return (
    <section className={styles.podcast}>
      <div className={styles.podcast__img}>
        <Link href={`/podcast/${props.podcast.id}`}>
          <img src={props.podcast.img} alt={`imagen_ ${props.podcast.title}`} />
        </Link>
      </div>
      <hr />
      <div className={styles.podcast__text}>
        <h4 className={styles.podcast__title}>
          <Link href={`/podcast/${props.podcast.id}`}>
            {props.podcast.title}
          </Link>
        </h4>
        <span className={styles.podcast__author}>
          <i>
            {" "}
            by
            <Link href={`/podcast/${props.podcast.id}`}>
              {" "}
              {props.podcast.author}{" "}
            </Link>
          </i>
        </span>
      </div>
      <hr />
      <div className={styles.podcast__text}>
        <h4>
          <b>Description:</b>
        </h4>
        <span>
          <i> {props.podcast.summary} </i>
        </span>
      </div>
    </section>
  );
};
PodcastCard.propTypes = {
  podcast: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PodcastCard;
