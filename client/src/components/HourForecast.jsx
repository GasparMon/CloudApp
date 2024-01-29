import "../css/HourForecast.modules.css";
import { parseISO, format } from 'date-fns';

export default function HourForecast({date, temp, weather}) {


const parsedDate = parseISO(date);
const formattedTime = format(parsedDate, 'HH:mm');

  return (
    <div className="main_hour_forecast">
      <div className="hour_forecast">
        <h4>{formattedTime}</h4>
      </div>
      <div className="hour_icon">
        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}></img>
      </div>
      <div className="hour_forecast">
        <h4>{Math.floor(temp)} °C</h4>
      </div>
      <div className="hour_mark">
      </div>
    </div>
  );
}
