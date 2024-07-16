document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(data => displayMovie(data));

    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => populateFilmList(data));
});

function displayMovie(movie) {
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-poster').src = movie.poster;
    document.getElementById('movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
    document.getElementById('movie-showtime').textContent = `Showtime: ${movie.showtime}`;
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('movie-tickets').textContent = `Tickets Available: ${availableTickets}`;
    document.getElementById('buy-ticket').dataset.id = movie.id;
    document.getElementById('buy-ticket').dataset.tickets = availableTickets;
}

function populateFilmList(films) {
    const filmList = document.getElementById('films');
    filmList.innerHTML = ''; // Clear placeholder
    films.forEach(film => {
        const li = document.createElement('li');
        li.classList.add('film', 'item');
        li.textContent = film.title;
        li.dataset.id = film.id;
        filmList.appendChild(li);
    });
}

document.getElementById('buy-ticket').addEventListener('click', () => {
    const button = document.getElementById('buy-ticket');
    let availableTickets = parseInt(button.dataset.tickets);

    if (availableTickets > 0) {
        availableTickets--;
        document.getElementById('movie-tickets').textContent = `Tickets Available: ${availableTickets}`;
        button.dataset.tickets = availableTickets;

        if (availableTickets === 0) {
            button.textContent = "Sold Out";
            button.disabled = true;
        }
    }
});

document.getElementById('films').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const movieId = event.target.dataset.id;
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(response => response.json())
            .then(data => displayMovie(data));
    }
});

function displayMovie(movie) {
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-poster').src = movie.poster;
    document.getElementById('movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
    document.getElementById('movie-showtime').textContent = `Showtime: ${movie.showtime}`;
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('movie-tickets').textContent = `Tickets Available: ${availableTickets}`;
    const button = document.getElementById('buy-ticket');
    button.dataset.id = movie.id;
    button.dataset.tickets = availableTickets;

    if (availableTickets === 0) {
        button.textContent = "Sold Out";
        button.disabled = true;
    } else {
        button.textContent = "Buy Ticket";
        button.disabled = false;
    }
}
