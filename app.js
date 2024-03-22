const searchMeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector(".input");
  const title = document.querySelector(".title");
  const info = document.querySelector(".procedure");
  const img = document.querySelector(".img");
  const ingredientsOutput = document.querySelector(".ing1");

  const showMealInfo = (meal) => {
    console.log(meal);
    const { strMeal, strMealThumb, strInstructions } = meal;

    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;


    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    const html = `
    <span>${ingredients
      .map((ing) => `<li class="ing2">${ing}</li>`)
      .join("")}</span>`;
    ingredientsOutput.innerHTML = html;

    // Update hero section
    updateHeroSection(meal);
    // Update food section
    updateFoodSection(meal);
  };

  const showAlert = () => {
    alert("Meal not found");
  };
  //fetch recipe
  const fetchMeal = async (val) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );

    const { meals } = await res.json();
    return meals;
  };

  //get search value
  const val = input.value.trim();
  if (val) {
    const meal = await fetchMeal(val);

    if (!meal) {
      showAlert();
    }

    meal.forEach(showMealInfo);
  } else {
    alert("Please search a meal");
  }
};

const heroMeal = async (e) => {
  e.preventDefault();
  const title = document.querySelector(".hero-title");
  const img = document.querySelector(".hero-img");
  const ingredientsOutput = document.querySelector(".hero-ing");

  const renderInfo = (meal) => {
    console.log(meal);
    const { strMeal, strMealThumb } = meal;
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    const html = `
    <span>${ingredients
      .map((ing) => `<li class="ing">${ing}</li>`)
      .join("")}</span>`;
    ingredientsOutput.innerHTML = html;

    // Update food section
  };

  const fetchRandomMeal = async () => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );

    const { meals } = await res.json();
    const randomMeal = meals[0];
    console.log(randomMeal);

    return randomMeal;
  };
  const meal = await fetchRandomMeal();
  renderInfo(meal);
  updateFoodSection(meal);

};

const updateHeroSection = (meal) => {
  const title = document.querySelector(".hero-title");
  const img = document.querySelector(".hero-img");
  const ingredientsOutput = document.querySelector(".hero-ing");
  const ingTitle = document.querySelector(".ing-title");

  title.textContent = meal.strMeal;
  img.style.backgroundImage = `url(${meal.strMealThumb})`;
  ingTitle.innerHTML= "Ingredients";

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  const html = `
  <span>${ingredients
    .map((ing) => `<li class="ing">${ing}</li>`)
    .join("")}</span>`;
  ingredientsOutput.innerHTML = html;
};

const updateFoodSection = (meal) => {
  const foodTitle = document.querySelector(".title");
  const foodImg = document.querySelector(".img");
  const info = document.querySelector(".procedure");
  const ingredientsOutput = document.querySelector(".ing1");

  foodTitle.textContent = meal.strMeal;
  foodImg.style.backgroundImage = `url(${meal.strMealThumb})`;
  info.textContent = meal.strInstructions;

  const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    const html = `
    <span>${ingredients
      .map((ing) => `<li class="ing2">${ing}</li>`)
      .join("")}</span>`;
    ingredientsOutput.innerHTML = html;
};

const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);

const search = document.querySelector(".search");
search.addEventListener("click", searchMeal);

const nextMeal = document.querySelector(".next");
nextMeal.addEventListener("click", heroMeal);

let lastScrollTop = 0;
const navbar = document.querySelector("nav");
const navbarHeight = navbar.offsetHeight;

const showNavbar = () => {
  navbar.style.transform = "translateY(0)";
};

const hideNavbar = () => {
  navbar.style.transform = `translateY(-${navbarHeight}px)`;
};

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
    // Scroll down
    hideNavbar();
  } else {
    // Scroll up
    showNavbar();
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Call heroMeal when the page loads
window.addEventListener("load", heroMeal, updateFoodSection);
