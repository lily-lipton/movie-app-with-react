import { useEffect, useState } from "react";
import './App.css'

// `movieList`の型定義
type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;
};

// TMDB APIからのレスポンスの型定義
type MovieJson = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

function App() {

  // TMDB APIから映画データを取得する関数
  const fetchMovieList = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    let url = "";
    if (keyword) {
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1`;
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?language=ja&page=1";
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await response.json();
    const result = data.results;
    const movieList = result.map((movie: MovieJson) => ({
      id: movie.id,
      original_title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
    }));
    setMovieList(movieList);
  };

  const [keyword, setKeyword] = useState<string>("example value");
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovieList();
  }, [keyword]);

  return (
    <div>
      <input type="text" onChange={(e) => (setKeyword(e.target.value))} />
      <div>{keyword}</div>

      {movieList
        .filter((movie) => movie.original_title.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            <h2>{movie.original_title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  )
}

export default App
