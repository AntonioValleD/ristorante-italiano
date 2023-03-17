const menu = document.querySelector('.lat-menu');
const navigation = document.querySelector('.navigation');
const body = document.querySelector('body');
const images = document.querySelectorAll('img');
const allDishes = document.querySelectorAll('.dish');

const allBtn = document.querySelector('.all');
const saladBtn = document.querySelector('.salad');
const pastaBtn = document.querySelector('.pasta');
const pizzaBtn = document.querySelector('.pizza');
const dessertBtn = document.querySelector('.dessert');
const dishesContainer = document.querySelector('.dishes');

document.addEventListener('DOMContentLoaded', ()=>{
    events();
    dishes();
});

const events = () =>{
    menu.addEventListener('click', openMenu);
}

const openMenu = () =>{
    navigation.classList.remove('hide');
    closeButton();
}

const closeButton = () =>{
    const closeBtn = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('full-screen');
    if (document.querySelectorAll('.full-screen').length > 0) return;
    body.appendChild(overlay);
    closeBtn.textContent = 'x';
    closeBtn.classList.add('close-button');
    navigation.appendChild(closeBtn);
    closeMenu(closeBtn, overlay);
}

const closeMenu = (closeBtn, overlay) =>{
    closeBtn.addEventListener('click', () =>{
        navigation.classList.add('hide');
        body.removeChild(overlay);
        navigation.removeChild(closeBtn);
    });
    
    overlay.onclick = function(){
        body.removeChild(overlay);
        navigation.classList.add('hide');
        navigation.removeChild(closeBtn);
    }
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const image = entry.target;
            /*image.src = image.dataset.src;*/
            observer.unobserve(image);
        }
    })
});

images.forEach(image=>{
    image.src = image.dataset.src;
    observer.observe(image);
})

const dishes = () =>{
    let dishesArray = [];
    allDishes.forEach(dish=>{
        dishesArray = [...dishesArray,dish];
    })
    
    const salads = dishesArray.filter(salad=>salad.getAttribute('data-dish') === 'salad');
    const pastas = dishesArray.filter(pasta=>pasta.getAttribute('data-dish') === 'pasta');
    const pizzas = dishesArray.filter(pizza=>pizza.getAttribute('data-dish') === 'pizza');
    const desserts = dishesArray.filter(dessert=>dessert.getAttribute('data-dish') === 'dessert');

    showDishes(salads, pastas, pizzas, desserts);
}

const showDishes = (salads, pastas, pizzas, desserts) =>{
    allBtn.addEventListener('click', ()=>{
        cleanHtml();
        allDishes.forEach(dish=>dishesContainer.appendChild(dish));
    })
    saladBtn.addEventListener('click', ()=>{
        cleanHtml();
        salads.forEach(salad=>dishesContainer.appendChild(salad));
    })
    pastaBtn.addEventListener('click', ()=>{
        cleanHtml();
        pastas.forEach(pasta=>dishesContainer.appendChild(pasta));
    })
    pizzaBtn.addEventListener('click', ()=>{
        cleanHtml();
        pizzas.forEach(pizza=>dishesContainer.appendChild(pizza));
    })
    dessertBtn.addEventListener('click', ()=>{
        cleanHtml();
        desserts.forEach(dessert=>dishesContainer.appendChild(dessert));
    })
}

const cleanHtml = () =>{
    while(dishesContainer.firstChild){
        dishesContainer.removeChild(dishesContainer.firstChild);
    }
}