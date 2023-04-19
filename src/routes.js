import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./components/Header";
import NotFound from "./components/NotFound";

/* Pages */
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MyList from "./pages/MyList";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Movie />} />
        <Route path="/minha-lista" element={<MyList />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
