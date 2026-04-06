// Get container
const container = document.getElementById("recipeContainer");

// Load default meals when page opens
window.onload = () => {
  fetchMeals("soup");
};

// Fetch meals from API
function fetchMeals(query) {
  container.innerHTML = "<p>Loading...</p>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = "";

      if (!data.meals) {
        container.innerHTML = "<p>No recipes found 😢</p>";
        return;
      }

      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="overlay">
            <p class="product-name">${meal.strMeal}</p>
            <p class="price">${meal.strCategory}</p>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = "<p>Error loading data ⚠️</p>";
      console.error(error);
    });
}

// Search button function
function searchMeals() {
  const input = document.getElementById("searchInput").value.trim();

  if (input === "") {
    alert("Please enter something!");
    return;
  }

  fetchMeals(input);
}

