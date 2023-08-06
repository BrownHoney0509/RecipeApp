const searchBox = document.querySelector('.searchBox'); //class se select kr rhe hai to . lagana nhi bhulna
const searchBtn = document.querySelector('.searchBtn'); //class se select kr rhe hai to . lagana nhi bhulna
const recipeContainer = document.querySelector('.recipe-container');//class se select kr rhe hai to . lagana nhi bhulna
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        
    
const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); //fetch returns a promise //api se data leke aaenge is variable mai
const response =  await data.json();

recipeContainer.innerHTML = "";
response.meals.forEach(meal => {
const recipeDiv = document.createElement('div');
recipeDiv.classList.add('recipe');
recipeDiv.innerHTML = `
<img src="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p><span>${meal.strArea}</span> Dish</p>
<p>Belongs to <span>${meal.strCategory}</span> category</p>
`
const button = document.createElement('button');
button.textContent = "view Recipe";
recipeDiv.appendChild(button);

// Adding Event Listener to recipe button
button.addEventListener('click', ()=>{
    openRecipePopup(meal);
})


recipeContainer.appendChild(recipeDiv);
    //console.log(response.meals[0]);
//console.log(meal);

});
} catch (error) {
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes. Sorry can't Help!!!</h2>";
}
}

// Funtion to fetch Ingredients and Measurements
const fetchIngredients = (meal) =>{
let ingredientsList = "";
for(let i=1;i<=20;i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`];
         ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
}
return ingredientsList;
    //console.log(meal);
}
const  openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName" >${meal.strMeal}</h2>  
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>  
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
</div>

    `

   

    recipeDetailsContent.parentElement.style.display = "block";

}

 recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
 }); 



searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault(); //this will stop from auto submit
    const searchInput = searchBox.value.trim();// trim extra spaces remove kr deta h if present
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the Meal you Desire to Search </h2>` ;
        return;
    }
    fetchRecipes(searchInput); //function call
    //console.log("Button Clicked");
});