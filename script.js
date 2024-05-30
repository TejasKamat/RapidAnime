document.addEventListener('DOMContentLoaded', () => {
    fetchAnime("Naruto");
    const form = document.getElementById('search-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchbox = document.getElementById('searchbox');
        const query = searchbox.value.trim();
        if (query) {
            await fetchAnime(query);
        }
    });
});

async function fetchAnime(query) {
    document.getElementById("head-title").innerText = query.charAt(0).toUpperCase() + query.slice(1);
    const url = `https://api.jikan.moe/v4/anime?q=${query}&sfw`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayAnime(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayAnime(data) {
    let allcards = "";
    const rowing = document.getElementById("rowing");
    const animeList = data.data;

    animeList.forEach((item) => {
        allcards += `
        <div class="col-12 col-md-4">
          <div class="card mb-4" style="width: 100%">
            <img src="${item.images.jpg.image_url}" class="card-img-top" alt="${item.title}" />
            <div class="card-body">
              <h5 class="card-title">${item.title_english || item.title}</h5>
              <p class="card-text">Aired: ${item.aired.string || 'No Details'}</p>
              <p class="card-text">Duration: ${item.duration || 'No data available.'}</p>
              <p class="card-text">Year: ${item.year || 'No date available.'}</p>
  
              <a href="${item.url}" class="btn btn-primary">More info</a>
            </div>
          </div>
        </div>
      `;
    });

    rowing.innerHTML = allcards;
}
