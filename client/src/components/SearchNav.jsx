import { useEffect } from "react";
import "../css/SearchNav.modules.css";
import SearchCard from "./SearchCard";

export default function SearchNav({ handleCloseResults, results }) {

  const handleSearch = (event) => {
    const value = event.target.getAttribute('value');
    const coord = {
      lat: value.lat,
      lon: value.lon
    }
  }

  return (
    <div className="main_searchnav_container">
      <div className="searchnav_title">
        <h5>{results.length}  Results</h5>
        <div className="searchnav_close" onClick={handleCloseResults}>
          <span class="material-symbols-outlined">close</span>
        </div>
      </div>
      {results.map((element, index) => (
        <div className="search_cities">
          <SearchCard
          key={index}
          element={element}
          />
        </div>
      ))}
    </div>
  );
}
