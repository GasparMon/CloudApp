import { useDispatch } from "react-redux";
import "../css/Home_card.modules.css";
import { userWeather } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Home_card({
  icon,
  main,
  temp,
  like,
  humidity,
  speed,
  name,
  coord,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWeather = () => {
    const data = {
      name: name,
      coord: coord,
    };

    dispatch(userWeather(data));

    navigate(`weather/${name}`)
  };

  return (
    <div className="main_container_home_card" onClick={handleWeather}>
      <div className="card_container_home">
        <div className="card_home_city">
          <h2>{name}</h2>
        </div>
        <div className="card_home_info">
          <div className="card_home_icon">
            <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`}></img>
            <h4>{main}</h4>
          </div>
          <div className="card_home_data">
            <div className="card_home_temp">
              <h1>{Math.floor(temp)}°C</h1>
              <p>Feels like {Math.floor(like)}°C</p>
            </div>
            <div className="card_home_h">
              <div className="card_wind">
                <img src="/img/Wind.png" alt="wind" className="temp_icon"></img>
                <h5>{speed} m/s</h5>
              </div>
              <div className="card_wind">
                <img
                  src="/img/Humidity.png"
                  alt="humidity"
                  className="temp_icon"
                ></img>
                <h5>{humidity}%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
