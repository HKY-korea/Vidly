import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedMovies = paginate(sorted, currentPage, pageSize);

  useEffect(() => {
    setMovies(getMovies());
    setGenres([{ _id: "", name: "All Genres" }, ...getGenres()]);
  }, []);

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m._id !== movie._id));
  };

  const handleLike = (movie) => {
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    setMovies([...movies]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn({ ...sortColumn });
  };

  if (movies.length === 0) {
    return <p>There are no movies in the database</p>;
  }

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <p>Showing {filtered.length} movies in the database.</p>
        <MoviesTable
          movies={paginatedMovies}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
