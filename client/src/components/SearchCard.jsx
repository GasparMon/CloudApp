import { useNavigate } from "react-router-dom";
import "../css/SearchCard.modules.css"
import { useDispatch } from "react-redux";
import { userWeather } from "../redux/actions";

export default function SearchCard({element}){
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleWeather = () => {

        const data = {
          name: `${element.name}, ${element.state}`,
          coord: {
            lat: element.lat,
            lon: element.lon,
          }
        };

        console.log(data)
    
        dispatch(userWeather(data));
    
        navigate(`weather/${element.name}`)
      };

    return(
        <div className="main_container_searchCard" onClick={handleWeather}>
            <h4>{`${element.name}, ${element.state} (${element.country})`}</h4>
        </div>
    )
}