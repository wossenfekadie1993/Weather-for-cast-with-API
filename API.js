// icons-->day
//      -->night
// images-->day-->cloudy
//             -->clear
//             -->rainy
//             -->snowy
//       -->night-->cloudy
//             -->clear
//             -->rainy
//             -->snowy

const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temprature');
const dateOutPut=document.querySelector('.date');
const timeOutPut=document.querySelector('.time');
const condition=document.querySelector('.condition');
const name=document.querySelector('.city-name');
const icon=document.querySelector('.icon');
const cloud=document.querySelector('.cloud');
const humidity=document.querySelector('.humidity');
const wind=document.querySelector('.wind');
const form=document.getElementById('locationInput');
const search=document.querySelector('.search');
const button=document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput='Ethiopia';
cities.forEach(city => {
    city.addEventListener('click',(e)=>{
        cityInput=e.target.innerHTML;
        fetchweatherData();
        app.style.opacity='0';
    });
})

form.addEventListener('submit', (e)=>{
    if (search.value.length==0){
        alert('please type in a city name')
    }
    else{
        cityInput=search.value;
        fetchweatherData();
        search.value='';
        app.style.opacity='0';
    }
    e.preventDefault();
});

function dayOfTheWeek(month,day,year){
    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[new Date(`${month}/${day}/${year}`).getDay()];
};

function fetchweatherData(){
    
    fetch(`http://api.weatherapi.com/v1/current.json?key=d17b009ae3f54495a2c40549232907&q=${cityInput}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        temp.innerHTML=data.current.temp_c+"&#176";
        condition.innerHTML=data.current.condition.text;
        const date=data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time=date.substr(11);

        dateOutPut.innerHTML=`${dayOfTheWeek(m,d,y)} ${m},${d} ${y}`;
        timeOutPut.innerHTML=time;
        name.innerHTML=data.location.name;

        const iconId=data.current.condition.icon.substr(
            '//cdn.weatherapi.com/weather/64x64/'.length);
        icon.src='./assets/icons/'+iconId;

        
        cloud.innerHTML=data.current.cloud+'%';
        humidity.innerHTML=data.current.humidity+'%';
        wind.innerHTML=data.current.wind_kph +'km/hr';

        let timeOfDay='day';
        const code=data.current.condition.code;

        if(!data.current.is_day){
            timeOfDay='night';
        }
        // if(code==1000){
        //     app.style.backgroundImage=`url(./assets/images/${timeOfDay}/clear.png)`;
        //     button.style.background='#e5ba92';

        //     if (timeOfDay=='night'){
        //         button.style.background='e181e27';

        //     }
        // }
        // else if(code==1003|| code==1006|| code==1009|| code==1030|| code==1069|| code==1087|| code==1135|| code==1273|| code==1276|| code==1279|| code==1282){
        //     app.style.background=`url(./assets/images/${timeOfDay}/cloudy.png)`;
        //     button.style.background='#fa6d1b';
        //     if(timeOfDay=='night'){
        //         button.style.background='#181e27';
        //     }
        // }
        // else if (code==1063|| code==1069|| code==1072|| code==1150|| code==1153|| code==1180|| code==1183|| code==1186|| code==1289|| code==1192|| code==1195|| code==1204|| code==1207|| code==1240|| code==1243|| code==1246|| code==1249|| code==1252){
        //     app.style.backgroundImage=`url(./assets/images/${timeOfDay}/rainy.png)`;
        //     button.style.background='#647d75';
        //     if(timeOfDay=='night'){
        //         button.style.background='#325c80';
        //     }
        // }
        // else{
        //     app.style.backgroundImage=`url(./assets/images/${timeOfDay}/rainy.png)`;
        //     button.style.background='#4d72aa';
        //     if(timeOfDay=='night'){
        //         button.style.background='#1b1b1b';
        //     }
        // }
        app.style.opacity='1';
    }) 
    .catch(()=>{
        alert('city not found, please try again');
        app.style.opacity='1';
    })
}

fetchweatherData();
app.style.opacity='1';
