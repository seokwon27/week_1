const API_KEY = '9c008f9d8ccdede9bfb2563e697135df';
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // 이후 데이터 처리
  })
  .catch(error => console.error('Error:', error));

//카드생성
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <div>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    </div>
    <div class="over">
      <h3 style="margin-top: 30px;">${movie.title}</h3>
      <div style="position: absolute; top:50%; transform: translate(0, -50%);">
        <p>${movie.overview}</p>
      </div>
      <div class="star-rating">
        <span>Rating: ${movie.vote_average} </span>
      </div>
    </div>
  `;
  card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}

// 데이터로 카드 생성 및 DOM 에 추가
fetch(URL)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const movieContainer = document.getElementById('movie-container');
    movies.forEach(movie => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error:', error));




//검색기능
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

//input 엔터키 submit 중단 + 검색버튼 클릭 이벤트 연결
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('searchBtn').click();
  };
}, true);
