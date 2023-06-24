// api
const api_key = 'wBVwuMPw5DQUKqgpzRbjRoKGPcabz9fp';

// Get the search input element
const searchInput = document.querySelector('.gh-search-input');

// Get the search form element
const searchForm = document.querySelector('.tm-search-form');

// Add event listener for form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const searchQuery = searchInput.value.trim(); // Get the search query

    // Perform the API request
    fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchQuery}&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        )
        .then(response => response.json())
        .then(data => {
            // Clear the existing content in the container
            document.getElementById('gifContainer').innerHTML = '';
            var total_count = data.pagination.total_count;
            $('.result_count').text(total_count);
            $('.search_term').text(searchQuery);

            // Loop through the GIF data and create HTML elements for each result
            data.data.forEach(gif => {
                const html = `
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5 custom_style">
                            <figure class="effect-ming tm-video-item">
                            <img src="${gif.images.original.url}" alt="Image" class="img-fluid" style="width: 100%; height: 250px;">
                            <figcaption class="d-flex align-items-center justify-content-center">
                                <h2>${gif.title}</h2>
                                <a href="${gif.images.original.url}">View more</a>
                            </figcaption>
                            </figure>
                            <div class="d-flex justify-content-between tm-text-gray cstm_styl">
                            <h5>${gif.title}</h5>
                            <span class="tm-text-gray-light"><i class="fi fi-sr-calendar-clock"></i> ${gif.import_datetime}</span>
                            </div>
                        </div>
                        `;

                // Append the HTML element to the container
                document.getElementById('gifContainer').innerHTML += html;
            });
        })
        .catch(error => console.error(error));

    // Store the search query in localStorage
    localStorage.setItem('searchQuery', searchQuery);
});

// Check if there is a stored search query in localStorage
const storedQuery = localStorage.getItem('searchQuery');
if (storedQuery) {
    // Set the stored query as the value of the search input
    searchInput.value = storedQuery;

    // Perform the API request with the stored query
    searchForm.dispatchEvent(new Event('submit'));
}



//  on scroll show more results 

// Variables to track pagination and loader
let offset = 0; // Initial offset value
const limit = 10; // Number of results per page
const loader = document.getElementById('load_class'); // Get the loader element

// Function to show the loader
function showLoader() {
    loader.style.display = 'block';
}

// Function to hide the loader
function hideLoader() {
    loader.style.display = 'none';
}

// Function to fetch and display new results
function fetchResults() {
    const searchQuery = searchInput.value.trim(); // Get the search query

    // Show the loader
    showLoader();

    // Perform the API request with pagination parameters
    fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
        )
        .then(response => response.json())
        .then(data => {
            // Loop through the new GIF data and create HTML elements for each result
            data.data.forEach(gif => {
                const html = `
                      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5 custom_style">
                          <figure class="effect-ming tm-video-item">
                          <img src="${gif.images.original.url}" alt="Image" class="img-fluid" style="width: 100%; height: 250px;">
                          <figcaption class="d-flex align-items-center justify-content-center">
                              <h2>${gif.title}</h2>
                              <a href="${gif.images.original.url}">View more</a>
                          </figcaption>
                          </figure>
                          <div class="d-flex justify-content-between tm-text-gray cstm_styl">
                          <h5>${gif.title}</h5>
                          <span class="tm-text-gray-light"><i class="fi fi-sr-calendar-clock"></i> ${gif.import_datetime}</span>
                          </div>
                      </div>
                      `;

                // Append the HTML element to the container
                document.getElementById('gifContainer').innerHTML += html;
            });

            // Increment the offset value for the next page
            offset += limit;

            // Hide the loader
            hideLoader();
        })
        .catch(error => {
            console.error(error);
            // Hide the loader in case of an error
            hideLoader();
        });
}

// Function to check if scrolling has reached the bottom of the page
function checkScrollEnd() {
    const scrollContainer = document.documentElement;
    const scrollTop = scrollContainer.scrollTop;
    const scrollHeight = scrollContainer.scrollHeight;
    const clientHeight = scrollContainer.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Fetch new results when reaching near the bottom of the page
        fetchResults();
    }
}

// Add event listener for scroll event
window.addEventListener('scroll', checkScrollEnd);


// trending gifs,
function trendingGifs() {
    // Perform the API request
    fetch(
            `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=6&offset=0&rating=g&bundle=messaging_non_clips`
        )
        .then(response => response.json())
        .then(data => {
            // Clear the existing content in the container
            document.getElementById('trendingGifs').innerHTML = '';

            // Loop through the GIF data and create HTML elements for each result
            data.data.forEach(gif => {
                const html = `
    <div class="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12 mb-5">
        <figure class="effect-ming tm-video-item gh-trending">
            <img src="${gif.images.original.url}" alt="Image" class="img-fluid">
            <figcaption class="d-flex align-items-center justify-content-center">
                <h2>${gif.title}</h2>
                <a href="${gif.images.original.url}">View more</a>
            </figcaption>
        </figure>
    </div>
    `;

                // Append the HTML element to the container
                document.getElementById('trendingGifs').innerHTML += html;
            });
        })
        .catch(error => console.error(error));
}