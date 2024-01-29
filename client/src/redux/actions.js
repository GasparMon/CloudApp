import { USERWEATHER, WEATHERDAY } from "./types";

export function userWeather(data){

    return{
        type: USERWEATHER,
        payload: data,
    }
}

export function weatherDay(date){

    return{
        type: WEATHERDAY,
        payload: date,
    }
}