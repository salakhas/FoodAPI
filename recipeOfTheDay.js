import Navbar from "./navbar.js";
const navbar = Navbar();
const navbarContainer = document.getElementById("navbarContainer");
navbarContainer.innerHTML = navbar;

window.addEventListener("load",function() {
    getRecipeOfDay();
});

function getRecipeOfDay(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=> res.json())
    .then((res)=>{
        console.log(res.meals)
        displayRecipeOfDay(res.meals);
    })
}

function displayRecipeOfDay(res){
    const container = document.getElementById("container");
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class","container")
    const outerRow =  document.createElement("div");
    outerRow.setAttribute("class","row");

    const col1 = document.createElement("div");
    col1.setAttribute("class","col");

    const recipeImage = document.createElement("img");
    recipeImage.src = res[0].strMealThumb;
    recipeImage.setAttribute("class","imageOfDay");
    col1.append(recipeImage)

    let breaker = document.createElement('br');

    const recipeVideo = document.createElement("iframe");
    recipeVideo.innerHTML = `<iframe width="500" height="400" src=${res[0].strYoutube}
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; 
    autoplay; clipboard-write; 
    encrypted-media; 
    gyroscope; picture-in-picture" 
    allowfullscreen></iframe>`;

    const col2 = document.createElement("div");
    col2.setAttribute("class","col");

    const div1 = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerHTML = res[0].strMeal;
    h1.setAttribute("class","text-success text-center");
    
    const category1 = document.createElement("p");
    category1.innerHTML = "Category: ";
    category1.setAttribute('class','h5 text-success mt-3')

    const category2 = document.createElement("p");
    console.log(res[0].strCategory)
    category2.innerHTML = res[0].strCategory;
    category2.setAttribute('class','h6 mt-3')

    const area1 = document.createElement("p");
    area1.innerHTML = "Recipe native to:";
    area1.setAttribute('class','h5 text-success mt-3');

    const area2 = document.createElement("p");
    area2.innerHTML = res[0].strArea;
    area2.setAttribute('class','h6 mt-3');

    const ingredientsDiv = document.createElement("div");
    const heading = document.createElement("p");
    heading.innerHTML = "Main ingredients Required:";
    heading.setAttribute("class","h5 text-success mt-3");

  //  const list = document.createElement("ul");
    const li = document.createElement("p");
    li.innerHTML = `${res[0].strIngredient1} - ${res[0].strMeasure1},
                    ${res[0].strIngredient2} - ${res[0].strMeasure2},
                    ${res[0].strIngredient3} - ${res[0].strMeasure3},
                    ${res[0].strIngredient4} - ${res[0].strMeasure4}`;
    li.setAttribute("class","h6 mt-3")
    ingredientsDiv.append(heading,li)

    const instructions1 = document.createElement("p");
    instructions1.innerHTML = "Instructions: "
    instructions1.setAttribute('class','h5 text-success mt-3')
    const instructions2 = document.createElement("p");
    console.log(res[0].strInstructions)
    instructions2.innerHTML = res[0].strInstructions;
    instructions2.setAttribute('class','h6 mt-3')

    const readMore = document.createElement("a");
    readMore.textContent = "Read More >"
    readMore.href = res[0].strSource;

    div1.append(h1,category1,category2,area1,area2,ingredientsDiv,instructions1,instructions2,readMore)

    col2.append(div1);

    outerRow.append(col1,col2)
    container.append(outerRow)

}