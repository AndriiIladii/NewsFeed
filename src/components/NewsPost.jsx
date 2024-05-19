import React from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news }) => {
  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((item) => (
          <li className={styles.feedItem} key={item.id}>
            <p>{item.value}</p>
            <div>
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;