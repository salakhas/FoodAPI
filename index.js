import Navbar from "./navbar.js";
const navbar = Navbar();
const navbarContainer = document.getElementById("navbarContainer");
navbarContainer.innerHTML = navbar;

window.addEventListener("load",function() {
    var inputBox = document.getElementById('searchBox');
    
    inputBox.addEventListener('input',handleDebounce)//adding an event to call function handleDebounce on input.
})



function handleDebounce(){
    const nameOfDish  = document.getElementById("searchBox");
    debounceFunction(getReceipeByName(nameOfDish.value),3000)
}

const debounceFunction = (func, delay) => {
   // console.log(this)
    let debounceTimer;
    return function() {
        const context = this //this points to "window"
        const args = arguments//arguments is an Array-like object accessible inside functions that contains the values of the arguments passed to that function.
        console.log(typeof arguments)
            clearTimeout(debounceTimer)//clearing the setTimeout delay if it is clicked again.
            debounceTimer = setTimeout(function(){
                func(value)
            }, delay);//The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object).
    }
} 


function getReceipeByName(value){
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then((res) => res.json())
    .then((res) => {
        console.log("res.meals =>",res.meals)
        displayMeals(res.meals);
    })
    .catch((res) =>{
       invalidMeal();
    })
}

function displayMeals(data){
    
    console.log("Welcome to displayMeals Function");
    const container = document.getElementById("container");
    container.innerHTML = "";


    var innerDiv = document.createElement("div");
        let mealName = document.createElement("p");
        console.log(data[0].strMeal)
        mealName.innerHTML = data[0].strMeal;
        mealName.setAttribute('class','h4 text-dark mt-3');
        
        
        let mealPic = document.createElement("img")
        console.log(data[0].strMealThumb)
        mealPic.src = data[0].strMealThumb;
        mealPic.setAttribute("class", "myImage")
      
        innerDiv.setAttribute("class", "column text-center  ml-5 border")
        
        let category1 = document.createElement("p");
        category1.innerHTML = "Category: ";
        category1.setAttribute('class','h5 text-success mt-3')

        let category2 = document.createElement("p");
        console.log(data[0].strCategory)
        category2.innerHTML = data[0].strCategory;
        category2.setAttribute('class','h6 mt-3')

        let breaker = document.createElement('br');

        let instructions1 = document.createElement("p");
        instructions1.innerHTML = "Instructions: "
        instructions1.setAttribute('class','h5 text-success mt-3')
        let instructions2 = document.createElement("p");
        console.log(data[0].strInstructions)
        instructions2.innerHTML = data[0].strInstructions;
        instructions2.setAttribute('class','h6 mt-3')

        innerDiv.append(mealPic,mealName,category1,category2,instructions1,instructions2,breaker)

        container.append(innerDiv)
    
}

function invalidMeal(){
    let invalidContainer = document.getElementById("container");
    invalidContainer.innerHTML = '';
            let div = document.createElement('div');
            let image = document.createElement('img')
            image.src = "https://jixifox.files.wordpress.com/2015/08/when-you-walk-in-the-house-and-they-is-no-food.gif";
            image.style.display = "block";
            image.setAttribute('class','myImage ml-5 pl-2')

            let sorryMsg = document.createElement('p');
            sorryMsg.innerHTML="Sorry this meal is not available here!"
            sorryMsg.setAttribute('class','h6 mt-3 ml-5 pl-5 spec');
            div.append(image,sorryMsg)
            container.append(div)
}