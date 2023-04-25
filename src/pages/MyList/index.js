import "./styles.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdInfo, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const MyList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const storagedMovies = localStorage.getItem("@primeflix");

    if (storagedMovies) {
      setMovieList(JSON.parse(storagedMovies || []));
    }
  }, []);

  const removeMovie = (currentMovieID) => {
    var myList = localStorage.getItem("@primeflix");
    myList = JSON.parse(myList);

    myList = myList.filter((listMovie) => {
      return listMovie.id != currentMovieID;
    });

    setMovieList(myList);
    localStorage.setItem("@primeflix", JSON.stringify(myList));

    toast.success("Filme removido da minha lista.");
  };

  return (
    <section className="my-list container">
      <h1 className="title">Minha Lista</h1>

      <div className="my-card-list">
        {movieList.length > 0 ? (
          movieList.map((movie) => {
            return (
              <div key={movie.id} className="my-card">
                <div className="image">
                  <img
                    className="image"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="skeleton"></div>
                </div>

                <div className="information">
                  <div className="description">
                    <h2 className="movie-name">{movie.title}</h2>
                    <p>
                      {movie.overview.split(" ").splice(0, 16).join(" ")}...
                    </p>
                  </div>

                  <div className="actions">
                    <Link to={`/filme/${movie.id}`}>
                      <MdInfo fontSize="2.6rem" />
                      Ver detalhes
                    </Link>

                    <button onClick={() => removeMovie(movie.id)}>
                      <MdDelete fontSize="2.6rem" />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Não encontramos nenhum filme em sua lista.</h2>
        )}
      </div>
    </section>
  );
};

export default MyList;
