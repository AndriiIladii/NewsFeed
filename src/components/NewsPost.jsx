import React, { useState } from "react";
import * as styles from "./NewsPost.module.css";

const NewsPost = ({ news, handleLikes, handleShare, setNews }) => {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [commentEdit, setCommentEdit] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleComment(id) {
    setCommentId(id);
  }

  function handleCommentEdit(event) {
    setCommentEdit(event.target.value);
  }

  function addComment() {
    if (comment !== "") {
      const newComment = {
        id: Date.now(),
        value: comment,
      };

      const updateComment = news.map((newsPost) => {
        if (newsPost.id === commentId) {
          return {
            ...newsPost,
            comments: [newComment, ...newsPost.comments],
          };
        }
        return newsPost;
      });
      setNews(updateComment);
      setComment("");
      setCommentId(null);
    }
  }

  function deleteComment(commentId, id) {
    const updateNews = news.map((newsPost) => {
      if (newsPost.id === commentId) {
        const updateDelete = newsPost.comments.filter(
          (comment) => comment.id !== id
        );
        return {
          ...newsPost,
          comments: updateDelete,
        };
      }

      return newsPost;
    });

    setNews(updateNews);
  }

  function editComment(commentId) {
    setCommentEdit(commentId.value);
    setEditedCommentId(commentId.id);
  }

  function cancelUpdate() {
    setCommentEdit("");
    setEditedCommentId(null);
  }

  return (
    <div>
      <ul className={styles.newsFeed}>
        {news.map((newsPost) => (
          <li className={styles.feedItem} id={newsPost.id} key={newsPost.id}>
            <p>{newsPost.value}</p>
            {newsPost.image && <img src={newsPost.image} alt="news" />}
            <div className={styles.postBtns}>
              <button
                className={styles.likeBtn}
                onClick={() => handleLikes(newsPost.id)}
              >
                <span>{newsPost.likes}</span>
                Like
              </button>
              <button onClick={() => handleComment(newsPost.id)}>
                Comment
              </button>
              <button onClick={() => handleShare(newsPost.id)}>Share</button>
            </div>
            <ul className={styles.comments}>
              {newsPost.comments.map((commentItem) => (
                <li key={commentItem.id}>
                  {editedCommentId === commentItem.id ? (
                    <>
                      <input
                        type="text"
                        value={commentEdit}
                        onChange={handleCommentEdit}
                      />
                      <button>Save</button>
                      <button onClick={cancelUpdate}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>{commentItem.value}</p>
                      <button onClick={() => editComment(commentItem.id)}>
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          deleteComment(newsPost.id, commentItem.id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            {commentId === newsPost.id && (
              <div>
                <input
                  className={styles.comments}
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                />
                <button onClick={addComment}>Add comment</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPost;
