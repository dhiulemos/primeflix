import "./styles.scss";

import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">
        Prime Flix
      </Link>

      <Link className="favorites" to="/minha-lista">
        Minha Lista
      </Link>
    </header>
  );
};

export default Header;
