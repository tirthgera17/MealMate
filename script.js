const container = document.getElementById("recipeContainer");

let allMeals = []; // store data globally
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Load default meals
window.onload = () => {
  fetchMeals("chicken");
};

// Fetch API
function fetchMeals(query) {
  container.innerHTML = "<p>Loading...</p>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        container.innerHTML = "<p>No recipes found 😢</p>";
        return;
      }

      allMeals = data.meals;
      displayMeals(allMeals);
    });
}

// DISPLAY FUNCTION (uses map)
function displayMeals(meals) {
  container.innerHTML = "";

  meals.map(meal => {
    const isFav = favorites.includes(meal.idMeal);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="overlay">
        <p class="product-name">${meal.strMeal}</p>
        <p class="price">${meal.strCategory}</p>
        <button onclick="toggleFavorite('${meal.idMeal}')">
          ${isFav ? "❤️" : "🤍"}
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// SEARCH
function searchMeals() {
  const input = document.getElementById("searchInput").value;
  fetchMeals(input);
}

// FILTER (uses filter)
document.getElementById("categoryFilter").addEventListener("change", () => {
  const category = document.getElementById("categoryFilter").value;

  const filtered = category
    ? allMeals.filter(meal => meal.strCategory === category)
    : allMeals;

  displayMeals(filtered);
});

// SORT (uses sort)
document.getElementById("sortOption").addEventListener("change", () => {
  const option = document.getElementById("sortOption").value;

  let sorted = [...allMeals];

  if (option === "asc") {
    sorted.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (option === "desc") {
    sorted.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }

  displayMeals(sorted);
});

// FAVORITES (localStorage)
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayMeals(allMeals);
}