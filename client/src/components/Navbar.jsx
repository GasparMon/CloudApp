import { useState } from "react";
import "../css/Navbar.modules.css";
import SearchNav from "./SearchNav";
import AppGetLocation from "../handler/AppGetLocation";
import { useNavigate } from "react-router-dom";
export default function Navbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [window, setWindow] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;

    setSearch(value);
  };

  const handleCloseResults = () => {
    setWindow(false);
  };

  const fetchData = async () => {
    const data = await AppGetLocation(search);
    setResults(data);
    setWindow(true);
    setSearch("");
  };

  const hanldeHome = () => {
    navigate("/")
  }

  return (
    <div className="navbar_main_container" onClick={handleCloseResults}>
      <div className="nav_icon_container">
        <img src="/img/icon_cloud_two.png" alt="main_icon" onClick={hanldeHome}></img>
      </div>
      <div className="nav_title_container">
        <h2>CloudApp</h2>
      </div>
      <div className="nav_search_container">
        <div class="group">
          <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Enter your Location"
            type="search"
            class="input"
            value={search}
            onChange={handleSearch}
          />
          {!window ? null : (
            <div>
              <SearchNav
                handleCloseResults={handleCloseResults}
                results={results}
              />
            </div>
          )}
        </div>
        <button class="button" 
        onClick={fetchData} 
        disabled={search.length < 3}
        style={{ backgroundColor: search.length < 3 ? '#627ca9e5' : '#3e9edc' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            ></path>
          </svg>

          <div class="text">Search</div>
        </button>
      </div>
    </div>
  );
}
