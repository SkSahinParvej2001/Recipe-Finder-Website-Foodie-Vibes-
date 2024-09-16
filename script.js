document.addEventListener("DOMContentLoaded", () => {
  // Element selection
  const landingPageSearchArea = document.querySelector(".recipe-name");
  const landingPageSearchButton = document.querySelector(".btn");
  const landingPageFloatingText = document.querySelector(".floating-text");
  const notFoundPage = document.querySelector(".not-found-page");
  const landingPage = document.querySelector(".landing-page");
  const recipesPage = document.querySelector(".recipes-page");
  const dropBox = document.querySelector(".all-recipe-area");
  const backButton = document.querySelector(".back-button-section .back-btn");
  const searchAreaOnOtherPages = document.querySelector(".search-name");
  const searchButtonOnOtherPages = document.querySelector(".search-btn");
  const searchOnRecipePage = document.querySelector(".recipe-search-name");
  const searchButtononRecipePage = document.querySelector(".recipe-search-btn");
  const recipePageBackButton = document.querySelector(".recipe-back-btn");
  const recipeOfFoodPage = document.querySelector(".recipe-showing");
  const recipeOfFoodImage = document.querySelector(".image-section");
  const recipeOfFoodInstructions = document.querySelector(
    ".ingredient-section"
  );
  const recipeOfFoodPageBackButton = document.querySelector(".back-button");

  function recipeOfFoodPageFunctions() {
    recipeOfFoodPageBackButton.addEventListener("click", () => {
      notFoundPage.style.display = "none";
      recipesPage.style.display = "none";
      recipeOfFoodPage.style.display = "none";
      landingPage.style.display = "flex";
      landingPageFloatingText.innerHTML = `
        <span class="word">Welcome</span>
        <span class="word">to</span>
        <span class="word">your</span>
        <span class="word">ultimate</span>
        <span class="word">destination</span>
        <span class="word">of</span>
        <span class="word">Recipes</span>
        <span class="word">around</span>
        <span class="word">the</span>
        <span class="word">world!!</span>`;
    });
  }
  function recipePageFunctions() {
    searchButtononRecipePage.addEventListener("click", () => {
      handleSearchOnRecipePage();
    });
    searchOnRecipePage.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearchOnRecipePage();
      }
    });

    recipePageBackButton.addEventListener("click", () => {
      notFoundPage.style.display = "none";
      recipesPage.style.display = "none";
      recipeOfFoodPage.style.display = "none";
      landingPage.style.display = "flex";
      landingPageFloatingText.innerHTML = `
        <span class="word">Welcome</span>
        <span class="word">to</span>
        <span class="word">your</span>
        <span class="word">ultimate</span>
        <span class="word">destination</span>
        <span class="word">of</span>
        <span class="word">Recipes</span>
        <span class="word">around</span>
        <span class="word">the</span>
        <span class="word">world!!</span>`;
    });
  }

  function errorAndRecipePageFunctions() {
    searchButtonOnOtherPages.addEventListener("click", () => {
      handleSearchOnOtherPages();
    });

    searchAreaOnOtherPages.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearchOnOtherPages();
      }
    });

    backButton.addEventListener("click", () => {
      notFoundPage.style.display = "none";
      recipesPage.style.display = "none";
      recipeOfFoodPage.style.display = "none";
      landingPage.style.display = "flex";
      landingPageFloatingText.innerHTML = `
        <span class="word">Welcome</span>
        <span class="word">to</span>
        <span class="word">your</span>
        <span class="word">ultimate</span>
        <span class="word">destination</span>
        <span class="word">of</span>
        <span class="word">Recipes</span>
        <span class="word">around</span>
        <span class="word">the</span>
        <span class="word">world!!</span>`;
    });
  }

  function handleSearchOnRecipePage() {
    const recipe = searchOnRecipePage.value;
    if (recipe.trim() !== "") {
      getRecipe(recipe);
      searchOnRecipePage.value = "";
    } else {
      alert("please write down your dish chef!!");
    }
  }

  function handleSearchOnOtherPages() {
    const recipe = searchAreaOnOtherPages.value;
    if (recipe.trim() !== "") {
      getRecipe(recipe);
      searchAreaOnOtherPages.value = "";
    } else {
      alert("please write down your dish chef!!");
    }
  }

  function showErrorScreen() {
    landingPage.style.display = "none";
    recipesPage.style.display = "none";
    recipeOfFoodPage.style.display = "none";
    notFoundPage.style.display = "flex";
    errorAndRecipePageFunctions();
  }

  function fetchIngredients(meal) {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`;
      } else {
        break;
      }
    }
    return ingredientsList;
  }

  function showRecipeScreen(recipeData) {
    landingPage.style.display = "none";
    notFoundPage.style.display = "none";
    recipeOfFoodPage.style.display = "none";
    recipesPage.style.display = "flex";

    // Clear previous recipes
    dropBox.innerHTML = "";

    recipeData.meals.forEach((meal) => {
      let {
        strMealThumb: image,
        strMeal: dishName,
        strArea: location,
        strCategory: type,
        strYoutube: ytLink,
        strInstructions: instruction,
      } = meal;

      // Add emoji to type
      switch (type) {
        case "Vegetarian":
          type += "🥗🥗";
          break;
        case "Chicken":
          type += "🍗🐔";
          break;
        case "Seafood":
          type += "🍤🐟";
          break;
        case "Miscellaneous":
          type += "🍔🍕";
          break;
        case "Dessert":
          type += "🍰🍨";
          break;
        case "Vegan":
          type += "🥦🥕";
          break;
        case "Lamb":
          type += "🥘🥩";
          break;
        case "Beef":
          type += "🍖🐄";
          break;
        case "Pork":
          type += "🥓🐖";
          break;
        case "Breakfast":
          type += "🥯🥞";
          break;
      }

      const recipeShower = document.createElement("div");
      recipeShower.classList.add("recipe-box");
      recipeShower.innerHTML = `
        <img src="${image}" alt="${dishName}" />
        <div class="text-area"> 
          <h2 class="meal-name">${dishName}</h2>
          <h3>Location: ${location}🌏</h3>
          <h3>Type: ${type}</h3>
          <h3>Watch video:</h3><a href="${ytLink}" target="_blank"><img src="assets/watch-video.png" alt="watch video"></a>
          <button class="recipe-instructions" 
                  data-image="${image}" 
                  data-instructions="${instruction}" 
                  data-meal='${JSON.stringify(
                    meal
                  )}'>Recipe<img src="assets/recipe-instruction-foroward-page-icon.png" alt="recipe button"></button>
        </div>
      `;
      dropBox.appendChild(recipeShower);
    });

    // Add event listener for dynamically created recipe instructions buttons
    dropBox.addEventListener("click", (event) => {
      if (event.target.closest(".recipe-instructions")) {
        const button = event.target.closest(".recipe-instructions");
        const image = button.getAttribute("data-image");
        const instructions = button.getAttribute("data-instructions");
        const meal = JSON.parse(button.getAttribute("data-meal"));
        const dishName = meal.strMeal;

        recipeOfFoodImage.src = image;
        recipeOfFoodInstructions.innerHTML = ` 
          <h1 class="food-name">${dishName}</h1>
          <h4>Ingredients:</h4><ul>${fetchIngredients(meal)}</ul>
          <h4>Instructions:</h4><p>${instructions}</p>`;

        // Show the recipeOfFoodPage
        landingPage.style.display = "none";
        notFoundPage.style.display = "none";
        recipesPage.style.display = "none";
        recipeOfFoodPage.style.display = "flex";

        //back button click event

        recipeOfFoodPageFunctions();
      }
    });

    recipePageFunctions();
  }

  async function getRecipe(recipe) {
    const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    try {
      const apiCall = await fetch(apiURL);
      const recipeData = await apiCall.json();
      if (!recipeData.meals) {
        showErrorScreen();
      } else {
        showRecipeScreen(recipeData);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      showErrorScreen();
    }
  }

  function recipeFinder() {
    landingPageSearchButton.addEventListener("click", () => {
      handleSearchOnLandingPage();
    });

    landingPageSearchArea.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSearchOnLandingPage();
    });
  }

  function handleSearchOnLandingPage() {
    const recipe = landingPageSearchArea.value;
    if (recipe.trim() !== "") {
      landingPageFloatingText.textContent = "getting your recipe🍕....";
      getRecipe(recipe);
      landingPageSearchArea.value = "";
    } else {
      landingPageFloatingText.textContent =
        "please enter something to help us find your recipe chef🍴";
    }
  }

  // Start the recipe finder
  recipeFinder();
});
