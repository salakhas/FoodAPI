import Navbar from "./navbar.js";
import getFetch from "./fetch.js";
const navbar = Navbar();
const navbarContainer = document.getElementById("navbarContainer");
navbarContainer.innerHTML = navbar;

window.addEventListener("load",function() {
    latestRecipies();
});

function latestRecipies(){
    const container = document.getElementById("container");
    const div = document.createElement("div");
    var i=52999;
    while(i<53009){
         getFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.meals)
            const card = displayList(res.meals)
            div.append(card)
        })
        .catch((res)=>{
            console.log("error")
        })
        console.log(i)
        i++;
    }
    container.append(div)
    container.setAttribute("class","moveOver")
}

function displayList(data){
    console.log("welcome to displayList function")
    let cards = document.createElement('div');
    let row = document.createElement('div');
    row.setAttribute("class","row");
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');

    let image = document.createElement('img');
    image.src = data[0].strMealThumb;
    image.setAttribute("class","customImg img-fluid moveRight mn-5");
    col1.append(image);
    col1.setAttribute("class","col-4 moveRight");

    let heading = document.createElement('h2');
    heading.textContent = data[0].strMeal;
    heading.setAttribute('class','h4 text-dark mt-3');

    let category1 = document.createElement("p");
    category1.innerHTML = "Category: ";
    category1.setAttribute('class','h6 text-danger mt-3')

    let category2 = document.createElement("p");
    console.log(data[0].strCategory)
    category2.innerHTML = data[0].strCategory;
    category2.setAttribute('class','h6 mt-3')

    col2.append(heading,category1,category2)
    col2.setAttribute("class","col-8")

    row.append(col1,col2)
    cards.append(row)
    cards.setAttribute("class","ml-5 mb-5 w-75 ")
    return cards
}