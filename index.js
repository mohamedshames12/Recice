const inputSearch = document.querySelector(".input-search");
const searchBar = document.querySelector(".search-bar");
const cart = document.querySelector(".cart");
const sectionDetalis = document.querySelector(".detalis");

searchBar.addEventListener("click", (eo) => {
    let inputTerm = inputSearch.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputTerm}`;

    fetch(apiUrl)
    .then((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then((data) => {
        displayRecipes(data);
    })

})


function displayRecipes(recipes){
    cart.innerHTML = "";

    if(recipes.meals == null){
        cart.innerHTML = `<h1 class="null">Unreachable your request!</h1>`;
        return;
    };

    recipes.meals.forEach(recipe => {
        cart.innerHTML += `
             <div class="cart-box">
             <div class="image">
                 <img src="${recipe.strMealThumb}">
             </div>
             <div class="info">
                 <h3>${recipe.strMeal}</h3>
                 <a href="#"  class="recipe-btn" data-id=${recipe.idMeal}>show more</a>
             </div>
             </div>
        `
    });
}



cart.addEventListener("click" , (eo) => {
    if(eo.target.classList.contains("recipe-btn")){
        let id = eo.target.getAttribute("data-id");
        console.log(id)
        let apiIdUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

                        
        fetch(apiIdUrl)
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((data) => {
            displayDetails(data);
        });

    }
})


function displayDetails(details){
    let item = details.meals[0];
    sectionDetalis.classList.remove("showDetails");
    sectionDetalis.innerHTML = "";
    sectionDetalis.innerHTML = `
    <i class="fas fa-light fa-xmark"></i>
    <div class="full-detalis">
        <h2>${item.strMeal}</h2>
        <h4>Instructions : </h4>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}">Watch Video</a>
    </div>
    `
}

sectionDetalis.addEventListener("click" , (eo) => {
    if(eo.target.classList.contains("fa-xmark")){
        eo.target.parentElement.classList.add("showDetails");
    }
})












