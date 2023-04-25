import "./styles.scss";

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found container">
      <h2 className="title">Página não encontrada!</h2>

      <Link className="btn-all" to="/">
        Ver todos os filmes!
      </Link>
    </div>
  );
};

export default NotFound;
