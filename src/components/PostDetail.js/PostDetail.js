import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const PostDetail = ({ post }) => {
  return (
    <div className="postdetails">
      <div className="image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="flex">
        <span>
          {" "}
          <b>{post.createdBy}:</b> {post.title}
        </span>
      </div>
      <div className="tags">
        {post.tagsArrays.map((tag) => {
          return (
            <p key={tag}>
              <span>#{tag}</span>
            </p>
          );
        })}
      </div>
      <Link to={`/Posts/${post.id}`} className="btn btn-outline">
       Ver mais
      </Link>
    </div>
  );
};

export default PostDetail;
