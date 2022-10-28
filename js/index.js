// 
// **************** aside toggle ****************
// 
const sideBar = $('aside');
const closeMenuBtn = $('aside .right .burger-menu .fa-xmark');
const openMenuBtn = $('aside .right .burger-menu .fa-bars');
const menuLinks =$('aside .left .links li');

function closeMenu(){

    sideBar.animate({left:'-240px'},700);
    closeMenuBtn.addClass('d-none')
    openMenuBtn.removeClass('d-none')
    menuLinks.eq(0).animate({top:'100%'},1200)
    menuLinks.eq(1).animate({top:'100%'},1100)
    menuLinks.eq(2).animate({top:'100%'},1000)
    menuLinks.eq(3).animate({top:'100%'},900)
    menuLinks.eq(4).animate({top:'100%'},800)
}
closeMenuBtn.click(function(){
    closeMenu();
})
$('section').click(function(){
    closeMenu();

})
openMenuBtn.click(function(){
    sideBar.animate({left:'0px'},700);
    openMenuBtn.addClass('d-none')
    closeMenuBtn.removeClass('d-none')
    menuLinks.eq(0).animate({top:'0'},800)
    menuLinks.eq(1).animate({top:'0'},900)
    menuLinks.eq(2).animate({top:'0'},1000)
    menuLinks.eq(3).animate({top:'0'},1100)
    menuLinks.eq(4).animate({top:'0'},1200)
})
// 
// **************** fetch APIs ****************
// 
// 
// **************** Categories ****************
// 
// 

let categoriesArray;

$('aside .right .logo').click(function(){
    $('#categories').html('')
    $('form').html('')
    ;
    getCategories();
    $('#content .search-inputs').addClass('d-none');
})
async function getCategories(){
        const apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const categoriesObject= await apiResponse.json();
        categoriesArray= categoriesObject.categories
        displayCategories();
    }
    getCategories();
    function displayCategories(){
            for (i=0; i<categoriesArray.length; i++){
                    $('#categories').append(`
        <div class="category" >
          
                <div class="content" category-name="${categoriesArray[i].strCategory}">
                    <img src="${categoriesArray[i].strCategoryThumb}">
                    <div class="hover-info">
                    <h2>${categoriesArray[i].strCategory}</h2>
                    <p>${categoriesArray[i].strCategoryDescription.split(' ').splice(0,10).join(' ')}</p>
                    </div>
                </div>
           
        </div>`)
    }
    $('#categories .content').click(function(){
        categoryName= $(this).attr('category-name')
        getMeals(); 
        
    })
    
};
$('#linkCategories').click(function(){
    $('#categories').html('')
    $('form').html('')
    ;
    displayCategories();
    closeMenu();
    $('#content .search-inputs').addClass('d-none');

})
// 
// **************** meals ****************
// 
let mealsArray;

async function getMeals(){
    const apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const mealsObject= await apiResponse.json();
    mealsArray= mealsObject.meals;
    displayMeals();
    closeMenu();
    $('#content .search-inputs').addClass('d-none');  
}
function displayMeals(){
    $('#categories').html('')
    $('form').html('')

    for (i=0; i<mealsArray.length; i++){
        $('#categories').append(`
        <div class="category" >
            <div class="content" meal-id="${mealsArray[i].idMeal}">
                <img src="${mealsArray[i].strMealThumb}">
                <div class="hover-info">
                    <h2>${mealsArray[i].strMeal}</h2>
                </div>
            </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        mealId= $(this).attr('meal-id')
        getDetails(); 
    })
};
// 
// **************** meal details ****************
// 
let mealId;
let mealDetails;

async function getDetails(){
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const detailsObject= await apiResponse.json();
    mealDetails = detailsObject.meals[0];
    displayMealDetails();
    closeMenu();
    
}
function displayMealDetails(){
    $('#categories').html('')
    $('form').html('')

    $('#categories').append(`
    <div class="meal-details">
    <div class="left">
        <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}">
        <h2>${mealDetails.strMeal}</h2>
    </div>
    <div class="right">
        <div class="instructions">
            <h3>instructions :</h3>
            <p class="details">${mealDetails.strInstructions}</p>
            <p><span>Area: </span>${mealDetails.strArea}</p>
            <p><span>Category: </span>${mealDetails.strCategory}</p>
        </div>
        <div class="recipes">
            <h3>recipes :</h3>
            <div class="txt">
                <p>${mealDetails.strIngredient1}</p>
                <p>${mealDetails.strIngredient2}</p>
                <p>${mealDetails.strIngredient3}</p>
                <p>${mealDetails.strIngredient4}</p>
                <p>${mealDetails.strIngredient5}</p>
               
            
            </div>
        </div>
        <div class="tags">
            <h3>tags :</h3>
            <div class="txt"><p>${mealDetails.strTags}</p></div>
        </div>
        <div class="links">
            <a target='_blank' href="${mealDetails.strYoutube}" id="video">Watch on Youtube</a>
        </div>
    </div>
</div>
    `)
}
// 
// **************** All Areas ****************
// 
let allAreasArray;
let areaName;
$('#areas').click(function(){
    $('#categories').html('')
    $('form').html('')

    getAllAreas();
    closeMenu();
    $('#content .search-inputs').addClass('d-none');
})
async function getAllAreas(){
    const apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const areasObject= await apiResponse.json();
    allAreasArray= areasObject.meals;
    displayAllAreas();
    
}
function displayAllAreas(){
    $('#categories').html('')
    $('form').html('')

    for (i=0; i<allAreasArray.length; i++){
        $('#categories').append(`
        <div class="category" >
        <div class="content" area-name="${allAreasArray[i].strArea}">
        <div class="area-content">
        <i class="fa-solid fa-earth-americas"></i>
        <h3>${allAreasArray[i].strArea}</h3>
        </div>  
        </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        areaName= $(this).attr('area-name');
        getArea()
        closeMenu();
    })
}
// 
// **************** Area ****************
// 
let areaArray;
async function getArea(){
    const apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    const areaObject= await apiResponse.json();
    areaArray= areaObject.meals;
    displayArea();
    closeMenu();
}
function displayArea(){

    $('#categories').html('')
    $('form').html('')

    for (i=0; i<areaArray.length; i++){
        $('#categories').append(`
        <div class="category" >
            <div class="content" meal-id="${areaArray[i].idMeal}">
                <img src="${areaArray[i].strMealThumb}">
                <div class="hover-info">
                    <h2>${areaArray[i].strMeal}</h2>
                </div>
            </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        mealId= $(this).attr('meal-id');
        getDetails();
        closeMenu(); 
    })
}

// 
// **************** All Ingredients ****************
// 
$('#ingredients').click(function(){
    getAllIngredients();
    closeMenu();
    $('#content .search-inputs').addClass('d-none');
})
let allIngredientsArray;
let ingredientName;
async function getAllIngredients(){
    const apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const allIngredientsObject= await apiResponse.json();
    allIngredientsArray= allIngredientsObject.meals;
    displayAllIngredients();
}
function displayAllIngredients(){
    $('#categories').html('')
    $('form').html('')

    for (i=0; i<25; i++){
        $('#categories').append(`
        <div class="category" >
            <div class="content ingredients" ingredient-name="${allIngredientsArray[i].strIngredient}">
            <i class="fa-solid fa-utensils"></i>
            <h2>${allIngredientsArray[i].strIngredient}</h2>
            <p>${allIngredientsArray[i].strDescription.split(' ').splice(0,10).join(' ')}</p>
            
            </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        ingredientName= $(this).attr('ingredient-name');
        getIngredientMeals(); 
        closeMenu();
    })
}
// 
// **************** Ingredient Meals ****************
// 
let ingredientMealsArray;
async function getIngredientMeals(){
    const apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName.replace(/\s/g,"_")}`);
    const ingredientMealsObject= await apiResponse.json();
    ingredientMealsArray= ingredientMealsObject.meals;
    console.log(ingredientMealsArray)
    displayIngredientMeals();
}
function displayIngredientMeals(){
   
    $('#categories').html('')
    $('form').html('')

    for (i=0; i<ingredientMealsArray.length; i++){
        $('#categories').append(`
        <div class="category" >
            <div class="content" meal-id="${ingredientMealsArray[i].idMeal}">
                <img src="${ingredientMealsArray[i].strMealThumb}">
                <div class="hover-info">
                    <h2>${ingredientMealsArray[i].strMeal}</h2>
                </div>
            </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        mealId= $(this).attr('meal-id');
        getDetails(); 
        closeMenu();
    })
}

// 
// **************** search functions ****************
// 

$('#searchBtn').click(function(){
    $('#searchInitial').val('');
    $('#searchName').val('');
    $('#content .search-inputs').removeClass('d-none');
    $('#categories').html('')
    $('form').html('')
    ;
    closeMenu();;
});

// **************** search Initial ****************
let initialInput;
let initialArray;
$('#searchInitial').keyup(function(){
    $('#searchName').val('');
    initialInput = $(this).val()
        if(validateInitial() == true){
            searchInitial()
        }else{
            $('#searchInitial').val('');
        }
    
})
async function searchInitial(){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${initialInput}`)
    let initialObject = await apiResponse.json();
    initialArray = initialObject.meals;
    searchInitialMeals();
}
function searchInitialMeals(){
    $('#categories').html('')
    $('form').html('')

    for (i=0; i<initialArray.length; i++){
        $('#categories').append(`
        <div class="category" >
            <div class="content" meal-id="${initialArray[i].idMeal}">
                <img src="${initialArray[i].strMealThumb}">
                <div class="hover-info">
                    <h2>${initialArray[i].strMeal}</h2>
                </div>
            </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        mealId= $(this).attr('meal-id');
        getDetails();
        closeMenu(); 
    })
}

// **************** search Name ****************
let nameInput;
let nameArray;
$('#searchName').keyup(function(){
    $('#searchInitial').val('');
    nameInput = $(this).val()
    searchName()
})
async function searchName(){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameInput}`)
    let nameObject = await apiResponse.json();
    nameArray = nameObject.meals;
    searchNameMeals();
}
function searchNameMeals(){
    $('#categories').html('')
    $('form').html('')

    for (i=0; i<nameArray.length; i++){
        $('#categories').append(`
        <div class="category" >
            <div class="content" meal-id="${nameArray[i].idMeal}">
                <img src="${nameArray[i].strMealThumb}">
                <div class="hover-info">
                    <h2>${nameArray[i].strMeal}</h2>
                </div>
            </div>
        </div>`)
    }
    $('#categories .content').click(function(){
        mealId= $(this).attr('meal-id');
        getDetails();
        closeMenu(); 
    })
}
// 
// **************** contact form ****************
// 
$('#contactUs').click(function(){
    $('#categories').html('')
    $('#content .search-inputs').addClass('d-none');
    closeMenu(); 
    $('form').html(`
    <h2>Registration form</h2>
    <div class="contact-inputs">
        <input type="text" placeholder="first & last name:" id="nameInput">
        <input type="text" placeholder="enter email:" id="emailInput">
        <input type="text" placeholder="enter age:" id="ageInput">
        <input type="text" placeholder="phone number:" id="numberInput">
        <input type="password" placeholder="enter password:" id="passwordInput">
        <input type="password" placeholder="re-enter password:" id="rePasswordInput">
    </div>
    <button id="registerBtn">submit</button>
    <div class="alerts">
        <h3>alerts!</h3>
        <div class="txt">
            <p id="alertName"><span>Name</span> Must enter two names with space in between. { Abdurrahman Ahmed } </p>
            <p id="alertEmail"><span>Email</span> Enter valid email. { Ex: xxx@yyy.zzz } </p>
            <p id="alertAge"><span>Age</span> Enter valid egyptian phone number. </p>
            <p id="alertNumber"><span>Phone Number</span> Enter valid Age. </p>
            <p id="alertPassword"><span>Password</span> Minimum 8 characters & must contain at least one letter & one number.</p>
            <p id="alertMatchPassword"><span>Re-Password</span> Must match password. </p>
        </div>
    </div>  
    `)
    
    runValidation();
})
// 
// **************** regex functions ****************
// 

function runValidation(){
    $('#nameInput').keyup(function(){
        validateName()
        validateAllInputs()
    })
    $('#emailInput').keyup(function(){
        validateEmail()
        validateAllInputs()
    })
    $('#ageInput').keyup(function(){
        validateAge()
        validateAllInputs()
    })
    $('#numberInput').keyup(function(){
        validateNumber()
        validateAllInputs()
    })
    $('#passwordInput').keyup(function(){
        validatePassword()
        validateAllInputs()
    })
    $('#rePasswordInput').keyup(function(){
        validateRePassword()
        validateAllInputs()
    })
}
function validateAllInputs(){
    if(validateName() == true
    && validateEmail() == true
    && validateAge() == true
    && validateNumber() == true
    && validatePassword() == true
    && validateRePassword() == true
        
    ){
        $('.alerts').addClass('d-none');
        $('#registerBtn').addClass('active');
    }else{
        $('#registerBtn').removeClass('active');
        $('.alerts').removeClass('d-none');

    }
}
// **************** searchInitial regex ****************

function validateInitial(){
    let searchInitialRegex = /^[a-z]$/i;
    if(searchInitialRegex.test($('#searchInitial').val()) == true){
        return true;
    }else{
        return false;
    }
}
// **************** name regex ****************
function validateName(){
    let nameRegex = /^(\w+) (\w+)$/;
    if(nameRegex.test($('#nameInput').val()) == true){
        $('#alertName').addClass('d-none')
        return true;
    }else{
        $('#alertName').removeClass('d-none')
        return false;
    }
}
// **************** email regex ****************
function validateEmail(){
    let emailRegex = /^\w+.+\@\w+\.\w+$/;
    if(emailRegex.test($('#emailInput').val()) == true){
        $('#alertEmail').addClass('d-none')
        return true;
    }else{
        $('#alertEmail').removeClass('d-none')
        return false;
    }
}
// **************** age regex ****************
function validateAge(){
    let ageRegex = /^[1-9][0-9]$/;
    if(ageRegex.test($('#ageInput').val()) == true){
        $('#alertAge').addClass('d-none')
        return true;
    }else{
        $('#alertAge').removeClass('d-none')
        return false;
    }
}
// **************** number regex ****************
function validateNumber(){
    let numberRegex = /^(002|\+2){0,1}01[0125][0-9]{8}$/;
    if(numberRegex.test($('#numberInput').val()) == true){
        $('#alertNumber').addClass('d-none')
        return true;
    }else{
        $('#alertNumber').removeClass('d-none')
        return false;
    }
}
// **************** password regex ****************

function validatePassword(){
    let passEight = /(\w+){8,}/;
    let passDigit = /\d+/;
    let passNotDigit = /\D+/;
    if(passEight.test($('#passwordInput').val()) == true 
    && passDigit.test($('#passwordInput').val()) == true
    && passNotDigit.test($('#passwordInput').val()) == true){
        $('#alertPassword').addClass('d-none')
        return true;
    }else{
        $('#alertPassword').removeClass('d-none')
        return false;
    }
}
// **************** rePassword regex ****************

function validateRePassword(){

    if($('#rePasswordInput').val() == $('#passwordInput').val()){
        $('#alertMatchPassword').addClass('d-none')
        return true;
    }else{
        $('#alertMatchPassword').removeClass('d-none')
        return false;
    }
}