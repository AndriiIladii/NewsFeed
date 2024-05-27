import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, handleLikes, handleShare, setNews }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleComment(id) {
    setCommentId(id);
  }

  function addComment() {
    if (comment !== "") {
      const newComment = {
        id: Date.now(),
        value: comment,
      };

      const updateComment = [...comments, newComment];
      setComments(updateComment);
      setComment("");
    }
  }

  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((item) => (
          <li className={styles.feedItem} id={item.id} key={item.id}>
            <p>{item.value}</p>
            {<img src={item.image} alt="news" />}
            <div className={styles.postBtns}>
              <button
                className={styles.likeBtn}
                onClick={() => handleLikes(item.id)}
              >
                <span>{item.likes}</span>
                Like
              </button>
              <button onClick={() => handleComment(item.id)}>Comment</button>
              <button onClick={() => handleShare(item.id)}>Share</button>
            </div>
            {commentId === item.id && (
              <div>
                <input
                  className={styles.comments}
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                />
                <button onClick={addComment}>Add comment</button>
                <ul className={styles.comments}>
                  {comments.map((commentItem) => (
                    <li key={commentItem.id}>
                      <p>{commentItem.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;
