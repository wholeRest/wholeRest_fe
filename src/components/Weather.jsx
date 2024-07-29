import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';


export function Weather() {
  const [data, setData ] = useState(null);

  const API_KEY = '2cfb73153479d1fc4d4000463d5ff4cc';

  const getWeather = ((lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then((responese) => {
        return responese.json();
      })
      .then((json) => {
        setData(json);
        console.log(json);

        // 이 부분은 setData 이후에 실행되어야 함
        const iconURL = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        const iconSection = document.querySelector(".weathericon");
        if (iconSection) {
          iconSection.setAttribute("src", iconURL);
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
        setData(error);
      }).finally(() => {
        console.log('Finally end');
      })
  });
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    getWeather(latitude, longitude);
  };

  const fail = () => {
    alert("좌표를 받아올 수 없음");
  };

 
  /*
    const tempSection = document.querySelector('.temperature');
    const placeSection = document.querySelector('.place');
    const descSection = document.querySelector('.description');

    let temperature ="";
    let place="";
    let description="";


    const getWeather = (lat, lon) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
           {  method: 'POST',
              body: JSON.stringify({
                title
              })
           }
        )
        .then((response) => {
            
            return response.json();
          })
          .then((json) => {
            console.log(json);
            SVGMetadataElement(json);
            
            temperature = json.main.temp;
            place = json.name;
            description = json.weather[0].description;
            console.log(temperature +" "+  json.main.temp);
            console.log(place +" "+  json.name);
            console.log(description +" "+  json.weather[0].description);

           //
            if (tempSection && placeSection && descSection) {
              tempSection.innerText = temperature;
              placeSection.innerText = place;
              descSection.innerText = description;
            } else {
              console.error('One or more elements not found:' );
            }
            //
      
            if (tempSection) {
              tempSection.innerText = temperature;
            } else {
              console.error('temp not found:' );
            }

            if (placeSection) {
              placeSection.innerText = place;
            } else {
              console.error('place not found:' );
            }

            if ( descSection) {
              descSection.innerText = description;
            } else {
              console.error('desc not found:' );
            }
          })
          .catch((error) => {
            alert(error);
          });
      }

     

      
  const handleWeatherClick = (event) => {
    navigator.geolocation.getCurrentPosition(success, fail);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("성공: " +latitude+" " + longitude);

    getWeather(latitude, longitude, tempSection, placeSection, descSection);
  }


  const fail = () => {
    alert("좌표를 받아올 수 없음");
  }

  */

  return (
    <div className="weatherDiv">
      {data ? (
        <div className="weatherInfo" style={{ display: "flex", flexDirection: "row" }}>
          <img className="weathericon" />
          <p className="temperature">{data.main.temp}°C</p>
          <p className="place">{data.name}</p>
          <p className="description">{data.weather[0].description}</p>
        </div>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </div>
  );
}






