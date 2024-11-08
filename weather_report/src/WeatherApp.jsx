import axios from "axios";
import { useState,useEffect } from "react";
import  "./WeatherApp.css";  
   
    

 const SearchDiv = ({searchVal}) => {

        const [city,setCity] = useState("");

        const handleinput = (e) => {       
            setCity(e.target.value);         
        }   
        const  handleSearch =() =>{
            console.log("city mapped on submit",searchVal)
            searchVal(city);          
        };
        const clearThis= (e) => {
            e.target.value= "";
            setCity("");
        }
      return (        
        <div className="inputContainer">
             <input className="cityInput"
                           type="text" 
                           placeholder='Enter city name' 
                           value={city}
                           onChange={handleinput}
                           onClick={clearThis}/> 
            <button className="searchButton" type="button" onClick={handleSearch} >Search </button>   
                  
        </div>);
}


    const CardDiv = ({heading,data})=>{
        
        return(<div className="weather-card">
                <h3>{heading}</h3>
                <p>{data}</p></div>);
    }

    const WeatherDetailsDiv = ({weatherData}) =>{        
       
        console.log("weatherData div  > " ,weatherData.location.country);
       
       
        return(
            <div className='weather-cards'>            
                <CardDiv  heading="Temperature" data={`${weatherData.current.temp_c}°C`} />                
                <CardDiv  heading="Humidity" data={`${weatherData.current.humidity}%`} />
                <CardDiv  heading="Condition" data={weatherData.current.condition.text}  />                
                <CardDiv  heading="Wind Speed" data={`${weatherData.current.wind_kph} Kph`} />              
            </div>
        );

    }
    export default function WeatherApp(){

     const [city,setCity] = useState("");
     const [weatherData,setWeatherData] = useState(null);
     const [loading,setLoading] = useState(false);
    
     useEffect(()=>{

           if (city !== "") {
            city &&  setCity(city);       
            fetchWeatherData(city);
            setLoading(true);
           // alert("inside fetch useeffect" + city);  
            }       
        
     },[city]);
     
     
     
    const fetchWeatherData = async (city) =>{    

        const apiKey= "7b5e4b6c29fa4f72bcc115229240111";
        const endPoint = "https://api.weatherapi.com/v1/current.json";  
        
        console.log("searching from api" , city);

       if(city !== ""){
            try{
            
                const response = await axios.get(`${endPoint}?key=${apiKey}&q=${city}`);
                const result = response.data;
                setWeatherData(result);                
                console.log ("log weather data >>" , weatherData);                

            }catch(error){
                console.log(error);
                window.alert("Failed to fetch weather data");
                window.location.reload();

            }        
            finally{
                //window.location.reload();
                setLoading(false);
            }    
    }

    }

    const handleSearch = (city) =>{

         setCity(city);
         //return city;
    }
    

     return (<div className="container">
       
          <SearchDiv searchVal={handleSearch} />             
          {loading && <p>Loading data...</p> }
          {!loading &&  weatherData &&  (<WeatherDetailsDiv  weatherData={weatherData}/>)} 
          </div>)
  }