const searchForm = document.querySelector('form');
const searchResultSec = document.querySelector('.search-results');
const container = document.querySelector('.container');
const searchIcon = document.querySelector('ion-icon');
const myInput = document.querySelector('input')
let searchQuery = ''
const apiId = '55f19435'
const apiKeys = '3edbfdb9762f1bcb196edddaf6a5ae34';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI()
})

searchIcon.addEventListener('click', (e) => {
  e.preventDefault();
  searchQuery = myInput.value;
  fetchAPI()
})



///EDAMAM API
async function fetchAPI () {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKeys}&to=20`
  const response = await fetch(baseURL)
  const data = await response.json()

  generateHTML(data.hits)
  console.log(data)
}

const generateHTML = (results) => {
  let generatedHTML = '';
  results.map(result => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="Food Image">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a href="${result.recipe.url}" target="_blank" class="view-btn">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Health: ${result.recipe.healthLabels}</p>
        <p class="item-data">Ingredients: ${result.recipe.ingredientLines}</p>
        
      </div>
    `

  })
  searchResultSec.innerHTML = generatedHTML
}