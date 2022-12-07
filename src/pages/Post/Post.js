import React from "react";
import "./styles.css";

import {  useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className="post">
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p className="body">{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className="tag">
            {post.tagsArrays.map((tag) => (
              <p key={tag}>
                <span>#{tag}</span>
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
