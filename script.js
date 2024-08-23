const apiKey = "36dc5ab76c0c439289a679ce88060bfe";
const blogContainer = document.getElementById("blog-container");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

async function fetchNews(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-07-23&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "";
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        const articles = await fetchNews(query);
        displayBlogs(articles);
    }
});

// Optionally, fetch some default news on page load
(async () => {
    const articles = await fetchNews("tesla");
    displayBlogs(articles);
})();
