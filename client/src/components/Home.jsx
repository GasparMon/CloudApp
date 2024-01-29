import "../css/Home.modules.css";
import Home_card from "./Home_card";
import { home_cities} from "../utils/main_cities";
import { useEffect, useState } from "react";
import AppGetWeather from "../handler/AppGetWeather";

export default function Home() {
  const [cities_data, setCities_Data] = useState([]);
  const [cities_render, setCitiesRender] = useState([])

  useEffect(() => {
    const fetchData = () => {
      home_cities.forEach(async (element) => {
        try {
          const response = await AppGetWeather(element);

          if (response.name && !cities_data.some((element) => element.id === response.id)) {
            setCities_Data((prevCitiesData) => [...prevCitiesData, response]);
          }
        } catch (error) {
          return error.message;
        }
      });
    };

    fetchData();
  }, [home_cities]);

  useEffect(() => {

    const uniqueCitiesData = cities_data.reduce((accumulator, current) => {

      if (!accumulator[current.named]) {

        accumulator[current.named] = current;
      }
      return accumulator;
    }, {});

    const resultArray = Object.values(uniqueCitiesData);
    
    setCitiesRender(resultArray)

  },[cities_data])


  return (
    <div className="home_main_container">
      <div className="home_main_title">
        <span class="material-symbols-outlined">globe</span>
        <h1>Global Highlights Forecast</h1>
      </div>
      <div className="home_cards_city">
        {cities_render.map((element) => (
         
            <Home_card
            key={element.id}
            name={element.named}
            icon={element.weather[0].icon}
            main={element.weather[0].main}
            temp={element.main.temp}
            like={element.main.feels_like}
            humidity={element.main.humidity}
            speed={element.wind.speed}
            coord={element.coord}
            />
        ) )}
      </div>
    </div>
  );
}
