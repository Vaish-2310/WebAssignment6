document.addEventListener('DOMContentLoaded', () => {
    const jokeContainer = document.getElementById('joke');
    const newJokeBtn = document.getElementById('new-joke-btn');
    const categoriesContainer = document.getElementById('categories');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Function to fetch and display a random joke
    const fetchRandomJoke = (category = '') => {
        const url = category
            ? `https://api.chucknorris.io/jokes/random?category=${category}`
            : 'https://api.chucknorris.io/jokes/random';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                jokeContainer.textContent = data.value;
            })
            .catch(error => {
                console.error('Error fetching joke:', error);
                jokeContainer.textContent = 'Failed to load joke. Please try again later.';
            });
    };

    // Function to fetch and display joke categories
    const fetchCategories = () => {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    const categoryLink = document.createElement('a');
                    categoryLink.href = '#';
                    categoryLink.textContent = category;
                    categoryLink.classList.add('category-link');
                    categoryLink.addEventListener('click', () => fetchRandomJoke(category));
                    categoriesContainer.appendChild(categoryLink);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    // Function to search for jokes by keyword
    const searchJokes = (query) => {
        const url = `https://api.chucknorris.io/jokes/search?query=${query}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.result.length > 0) {
                    jokeContainer.textContent = data.result[0].value;
                } else {
                    jokeContainer.textContent = 'No jokes found for that keyword.';
                }
            })
            .catch(error => {
                console.error('Error fetching jokes:', error);
                jokeContainer.textContent = 'Failed to load jokes. Please try again later.';
            });
    };

    // Fetch categories when the page loads
    fetchCategories();

    // Fetch a random joke when the button is clicked
    newJokeBtn.addEventListener('click', () => fetchRandomJoke());

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchJokes(query);
            searchInput.value = '';
        }
    });
});
