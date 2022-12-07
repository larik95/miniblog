import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import {useAuthValue} from '../../context/AuthContext'
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const EditPost = () => {
  const { id } = useParams(); //pega os dados da URL
  const { document:post } = useFetchDocument("posts", id);
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  
  useEffect(() => {
    if(post) {
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)  

        const textTags = post.tagsArrays.join(", ")
        setTags(textTags)
       }
  }, [post])
  
  const {user} = useAuthValue();
  const {updateDocument, response} = useUpdateDocument("posts");
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    //validate image URl
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
      
    }

    //create tags array
    const tagsArrays = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //check all values
    if(!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }
    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArrays,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data)

    //redirect dashboard
    navigate("/Dashboard");
  };

  return (
    <div className="edit_post">
      {post && (
        <>
        <h2>Editar post:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo: </span>
          <input
            type="text"
            name="title"
            required
            placeholder="Seu titulo aqui.."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <div className="preview">
          <img src={post.image} alt={post.title}/>
        </div>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteudo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as # separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn" type="submit">Salvar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        
      </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
