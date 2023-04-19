import "./styles.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import api from "../../services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "7de768989c0d14dca569ab7ace39c4b2",
          language: "pt-BR",
          page: 1,
        },
      });

      if (response.status === 200) {
        setMovies(response.data.results);
        return;
      }
    };

    loadMovies();

    var myList = localStorage.getItem("@primeflix");
    setMyList(JSON.parse(myList));
  }, []);

  return (
    <div className="container">
      <div className="playing-now">
        <h2 className="title">Confira os últimos lançamentos</h2>

        <div className="movies-list">
          {movies.map((movie) => {
            const release_date = new Date(movie.release_date);
            const inMyList = myList.some((listMovie) => {
              return listMovie.id === movie.id;
            });

            return (
              <article className="movie" key={movie.id}>
                <Link className="poster" to={`/filme/${movie.id}`}>
                  <div className="image">
                    <img
                      className="image"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>

                  <div className="short-informations">
                    <div className="name">
                      <h3 className="movie-name">{movie.title}</h3>

                      <p className="date">
                        {release_date.toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="saved">
                      {inMyList ? (
                        <MdFavorite fontSize="2.4rem" color="#F65156" />
                      ) : (
                        <MdFavoriteBorder fontSize="2.4rem" />
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
