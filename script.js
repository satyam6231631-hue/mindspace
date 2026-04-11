// 💡 QUOTE
async function getQuote() {
    try {
        document.getElementById("quote").innerText = "Loading...";

        let res = await fetch("https://dummyjson.com/quotes/random");
        let data = await res.json();

        document.getElementById("quote").innerText = data.quote;
        document.getElementById("author").innerText = "- " + data.author;

    } catch (error) {
        document.getElementById("quote").innerText = "Failed to load quote";
    }
}

getQuote();


// 🌦 WEATHER
async function getWeather() {
    let city = document.getElementById("city").value;
    let weatherText = document.getElementById("weather");

    if (city === "") {
        weatherText.innerText = "Please enter a city!";
        return;
    }

    weatherText.innerText = "Loading...";

    try {
        let res = await fetch(`https://wttr.in/${city}?format=j1`);
        let data = await res.json();

        let temp = data.current_condition[0].temp_C;
        let desc = data.current_condition[0].weatherDesc[0].value;

        weatherText.innerText = `${city} 🌍 : ${temp}°C, ${desc}`;

    } catch (error) {
        weatherText.innerText = "Error fetching weather!";
    }
}


// 📰 NEWS (SORT + FILTER + MAP)
const link = "https://api.spaceflightnewsapi.net/v4/articles/";

async function getNews() {
    let newsDiv = document.getElementById("news");
    let searchInput = document.getElementById("searchNews").value.toLowerCase();

    newsDiv.innerText = "Loading...";

    try {
        let res = await fetch(link);
        let data = await res.json();

        // SORT
        let sorted = data.results.sort((a, b) =>
            new Date(b.published_at) - new Date(a.published_at)
        );

        // FILTER
        let filtered = sorted.filter(article =>
            article.title.toLowerCase().includes(searchInput)
        );

        // MAP
        let html = filtered.slice(0, 20).map(article => {
            return `
                <div>
                    <h4>${article.title}</h4>
                    <img src="${article.image_url}">
                </div>
            `;
        }).join("");

        newsDiv.innerHTML = html || "No results found 😢";

    } catch (error) {
        newsDiv.innerText = "Error loading news!";
    }
}

// 🔍 AUTO SEARCH
document.getElementById("searchNews").addEventListener("input", getNews);


// 🔄 NAVIGATION
function showSection(sectionId) {
    document.getElementById("home").style.display = "none";

    document.querySelectorAll(".page").forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}

function goHome() {
    document.getElementById("home").style.display = "flex";

    document.querySelectorAll(".page").forEach(sec => {
        sec.style.display = "none";
    });
}

function toggleMode() {
    document.body.classList.toggle("light");
}

