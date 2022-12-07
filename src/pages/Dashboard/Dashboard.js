import React from "react";
import "./styles.css";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";
const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  // deletar post
  const {deleteDocument} = useDeleteDocument("posts")

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className="noposts">
          <p>Não foram encontrados posts :(</p>
          <Link to="/Post/create" className="btn nopostsbtn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div className="galery">
          {posts &&
            posts.map((post) => (
              <div key={post.id}>
                <div className="post-img">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="btns">
                  <Link to={`/Posts/${post.id}`} className="dashbtn">
                    <BiPlusCircle size={25}/>
                  </Link>
                  <Link className="dashbtn" to= {`/Posts/edit/${post.id}`}><BiEdit size={25}/></Link>
                  <button
                    className="dashbtn delete"
                    onClick={() => deleteDocument(post.id)}
                  >
                    <BiTrash size={25} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
