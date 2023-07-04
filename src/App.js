import {useEffect, useState} from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=6752cc3e";

const movie1 = {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}
    

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        try {
          const response = await fetch(`${API_URL}&s=${title}`);
          const data = await response.json();
    
          if (data.Response === "True") {
            setMovies(data.Search);
          } else {
            console.log(data.Error);
          }
        } catch (error) {
          console.log("Bir hata oluştu:", error);
        }
      }
    
      useEffect(() => {
        searchMovies("Batman");
      }, []);
    
    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                  placeholder="Search for movies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                  src={SearchIcon}
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 
               ? ( <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie = {movie}/>
                ))}
            </div>): (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
            }

        </div>
    )
}

export default App;