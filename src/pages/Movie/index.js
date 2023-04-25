import "./styles.scss";

import React from "react";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdMovie, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";

import api from "../../services/api";

const Movie = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieIsSaved, setMovieIsSaved] = useState(false);

  // load movie
  useEffect(() => {
    const loadMovie = async () => {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "7de768989c0d14dca569ab7ace39c4b2",
            language: "pt-BR",
          },
        })
        .then((response) => {
          console.log(response);
          setMovie(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/", { replace: true });
          return;
        });
    };

    loadMovie();
  }, [id, navigate]);

  // check if the movie is already on my list
  useEffect(() => {
    var myList = localStorage.getItem("@primeflix");

    myList = JSON.parse(myList) || [];

    const hasMovie = myList.some((movieSave) => {
      return movieSave.id === movie.id;
    });

    if (hasMovie) setMovieIsSaved(true);
  }, []);

  const saveMovie = () => {
    var myList = localStorage.getItem("@primeflix");

    myList = JSON.parse(myList) || [];

    const hasMovie = myList.some((movieSave) => {
      return movieSave.id == movie.id;
    });

    // remove the movie from my list
    if (hasMovie) {
      myList = myList.filter((movieSave) => {
        return movieSave.id != movie.id;
      });

      localStorage.setItem("@primeflix", JSON.stringify(myList));
      setMovieIsSaved(false);

      toast.success("Filme removido da minha lista!");
      return;
    }

    // add the movie in to my list
    myList.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(myList));

    setMovieIsSaved(true);
    toast.success("Filme adicionado à minha lista!");
  };

  return (
    <div className="page-movie container">
      <section className="overview">
        <div className="image">
          <img
            className="image"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="skeleton"></div>
        </div>

        <div className="description">
          <h2 className="title">{movie.title}</h2>

          <div className="informations">
            <p className="release">
              {new Date(movie.release_date).toLocaleDateString()} (BR)
            </p>

            <span>•</span>

            <p className="genres">
              {movie.genres &&
                movie.genres.map((genre, i) => {
                  if (i == movie.genres.lentgh) {
                    return `${genre.name}.`;
                  }
                  return `${genre.name}, `;
                })}
            </p>
          </div>

          <div className="actions">
            <button className="action save" onClick={saveMovie}>
              {movieIsSaved ? (
                <>
                  <MdFavorite fontSize="2.4rem" color="#F65156" />
                  Adicionado
                </>
              ) : (
                <>
                  <MdFavoriteBorder fontSize="2.4rem" />
                  Adicionar à lista
                </>
              )}
            </button>

            <Link
              className="action"
              target="blank"
              rel="external"
              to={`https://youtube.com/results?search_query=${movie.title}`}
            >
              <>
                <MdMovie fontSize="2.4rem" /> Assistir trailer
              </>
            </Link>
          </div>

          <div className="sinopse">
            <h3>Sinopse</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movie;
