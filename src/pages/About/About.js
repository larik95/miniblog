import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const About = () => {
  return (
    <div className="about">
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no front-end e Firebase
        no back-end.
      </p>
      <p>
        O foco do projeto foi mais relacionado ao front do que ao back. Aprendi
        alguns recursos básicos do Firebase e pude compreender mais sobre o Cloud
        Firestore e Functions. Em relação ao React, aprendi sobre Context, React
        Router, estados de erro e de loading, validação, autenticação e diversos
        Hooks, como o useState, useEffect e useReducer.
      </p>
      <Link to="/Post/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default About;
