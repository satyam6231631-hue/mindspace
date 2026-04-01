const api="https://api.quotable.io/random"



async function quote(){
    let res=await fetch(api)
    let data=await res.json()
    console.log(data)
    document.getElementById("quote").innerText=data.content 
    document.getElementById("author").innerText = "- " + data.author;


}
quote()




async function getWeather() {
    let city = document.getElementById("city").value;

    let weatherText = document.getElementById("weather");
    weatherText.innerText = "Loading...";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`;

    let res = await fetch(url);
    let data = await res.json();

    weatherText.innerText =
        data.name + " : " +
        data.main.temp + "°C, " +
        data.weather[0].description;
}




const link="https://api.spaceflightnewsapi.net/v4/articles/"

async function getNews() {
    let newsDiv = document.getElementById("news");

    newsDiv.innerText = "Loading...";

    let res = await fetch(link);
    let data = await res.json();

    newsDiv.innerHTML = "";

    data.results.slice(0, 5).forEach(article => {
        newsDiv.innerHTML += `
            <div>
                <h4>${article.title}</h4>
                <img src="${article.image_url}" width="150">
                <br><br>
            </div>
        `;
    });
}
