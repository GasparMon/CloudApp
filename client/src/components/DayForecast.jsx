import { useDispatch } from "react-redux";
import "../css/DayForecast.modules.css";
import { format, parseISO } from 'date-fns';
import { weatherDay } from "../redux/actions";
export default function DayForecast({date, main, weather}) {
  
  const dispatch = useDispatch();

    const nwdate = parseISO(date);
    const date_card = format(nwdate, 'EEE, MMM dd');

  const hanldeDate = () => {
   
    const parsedDate = parseISO(date);
const newDate = format(parsedDate, 'yyyy-MM-dd');
dispatch(weatherDay(newDate))
  }


  return (
    <div className="main_container_dayforecast" onClick={hanldeDate}>
      <div className="dayforecast_date" id={date} value={date} name={date}>
        <h4>{date_card}</h4>
      </div>
      <div className="dayforecast_date" >
        <h4>{weather[0].main}</h4>
      </div>
      <div className="dayforecast_info" >
        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}></img>
        <h4>{Math.floor(main.temp_max)} / {Math.floor(main.temp_min)} °C </h4>
      </div>
    </div>
  );
}
