const apikey = 'cc5d30e5457d4e69bedffc17dde3de55';

const blogContainer = document.getElementById('blog-container');

const searchField = document.getElementById('search-input');

const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&pageSize=12`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles, query = null) {
    blogContainer.innerHTML = "";
    
    // Add search result heading if a query is provided
    if (query) {
        const searchResultHeading = document.createElement("h2");
        searchResultHeading.textContent = `Search Result: ${query}`;
        searchResultHeading.classList.add("search-heading"); // Add the CSS class to center the heading
        
        // Wrap the heading in a div container
        const headingContainer = document.createElement("div");
        headingContainer.appendChild(searchResultHeading);
        
        // Append the div container to the blogContainer
        blogContainer.appendChild(headingContainer);
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "img/logo1.png";
        img.alt = img.src === "img/logo1.png" ? "logo1.png" : "";

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles, query);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
